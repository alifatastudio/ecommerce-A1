import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CategorySlug from "./Pages/Category/Slug";
import ProductSlug from "./Pages/Product/Slug";
import OrderCode from "./Pages/Order/Code";
import BlogMetodePembayaran from "./Pages/Blog/MetodePembayaran";
import BlogKonfirmasiPembayaran from "./Pages/Blog/KonfirmasiPembayaran";
import NotFound from "./Pages/404"
import "./App.css"

function App() {
	const router = [
		{
			name: "BlogKonfirmasiPembayaran",
			url: "/blog/konfirmasi-pembayaran",
			comp: <BlogKonfirmasiPembayaran />
		},
		{
			name: "BlogMetodePembayaran",
			url: "/blog/metode-pembayaran",
			comp: <BlogMetodePembayaran />
		},
		{
			name: "OrderCode",
			url: "/order/:code",
			comp: <OrderCode />
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
