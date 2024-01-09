import useCatStore from "../store/store";
import { Cat, SortKey } from "../store/store";
import { useState } from "react";

const Favorites: React.FC = () => {
  const { sortKey, setSortKey } = useCatStore();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const cats = useCatStore((state) =>
    state.cats.filter((cat) => cat.fav == true)
  );
  const setFavorite = useCatStore((state) => state.setFavorite);

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

  const sortedCats = cats.slice().sort(sortCats);

  return (
    <div className="cats">
      <button onClick={() => toggleSort('price')}>
        Сортировать по цене
      </button>
      <button onClick={() => toggleSort('dateAdded')}>
        Сортировать по дате добавления
      </button>
      {sortedCats?.map((cat: Cat) => (
        <div className="cat" key={cat._id} id={cat._id}>
          <img src={`https://cataas.com/cat/${cat._id}`} alt={cat._id} />
          <p>{cat.price} тыщ денег</p>
          <button
            onClick={(e) => removeFavorite(e.currentTarget.parentElement?.id)}
          >
            Х
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
