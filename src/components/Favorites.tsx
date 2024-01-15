import useCatStore from "../store/store";
import { Cat, SortKey } from "../store/store";
import { useState } from "react";
import { CloseOutlined, SwapOutlined } from "@ant-design/icons";

const Favorites: React.FC = () => {
  const { sortKey, setSortKey } = useCatStore();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const cats = useCatStore((state) =>
    state.cats.filter((cat) => cat.fav == true)
  );
  const setFavorite = useCatStore((state) => state.setFavorite);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100000);

  function removeFavorite(id: string) {
    console.log(id);
    setFavorite(id);
  }

  const sortCats = (a: Cat, b: Cat): number => {
    if (sortKey === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    } else {
      return sortDirection === "asc"
        ? a.dateFav - b.dateFav
        : b.dateFav - a.dateFav;
    }
  };

  // Функция для изменения сортировки
  const toggleSort = (key: SortKey) => {
    // Если уже сортируется по выбранному ключу, меняем направление сортировки
    if (key === sortKey) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // Иначе, меняем ключ сортировки на заданный и устанавливаем направление по умолчанию
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedCats = cats
    .slice()
    .sort(sortCats)
    .filter((cat) => cat.price > minPrice && cat.price < maxPrice);

  return cats.length > 0 ? (
    <div className="cats">
      <div className="filter">
        <input
          className="filters"
          type="number"
          placeholder="Минимальная цена"
          onChange={(e) => setMinPrice(parseInt(e.target.value))}
        />
        <input
          type="number"
          className="filters"
          placeholder="Максимальная цена"
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
        />
        <button className="filters" onClick={() => toggleSort("price")}>
          Сортировать по цене <SwapOutlined />
        </button>
        <button className="filters" onClick={() => toggleSort("dateAdded")}>
          Сортировать по дате добавления <SwapOutlined />
        </button>
      </div>

      {sortedCats?.map((cat: Cat) => (
        <div className="cat" key={cat._id} id={cat._id}>
          <img src={`https://cataas.com/cat/${cat._id}`} alt={cat._id} />
          <div>{cat.price}$ </div>
          <button
            onClick={(e) => removeFavorite(e.currentTarget.parentElement?.id)}
          >
             <CloseOutlined />
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p>В избранном пусто</p>
  );
};

export default Favorites;
