export const parseJwt = (token) => {
  if (token) {
    return JSON.parse(atob(token.split(".")[1]));
  } else {
    return null;
  }
};
