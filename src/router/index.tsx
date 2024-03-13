import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@/index.css";

import App from "@/App.tsx";
import Layout from "@/Layout";

import ErrorComponent from "@/components/errorComponent";
import LanguageForm from "@/components/language";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Layout>
				{" "}
				<App />{" "}
			</Layout>
		),
		errorElement: (
			<Layout>
				<ErrorComponent />
			</Layout>
		),
	},
	{
		path: "/language/:language",
		errorElement: (
			<Layout>
				<ErrorComponent />
			</Layout>
		),
		element: (
			<Layout>
				<LanguageForm />
			</Layout>
		),
	},
]);

const CustomRouter = () => {
	return <RouterProvider router={router} />;
};

export default CustomRouter;
