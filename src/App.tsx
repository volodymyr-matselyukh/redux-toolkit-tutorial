import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewEmployee from "./components/ViewEmployee";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "view/:id",
		element: <ViewEmployee />
	}
]);

function App() {
	return (
		
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
