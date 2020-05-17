export const setRecentCodes = (newCode) => {
  let previousCodes = localStorage.getItem("recent-codes");
  if (previousCodes !== null) {
    for (let i = 0; i < previousCodes.length; i++)
      if (previousCodes[i] === newCode) return;
  } else {
    localStorage.setItem("recent-codes", "");
    return;
  }
  localStorage.setItem("recent-codes", newCode + " " + previousCodes);
};

export const getRecentCodes = () => {
  return localStorage.getItem("recent-codes").split(" ");
};

export const resetRecentCodes = () => {
  localStorage.setItem("recent-codes", "");
};
