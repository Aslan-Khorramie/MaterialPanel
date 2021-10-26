export const getToken = (auth) => {
  const { authValues = {} } = auth;
  const { access_token = "" } = authValues;
  return access_token;
};
