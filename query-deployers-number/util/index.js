function round(number = 0.0) {
  return Number(number.toFixed(2));
}
/* 
These fumctions calculate the moving average indicator
for the `data` array last element.
https://www.investopedia.com/ask/answers/071414/whats-difference-between-moving-average-and-weighted-moving-average.asp
*/

/* 
For a simple moving average, the formula is the sum of the data points over a given period divided by the number of periods.

example: getSimpleMovingAverage([0.1, 0.2, 0.3, 0.4])
calculation: (0.1 + 0.2 + 0.3 + 0.4) / 4
output: 0.25
*/
function getSimpleMovingAverage(data = []) {
  const reducer = (partialSum, currentValue) =>
    partialSum + currentValue / data.length;
  return round(data.reduce(reducer, 0));
}

/* 
The weighted average is calculated by multiplying the given price by its associated weighting and totaling the values.

example: getMovingAverage('weighted', [0.1, 0.2, 0.3, 0.4])
calculation: (0.1 * 1 + 0.2 * 2 + 0.3 * 3 + 0.4 * 4) / (1 + 2 + 3 + 4)
output: 0.3
*/
function getWeightedMovingAverage(data = []) {
  // sum of the data array indices
  const sum = (data.length * (data.length + 1)) / 2;
  const reducer = (partialSum, currValue, index) =>
    partialSum + (currValue * (index + 1)) / sum;
  return round(data.reduce(reducer, 0));
}

/* 
generates time periods to query past activities:
[
  [ 2022-07-13T22:00:00.000Z, 2022-07-20T22:00:00.000Z ],
  [ 2022-07-06T22:00:00.000Z, 2022-07-13T22:00:00.000Z ],
] 
*/
function getWindows(
  startDate = new Date(),
  endDate = new Date(),
  windowsAmount = 4,
) {
  if (startDate >= endDate)
    throw new Error('start day should be earlier than end date');

  const windowLength = endDate - startDate;
  const windows = [];
  for (let i = 0; i < windowsAmount; i += 1) {
    const dateTo = new Date(endDate - windowLength * i);
    const dateFrom = new Date(dateTo - windowLength);
    windows.push([dateFrom, dateTo]);
  }
  return windows;
}

module.exports = {
  getSimpleMovingAverage,
  getWeightedMovingAverage,
  getWindows,
};
