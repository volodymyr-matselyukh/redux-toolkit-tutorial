import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee } from '../types/Employee';

export const employeesApi = createApi({
	reducerPath: 'employeesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
	endpoints: (builder) => ({
	  getEmployees: builder.query<Employee[], number>({
		query: (limit) => ({
			url: `users?limit=${limit}`,
			responseHandler: async (response) => 
			{
				var responseJson = await response.json();
				return responseJson.users;
			}
		})
	  }),
	}),
  })
  
  export const { useGetEmployeesQuery } = employeesApi;