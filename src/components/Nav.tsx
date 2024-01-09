import { useNavigate } from "react-router-dom";

const Nav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")}>Котики</button>
      <button onClick={() => navigate("/Favorites")}>Избранное</button>
      <button onClick={() => navigate("/Basket")}>Корзина</button>
    </div>
  );
};

export default Nav;
