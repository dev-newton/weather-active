import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { VITE_API_URL, VITE_API_KEY } = import.meta.env;

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${VITE_API_URL}` }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getWeatherInfo: builder.query({
      query: (city) => `?key=${VITE_API_KEY}&q=${city}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWeatherInfoQuery } = weatherApi;
