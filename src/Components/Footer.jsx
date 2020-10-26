import React from "react"
import { MEDIA } from "../Services/STORE/MEDIA"
import LOGO from "../Assets/LOGO.jpg"

export default function Footer(){
	const d = new Date()
	
	return (
		<footer className="w3-padding-64 w3-theme w3-center" id="footer">
			<div className="w3-row-padding">
   	<div className="w3-col m6">
     <img src={LOGO} className="brand-img" alt="Logo" />
   	</div>
   	<div className="w3-col m6 ">
   		<h4>Kontak Sosial Media</h4>
     <p>Ikuti sosial media kami dan dapatkan info menarik, tips, trik, diskon, promo, dan info seru lainnya. Hubungi kami jika kapanpun LOGIER ingin di jam kerja kami.</p>
   		<div className="w3-justify">
   			{MEDIA.map(value => (
							<div key={value.id}>
								<a href={"#" + value.name} className="w3-button"><i className={value.icon}></i></a>
		  				<a id={value.name} href={value.url} className="w3-button" target="_blank" rel="noopener noreferrer">{value.name}</a>
							</div>
						))}
   		</div>
   	</div>
			</div>

			<div style={{marginTop: "64px", textAlign: "center"}} >
    <span className="w3-button">
    	&copy; Copyright {d.getFullYear()} elogie
    </span>
   </div>
		</footer>
	)
}