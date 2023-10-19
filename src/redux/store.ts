import { configureStore } from "@reduxjs/toolkit"
import { employeesApi } from "../api/EmployeesApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { useDispatch } from "react-redux"

export const store = configureStore({
	reducer: {
		[employeesApi.reducerPath]: employeesApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(employeesApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)