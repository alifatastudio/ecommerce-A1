import React from "react"
import LayoutStore from "../Components/LayoutStore"
import Banner from "../Components/Banner"

export default function Home(){
	return (
		<LayoutStore title="Created for Your Satisfaction">
			<Banner />

			<p style={{textAlign: "center"}}>
 			Selamat datang di ELOGIE, silakan pilih menu yang tersedia.
 			<br/>
 			Jangan ragu untuk menghubungi kami &#128522; 
 		</p>
		</LayoutStore>
	)
}