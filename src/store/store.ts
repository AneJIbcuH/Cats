import { create } from "zustand";

export type Cat = {
  mimetype: string;
  size: number;
  tags: string[];
  _id: string;
  price: number;
  fav: boolean;
  basket: boolean;
  dateFav?: number;
  dateBasket?: number;
};

export type SortKey = "price" | "dateAdded";

export type Cats = {
  cats: Cat[];
  setCats: (cats: Cat[]) => void;
  setFavorite: (id: string) => void;
  setBasket: (id: string) => void;
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
};

const useCatStore = create<Cats>((set) => ({
  cats: [],
  setCats: (initialCats) =>
    set(() => ({
      cats: initialCats,
    })),
  setFavorite: (id) =>
    set((state) => ({
      cats: state.cats.map((cat: Cat) =>
        cat._id == id ? { ...cat, fav: !cat.fav, dateFav: Date.now() } : cat
      ),
    })),
  setBasket: (id) =>
    set((state) => ({
      cats: state.cats.map((cat: Cat) =>
        cat._id == id
          ? { ...cat, basket: !cat.basket, dateBasket: Date.now() }
          : cat
      ),
    })),
  sortKey: "price",
  setSortKey: (key) => set({ sortKey: key }),
}));

export default useCatStore;
