const userWOPassword = (user: any) => {
  const { password, ...userWOPwd } = user;
  return userWOPwd;
};

const userOrderOff = (user: any) => {
  const { orders, ...userOrders } = user;
  return userOrders;
};

const notStock = (cart: any) => {
  const { stock, ...cartItem } = cart;
  return cartItem;
};

export { notStock, userOrderOff, userWOPassword };
