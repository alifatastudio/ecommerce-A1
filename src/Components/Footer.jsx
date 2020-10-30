import React from "react"

export default function Footer({
	appinfo
}){
	const d = new Date()

	return (
		<footer className="w3-padding-64 w3-theme w3-center" id="footer">
			<div className="w3-row-padding">
   	<div className="w3-col m6">
   		{appinfo.logoUrl.length > 0 ?
     	<img src={appinfo.logoUrl} className="brand-img" alt="Logo" />
     	: null
   		}
   	</div>
   	<div className="w3-col m6 ">
   		<div className="w3-justify">
   			{appinfo.instagramName.length > 0 ?
   				<div>
								<a href="#instagram" className="w3-button"><i className="fa fa-instagram"></i></a>
		  				<a id="#instagram" href={appinfo.instagramUrl} className="w3-button" target="_blank" rel="noopener noreferrer">@{appinfo.instagramName}</a>
							</div>
							:  null
   			}
   			{appinfo.whatsApp.length > 0 ?
   				<div>
								<a href="#whatsApp" className="w3-button"><i className="fa fa-whatsapp"></i></a>
		  				<a id="#whatsApp" href={"https://wa.me/"+appinfo.whatsApp} className="w3-button" target="_blank" rel="noopener noreferrer">{appinfo.whatsApp}</a>
							</div>
							:  null
   			}
   			{appinfo.email.length > 0 ?
   				<div>
								<a href="#email" className="w3-button"><i className="fa fa-envelope"></i></a>
		  				<span id="#email" className="w3-button" target="_blank" rel="noopener noreferrer">{appinfo.email}</span>
							</div>
							:  null
   			}
   			{appinfo.website.length > 0 ?
   				<div>
								<a href="#website" className="w3-button"><i className="fa fa-globe"></i></a>
		  				<a id="#website" href={appinfo.website} className="w3-button" target="_blank" rel="noopener noreferrer">{appinfo.website}</a>
							</div>
							:  null
   			}
   		</div>
   	</div>
			</div>

			<div style={{marginTop: "64px", textAlign: "center"}} >
    <span className="w3-button">
    	&copy; Copyright {d.getFullYear()} {appinfo.name}
    </span>
   </div>
		</footer>
	)
}