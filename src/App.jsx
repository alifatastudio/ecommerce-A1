import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";

import AdminOnlyProduct from "./Pages/AdminOnly/Product";

import AdminOnlyCategory from "./Pages/AdminOnly/Category";
import AdminOnlyBanner from "./Pages/AdminOnly/Banner";
import AdminOnlyPayment from "./Pages/AdminOnly/Payment";
import AdminOnlySetting from "./Pages/AdminOnly/Setting";
import AdminOnlyAppVersion from "./Pages/AdminOnly/AppVersion";
import BlogMetodePembayaran from "./Pages/Blog/MetodePembayaran";

import CategorySlug from "./Pages/Category/Slug";
import ProductSlug from "./Pages/Product/Slug";

import NotFound from "./Pages/404"
import "./App.css"

function App() {

	const router = [
		{
			name: "AdminOnlyProduct",
			url: "/adminonly/product",
			comp: <AdminOnlyProduct />
		},
		{
			name: "AdminOnlyCategory",
			url: "/adminonly/category",
			comp: <AdminOnlyCategory />
		},
		{
			name: "AdminOnlyBanner",
			url: "/adminonly/banner",
			comp: <AdminOnlyBanner />
		},
		{
			name: "AdminOnlyPayment",
			url: "/adminonly/payment",
			comp: <AdminOnlyPayment />
		},
		{
			name: "AdminOnlySetting",
			url: "/adminonly/setting",
			comp: <AdminOnlySetting />
		},
		{
			name: "AdminOnlyAppVersion",
			url: "/adminonly/appVersion",
			comp: <AdminOnlyAppVersion />
		},
		{
			name: "BlogMetodePembayaran",
			url: "/blog/metode-pembayaran",
			comp: <BlogMetodePembayaran />
		},
		{
			name: "ProductSlug",
			url: "/product/:slug", 
			comp: <ProductSlug />
		},
		{
			name: "CategorySlug",
			url: "/category/:slug", 
			comp: <CategorySlug />
		},
		{
			name: "NotFound",
			url: "/not-found", 
			comp: <NotFound />
		},
		{
			name: "Home",
			url: "/", 
			comp: <Home />
		},
		{
			name: "Not Found",
			url: "*", 
			comp: <NotFound />
		}
	]

 return (
		<Switch>
			{router.map(value => <Route key={value.name} exact={value.url === "/"? true: false} path={value.url} children={value.comp} />)}
 	</Switch>
 )
}

export default App;
