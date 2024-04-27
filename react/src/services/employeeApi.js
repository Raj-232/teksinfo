// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const employeeApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.us5.datadoghq.com/api/v1/',

    headers: { 
      'Content-Type': 'application/json',
      "DD-API-KEY":"7769ff1adb3e48e8fa3ee2d172d87a4c",
      "DD-APPLICATION-KEY":"09ead3f1050f0aafe1d0befa842ea3ac844172ec",
     }
  }),
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: () => `monitor`,
      providesTags: ["Employees"],
    }),

    getEmployee: builder.query({
      query: (id) => `employees/${id}`,
      invalidatesTags: ["Employees"],
    }),

    createEmployee: builder.mutation({
      query: (title) => ({ 
        url: `employees`,
        method: 'POST',
        body: title,
        
      }),
      invalidatesTags: ["Employees"],
    }),

    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `employees/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ["Employees"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllEmployeeQuery, useGetEmployeeQuery, useCreateEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation } = employeeApi;