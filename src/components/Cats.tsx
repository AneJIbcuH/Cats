import axios from "axios";
import { useEffect, useState } from "react";
import useCatStore from "../store/store";
import { Cat, SortKey } from "../store/store";
import { Modal, Input } from "antd";
import { SearchOutlined, SwapOutlined } from "@ant-design/icons";

const Cats: React.FC = () => {
  const setCats = useCatStore((state) => state.setCats);
  const setFavorite = useCatStore((state) => state.setFavorite);
  const setBasket = useCatStore((state) => state.setBasket);
  const { sortKey, setSortKey } = useCatStore();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const cats = useCatStore((state) => state.cats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Cat | null | undefined>(null);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [myTag, setMyTag] = useState("");

  useEffect(() => {
    axios.get("https://cataas.com/api/cats?limit=50&skip=1").then((res) => {
      if (!cats.length) {
        setCats(
          res.data.map((cat: Cat) => ({
            ...cat,
            price: Math.ceil(cat.size * Math.random()),
            fav: false,
            basket: false,
          }))
        );
      }
    });
  }, []);

  function addFavorite(id: string) {
    console.log(id);
    setFavorite(id);
    handleCancel();
  }

  function addBasket(id: string) {
    console.log(id);
    setBasket(id);
    console.log("корзина");
    handleCancel();
  }

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setSelectedCat(cats.find((cat) => cat._id == id));
    console.log(id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const sortedCats = cats
    .slice()
    .sort(sortCats)
    .filter((cat) => cat.price > minPrice && cat.price < maxPrice)
    .filter((cat) => cat.tags.join().toLocaleLowerCase().includes(myTag.toLocaleLowerCase()));

  return (
    <div className="cats">
      <div className="filter">
      <input
        className="filters"
        type="number"
        placeholder="Минимальная цена"
        onChange={(e) => setMinPrice(parseInt(e.target.value))}
      />
      <input
        className="filters"
        type="number"
        placeholder="Максимальная цена"
        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
      />
      <Input
        placeholder="Поиск по тегу"
        onChange={(e) => setMyTag(e.target.value)}
        prefix={<SearchOutlined />}
        className="filters"
      />

      <button className="filters" onClick={() => toggleSort("price")}>Сортировать по цене <SwapOutlined /></button>
      </div>
      
      

      {selectedCat && (
        <Modal
          title={`Котик стоит ${selectedCat.price} тыщ денег`}
          open={isModalOpen}
          onCancel={handleCancel}
          width={800}
          style={{ top: 20 }}
          footer={[
            <>
              <button className="modal-btn" onClick={() => addFavorite(selectedCat._id)}>
                {!selectedCat.fav ? "В избранное" : "Удалить из избранного"}
              </button>
              <button className="modal-btn" onClick={() => addBasket(selectedCat._id)}>
                {!selectedCat.basket ? "В корзину" : "Удалить из корзины"}
              </button>
            </>,
          ]}
        >
          <img
            className="modal-img"
            src={`https://cataas.com/cat/${selectedCat._id}`}
            alt={selectedCat._id}
          />
          <div className="tags">
            {selectedCat.tags.map((cat: string) => (
              <div key={cat}>{cat}</div>
            ))}
          </div>
        </Modal>
      )}
      {sortedCats?.map((cat: Cat) => (
        <div
          className="cat"
          key={cat._id}
          id={cat._id}
          onClick={() => showModal(cat._id)}
        >
          <img src={`https://cataas.com/cat/${cat._id}`} alt={cat._id} />
          <a>{cat.price} $</a>
        </div>
      ))}
    </div>
  );
};

export default Cats;
