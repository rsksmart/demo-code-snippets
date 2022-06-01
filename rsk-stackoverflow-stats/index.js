#! /usr/bin/env node
import axios from 'axios';
import colors from 'colors';

colors.enable();

// fetches all items returned by the specified API URL.
// repeats until it responds with `has_more: false`
async function fetchAllItems(url) {
  let itemList = [];
  // pagination page number will be incremented on each API call
  let pageNumber = 1;
  const fetchSequentially = async () => {
    // add pagination to the URL
    const apiUrl = `${url}&page=${pageNumber}`;
    const response = await axios.get(apiUrl);
    const { items } = response.data;
    const hasMore = response.data.has_more;
    if (
      [items, hasMore].some((prop) => prop === undefined) ||
      !Array.isArray(items)
    ) {
      throw new Error('The API returns data in an unknown format');
    }
    itemList = [...itemList, ...items];
    if (hasMore) {
      pageNumber += 1;
      await fetchSequentially();
    }
  };
  await fetchSequentially();
  return itemList;
}

// creates API URL query string from the basename and parameters
const assembleApiUrl = (
  apiBase = 'https://api.domain.com',
  apiParams = { key: 'value' },
) =>
  `${apiBase}?${Object.entries(apiParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;

async function getQuestions() {
  /* 
  documentation to the API:
  https://api.stackexchange.com/docs/advanced-search#pagesize=100&order=desc&sort=creation&tagged=rsk&filter=!Oev7Wya51xkPXz3rxkrnxh_FQIK9DTSdjn0iuhbW(kx&site=stackoverflow&run=true
  */
  const apiBase = 'https://api.stackexchange.com/2.3/search/advanced';
  const apiParams = {
    pagesize: 100,
    order: 'desc',
    sort: 'creation',
    tagged: 'rsk',
    site: 'stackoverflow',
    filter: '!Oev7Wya51xkPXz3rxkrnxh_FQIK9DTSdjn0iuhbW(kx',
  };
  const apiUrl = assembleApiUrl(apiBase, apiParams);
  console.log(apiUrl);
  const questionList = await fetchAllItems(apiUrl);
  return questionList;
}

// returns info for the answers corresponding to the questions in the list
async function getAnswers(questionList = []) {
  /* 
  documentation to the API:
  https://api.stackexchange.com/docs/answers-on-questions#order=desc&sort=activity&ids=72356857&filter=!1zIEd5kV.QgWdsoiy5EJ9&site=stackoverflow&run=true
  */
  let answers = [];
  // keep only IDs from the question list
  const questionIds = questionList.map((question) => question.question_id);
  // instead of quering each question for answers, I can provide a semicolon
  // delimited list of ids and query them simultaneously in one request
  const fetchAnswersInPortions = async () => {
    const portionSize = 100;
    // remove a portion from the IDs array
    const portion = questionIds.splice(0, portionSize);
    // if there are still some IDs left in the array
    if (portion.length > 0) {
      // doc: {ids} can contain up to 100 semicolon delimited ids.
      const setOfIds = portion.join(';');
      // Gets the answers to a set of questions identified in id.
      const apiBase = `https://api.stackexchange.com/2.3/questions/${setOfIds}/answers`;
      const apiParams = {
        order: 'desc',
        sort: 'activity',
        site: 'stackoverflow',
        filter: '!1zIEd5kV.QgWdsoiy5EJ9',
      };
      const apiUrl = assembleApiUrl(apiBase, apiParams);
      const answerList = await fetchAllItems(apiUrl);
      // add to previously fetched answers
      answers = [...answers, ...answerList];
      // repeat until `questionIds` array is empty
      await fetchAnswersInPortions();
    }
  };
  await fetchAnswersInPortions();
  return answers;
}

// sums an array of objects over the values
// of the property with the name `propertyName`
function sumBy(arrayOfObjects = [{}], propertyName = 'name') {
  return arrayOfObjects.reduce((p, c) => {
    if (!(propertyName in c))
      throw new Error(`Can't read '${propertyName}' from a list of items`);
    return p + Number(c[propertyName]);
  }, 0);
}

async function main() {
  try {
    const questionList = await getQuestions();
    const answerList = await getAnswers(questionList);
    const totalQuestionsCount = questionList.length;
    const totalAnswersCount = answerList.length;
    const totalQuestionViewsCount = sumBy(questionList, 'view_count');
    const totalQuestionVotesCount = sumBy(questionList, 'up_vote_count');
    const totalAnswerVotesCount = sumBy(answerList, 'up_vote_count');
    console.log(`
    ${'Statistics on StackOverflow Q&A about development on RSK'.cyan}

      Total questions count: ${`${totalQuestionsCount}`.green}
      Total answers count: ${`${totalAnswersCount}`.green}
      Total views count: ${`${totalQuestionViewsCount}`.green}
      Total question votes count: ${`${totalQuestionVotesCount}`.green}
      Total answer votes count: ${`${totalAnswerVotesCount}`.green}
    `);
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
main();
