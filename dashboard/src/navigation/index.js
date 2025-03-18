import allPrivateRoute from "./allPrivateRoute";

export const getNav = (role) =>
  allPrivateRoute.filter((nav) => nav.role === role);
