import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "category",
  tagTypes: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      // deStruCInG GetsTAte From State ABovE
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      // console.log(token);
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      // mutation if POST or PUT method , query if GET method
      create: builder.mutation({
        query: (name) => {
          return {
            url: "create-category",
            method: "POST",
            body: name,
          };
        },
        invalidatesTags: ["categories"],
      }),

      get: builder.query({
        query: (page) => {
          return {
            url: `categories/:${page}`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),

      fetchCategory: builder.query({
        query: (id) => {
          return {
            url: `fetch-category/${id}`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),

      allCategories: builder.query({
        query: () => {
          return {
            url: "allcategories",
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),

      randomCategories: builder.query({
        query: () => {
          return {
            url: "random-categories",
            method: "GET",
          };
        },
      }),
      updateCategory: builder.mutation({
        query: (data) => {
          return {
            url: `update-category/${data.id}`,
            method: "PUT",
            body: { name: data.name },
          };
        },
        invalidatesTags: ["categories"],
      }),

      deleteCategory: builder.mutation({
        query: (id) => {
          return {
            url: `delete-category/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["categories"],
      }),
    };
  },
});
export const {
  useCreateMutation,
  useGetQuery,
  useFetchCategoryQuery,
  useAllCategoriesQuery,
  useRandomCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryService;
export default categoryService;
