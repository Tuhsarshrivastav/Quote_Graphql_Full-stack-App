import "./App.css";
import NavBar from "./components/NavBar";
import { useRoutes } from "react-router";
import { routes } from "./routes";
function App() {
  const element = useRoutes(routes);
  return (
    <>
      <NavBar />
      {element}
    </>
  );
}

export default App;
