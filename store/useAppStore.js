import { create } from "zustand";

const useAppStore = create((set) => ({
  bookmarks: [],
  addBookmark: (post) =>
    set((state) => ({ bookmarks: [...state.bookmarks, post] })),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    })),
  isBookmarked: (id) =>
    set((state) => state.bookmarks.some((b) => b.id === id)),
}));

export default useAppStore;
