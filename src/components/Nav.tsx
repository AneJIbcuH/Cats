import { useNavigate } from "react-router-dom";
import { GithubOutlined, ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";

const Nav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <button onClick={() => navigate("/")}><GithubOutlined /></button>
      <button onClick={() => navigate("/Favorites")}><HeartOutlined /></button>
      <button onClick={() => navigate("/Basket")}><ShoppingCartOutlined /></button>
    </div>
  );
};

export default Nav;
