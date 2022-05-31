#! /usr/bin/env node
import axios from 'axios';
import colors from 'colors';

const { cyan, green } = colors;

// fetches all items returned by the specified API URL.
// repeats until it responds with `has_more: false`
async function fetchAllItems(url) {
  let itemList = [];
  const fetchSequentially = async (pageNumber = 1) => {
    const apiUrl = `${url}&page=${pageNumber}`;
    const {
      data: { items, has_more: hasMore },
    } = await axios.get(apiUrl);
    itemList = [...itemList, ...items];
    if (hasMore) {
      await fetchSequentially(pageNumber + 1);
    }
  };
  await fetchSequentially();
  return itemList;
}

async function getTotalViews() {
  const apiUrl = `https://api.stackexchange.com/2.3/search/advanced?pagesize=100&order=desc&sort=creation&tagged=rsk&site=stackoverflow&filter=!Oev7Wya51xkPXz3rxkrnxh_FQIK9DTSdjn0iuhbW(kx`;
  const questionList = await fetchAllItems(apiUrl);
  const totalViews = questionList.reduce((p, c) => p + Number(c.view_count), 0);
  return totalViews;
}

async function main() {
  try {
    const totalViews = await getTotalViews();
    console.log(
      `${cyan(
        'The total number of views of RSK tagged StackOverflow questions is',
      )} ${green(totalViews)}`,
    );
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
main();
