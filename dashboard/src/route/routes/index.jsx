import MainLayout from "../../layout/MainLayout";
import privateRoutes from "./privateRoutes";

const getallPrivateRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  };
};

export default getallPrivateRoutes;
