import React from "react"
import LayoutStore from "../Components/LayoutStore"

export default function NotFound(){
	return (
		<LayoutStore title="Halaman tidak ditemukan">
			<div>
				<p style={{textAlign: "center"}}>
					Hmm... halaman tidak ditemukan !! Coba pilih menu halaman yang lainnya.
					<br />
					Terima Kasih, jangan ragu untuk menghubungi kami <span role="img" aria-label="emojis">&#128526; &#128522;</span>
				</p>
			</div>
		</LayoutStore>
	)
}