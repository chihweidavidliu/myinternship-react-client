// function that loops through student or company array and fills up each item's choices array with empty strings for table formatting
export default (targetArray, longestArray) => {
  return targetArray.map((item) => {
    if (item.choices.length < longestArray.length) {
      while (item.choices.length < longestArray.length) {
        item.choices.push("");
      }
      return item;
    }
    return item;
  });
};
