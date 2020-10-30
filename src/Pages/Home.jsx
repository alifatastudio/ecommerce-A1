import React from "react"
import LayoutStore from "../Components/LayoutStore"
import Banner from "../Components/Banner"

export default function Home(){
	return (
		<LayoutStore title="Home">
			<Banner />
		</LayoutStore>
	)
}