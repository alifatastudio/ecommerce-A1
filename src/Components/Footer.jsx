import React from "react"
import { Link } from "react-router-dom"
import NumberFormat from "react-number-format"
import { ContextApp } from "../Context/App"

export default function Footer(){
  const App = React.useContext(ContextApp)
	const d = new Date()

	return (
		<footer className="w3-padding-64 w3-theme w3-center" id="footer">
			<div className="w3-row-padding">
   	<div className="w3-col m6">
   		{App.appInfo.logoUrl.length > 0 ?
     	<img src={App.appInfo.logoUrl} className="brand-img" alt="Logo" />
     	: null
   		}
   	</div>
   	<div className="w3-col m6 ">
   		<div className="w3-justify">
        <div>
         <a href="#payment" className="w3-button"><i className="fa fa-credit-card"></i></a>
         <Link to="/payment">
          <span id="#payment" className="w3-button">payment</span>
         </Link>
        </div>
   			{App.appInfo.instagramName.length > 0 ?
   				<div>
								<a href="#instagram" className="w3-button"><i className="fa fa-instagram"></i></a>
		  				<a id="#instagram" href={App.appInfo.instagramUrl} className="w3-button" target="_blank" rel="noopener noreferrer">@{App.appInfo.instagramName}</a>
							</div>
							:  null
   			}
   			{App.appInfo.whatsApp.length > 0 ?
   				<div>
								<a href="#whatsApp" className="w3-button"><i className="fa fa-whatsapp"></i></a>
		  				<a id="#whatsApp" href={"https://wa.me/"+App.appInfo.whatsApp} className="w3-button" target="_blank" rel="noopener noreferrer"><NumberFormat value={App.appInfo.whatsApp} displayType={'text'} format="## ### #### ####" /></a>
							</div>
							:  null
   			}
   			{App.appInfo.email.length > 0 ?
   				<div>
								<a href="#email" className="w3-button"><i className="fa fa-envelope"></i></a>
		  				<span id="#email" className="w3-button" target="_blank" rel="noopener noreferrer">{App.appInfo.email}</span>
							</div>
							:  null
   			}
   			{App.appInfo.website.length > 0 ?
   				<div>
								<a href="#website" className="w3-button"><i className="fa fa-globe"></i></a>
		  				<a id="#website" href={App.appInfo.website} className="w3-button" target="_blank" rel="noopener noreferrer">{App.appInfo.website}</a>
							</div>
							:  null
   			}
   		</div>
   	</div>
			</div>

			<div style={{marginTop: "64px", textAlign: "center"}} >
    <span className="w3-button">
    	&copy; Copyright {d.getFullYear()} {App.appInfo.name}
    </span>
   </div>
		</footer>
	)
}