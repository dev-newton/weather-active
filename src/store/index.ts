import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { PreloadedState } from "@reduxjs/toolkit";

import citiesReducer from "reducers/citiesSlice";
import { weatherApi } from "services/weather.service";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  cities: citiesReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(weatherApi.middleware),
  });
};
// export const store = configureStore({
//   reducer: rootReducer,
//   PreloadedState,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(weatherApi.middleware),
// });

// setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";

// import citiesReducer from "reducers/citiesSlice";
// import { weatherApi } from "services/weather.service";

// export const store = configureStore({
//   reducer: {
//     cities: citiesReducer,
//     [weatherApi.reducerPath]: weatherApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(weatherApi.middleware),
// });

// setupListeners(store.dispatch);

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
