import useCatStore from "../store/store";
import { Cat, SortKey } from "../store/store";
import { useEffect, useState } from "react";

const Basket: React.FC = () => {
  const [discount, setDiscount] = useState(1);
  const cats = useCatStore((state) =>
    state.cats.filter((cat) => cat.basket == true)
  );
  const setBasket = useCatStore((state) => state.setBasket);
  const { sortKey, setSortKey } = useCatStore();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    switch (cats.filter((cat) => cat.basket == true).length) {
      case 1:
        setDiscount(1);
        break;
      case 2:
        setDiscount(0.95);
        break;
      case 3:
        setDiscount(0.9);
        break;
      case 4:
        setDiscount(0.85);
        break;
      default:
        setDiscount(0.8);
        break;
    }
  }, []);

  function removeBasket(id: string) {
    console.log(id);
    setBasket(id);
  }

  const sortCats = (a: Cat, b: Cat): number => {
    if (sortKey === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    } else {
      return sortDirection === "asc"
        ? a.dateBasket - b.dateBasket
        : b.dateBasket - a.dateBasket;
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
    <div>
      <button onClick={() => toggleSort("price")}>Сортировать по цене</button>
      <button onClick={() => toggleSort("dateAdded")}>
        Сортировать по дате добавления
      </button>

      <h1>
        Итого на сумму:{" "}
        {Math.ceil(
          cats
            .filter((cat) => cat.basket == true)
            .reduce((sum, cat) => sum + cat.price, 0) * discount
        )}{" "}
        тыщ денег
      </h1>
      <div className="cats">
        {sortedCats?.map((cat: Cat) => (
          <div className="cat" key={cat._id} id={cat._id}>
            <img src={`https://cataas.com/cat/${cat._id}`} alt={cat._id} />
            <p>{cat.price} тыщ денег</p>
            <button
              onClick={(e) => removeBasket(e.currentTarget.parentElement?.id)}
            >
              Х
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
