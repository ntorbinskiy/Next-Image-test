import { configureStore } from "@reduxjs/toolkit";

import paginationSlice from "./slices/pagination";
import selectedTagsSlice from "./slices/selectedTags";
import themeSlice from "./slices/theme";

const store = configureStore({
  reducer: {
    selectedTags: selectedTagsSlice,
    pagination: paginationSlice,
    theme: themeSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
