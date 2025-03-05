import { useEffect, useState } from "react";
import Router from "./route/Router";

const App = () => {
  const [allRoutes, setAllRoutes] = useState();

  useEffect(() => {
    setAllRoutes([...allRoutes]);
  }, []);

  return <Router allRoutes={allRoutes} />;
};

export default App;
