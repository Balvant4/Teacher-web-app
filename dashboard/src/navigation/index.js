import allPrivateRoute from "./allPrivateRoute";

export const getNav = (role) => {
  if (
    !role ||
    !Array.isArray(allPrivateRoute) ||
    allPrivateRoute.length === 0
  ) {
    return [];
  }

  return allPrivateRoute.filter((route) => route.role === role);
};
