import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Cats from "./components/Cats";
import Favorites from "./components/Favorites";
import Basket from "./components/Basket";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Cats />}></Route>
          <Route path="/Favorites" element={<Favorites />}></Route>
          <Route path="/Basket" element={<Basket />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
