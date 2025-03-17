import allPrivateRoute from "./allPrivateRoute";

export const getNav = (role) => {
  const finalNavs = [];

  for (let index = 0; index < allPrivateRoute.length; index++) {
    if (role === allPrivateRoute[index].role) {
      finalNavs.push(allPrivateRoute[index]);
    }
  }

  return finalNavs;
};
