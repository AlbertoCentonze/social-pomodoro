export const setRecentCodes = (newCode) => {
  let previousCodes = localStorage.getItem("recent-codes");
  if (previousCodes !== null) {
    for (let i = 0; i < previousCodes.length; i++)
      if (previousCodes[i] === newCode) return;
  } else {
    localStorage.setItem("recent-codes", "");
    return;
  }
  localStorage.setItem("recent-codes", newCode + "-" + previousCodes);
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
