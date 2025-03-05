import { useEffect, useState } from "react";
import Router from "./route/Router";
import authRoute from "./route/authRoute";

const App = () => {
  const [allRoutes, setAllRoutes] = useState([...authRoute]);

  useEffect(() => {
    setAllRoutes([...allRoutes]);
  }, []);

  return <Router allRoutes={allRoutes} />;
};

export default App;
