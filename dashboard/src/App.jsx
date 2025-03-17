import { useEffect, useState } from "react";
import Router from "./route/Router";
import authRoute from "./route/authRoute";
import getallPrivateRoutes from "./route/routes";

const App = () => {
  const [allRoutes, setAllRoutes] = useState([...authRoute]);

  useEffect(() => {
    const getroutes = getallPrivateRoutes();
    setAllRoutes([...allRoutes, getroutes]);
  }, []);

  return <Router allRoutes={allRoutes} />;
};

export default App;
