export const setRecentCodes = (newCode) => {
  let previousCodes = localStorage.getItem("recent-codes");
  if (previousCodes !== null) {
    for (let i = 0; i < previousCodes.length; i++)
      if (previousCodes[i] === newCode) return;
  } else {
    localStorage.setItem("recent-codes", "");
    return;
  }
  const previousArray = getRecentCodes();
  if (previousArray.includes(newCode)) {
    // TODO expolit arrayMove()
    arrayMove(previousArray, previousArray.indexOf(newCode), 0);
    localStorage.setItem("recent-codes", arrayToString(previousArray));
  } else {
    localStorage.setItem("recent-codes", newCode + "-" + previousCodes);
  }
};

export const getRecentCodes = () => {
  if (localStorage.getItem("recent-codes") === null) {
    localStorage.setItem("recent-codes", "");
  }
  return localStorage
    .getItem("recent-codes")
    .split("-")
    .filter((item) => item !== "");
};

export const resetRecentCodes = () => {
  localStorage.setItem("recent-codes", "");
};

export const setReloadCode = (code) => {
  localStorage.setItem("reload-code", code);
};

export const resetReloadCode = () => {
  localStorage.setItem("reload-code", undefined);
};

export const getReloadCode = () => {
  return localStorage.getItem("reload-code");
};

function arrayMove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

function arrayToString(arr) {
  let string = "";
  arr.forEach((code) => {
    string += code + "-";
  });
  return string;
}
