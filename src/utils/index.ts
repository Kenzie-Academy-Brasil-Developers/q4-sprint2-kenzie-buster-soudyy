const userWOPassword = (user: any) => {
  const { password, ...userWOPwd } = user;
  return userWOPwd;
};
export default userWOPassword;
