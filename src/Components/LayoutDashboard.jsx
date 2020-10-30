import React from "react"
import { Link, useLocation } from "react-router-dom"
import Helmet from "react-helmet"
import NotFound from "../Pages/404"
import "./LayoutStore.css"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LayoutStore(props){
	const { title } = props
	const query = useQuery()
	const iam = query.get("iam")
	const [sidebarShow, setSidebarShow] = React.useState(false)
	const d = new Date()

	const toggleSidebar = () => {
		setSidebarShow(prevState => !prevState)
	}

	if(iam !== "bismillah") return <NotFound />
	return (
		<div className="w3-auto layout-wrapper">
			<Helmet>
    <title>ADMIN ONLY</title>
    <meta name="description" content="no content" />
   </Helmet>

			<nav className="w3-sidebar sidebar w3-bar-block w3-theme-white w3-collapse w3-top" style={{zIndex:"3",width:"250px", display: sidebarShow?"block":"none"}} id="mySidebar">
		  <div className="w3-container w3-display-container w3-padding-16">
		    <i onClick={toggleSidebar} className="fa fa-remove w3-hide-large w3-button w3-display-topright"></i>
	    	<h3 className="w3-wide">
		    	<Link to="/">
		    		<b className="brand">ELOGIE</b>
		    	</Link>
	    	</h3>
		  </div>

  		<div className="menu w3-padding-64 w3-large w3-text-grey">
					<Link to="/">
						<span className="w3-bar-item w3-button w3-light-grey">Home</span>
					</Link>
			  <Link to="/adminonly/banner?iam=bismillah">
						<span className="w3-bar-item w3-button w3-light-grey">Banner</span>
					</Link>
					<Link to="/adminonly/category?iam=bismillah">
						<span className="w3-bar-item w3-button w3-light-grey">Category</span>
					</Link>
					<Link to="/adminonly/product?iam=bismillah">
						<span className="w3-bar-item w3-button w3-light-grey">Product</span>
					</Link>
					<Link to="/adminonly/payment?iam=bismillah">
						<span className="w3-bar-item w3-button w3-light-grey">Payment</span>
					</Link>
					<Link to="/adminonly/setting?iam=bismillah">
						<span className="w3-bar-item w3-button w3-light-grey">Setting</span>
					</Link>
					<Link to="/adminonly/appVersion?iam=bismillah">
						<span className="w3-bar-item w3-button w3-light-grey">App Version</span>
					</Link>
			 </div>
			</nav>

			<header className="w3-bar w3-top w3-hide-large w3-theme w3-xlarge">
 			<div className="w3-bar-item w3-padding-24 w3-wide">ELOGIE</div>
 			<span href="#" className="w3-bar-item w3-button w3-padding-24 w3-right" onClick={toggleSidebar}><i className="fa fa-bars"></i></span>
			</header>

			<div 
				className="w3-overlay w3-hide-large" 
				onClick={toggleSidebar} 
				style={{cursor: "pointer", display: sidebarShow?"block":"none"}} 
				title="close side menu" 
				id="myOverlay" />

			<div className="w3-main" style={{marginLeft:"250px"}}>
				<div className="w3-hide-large" style={{marginTop:"83px"}} />

				<header className="w3-container w3-xlarge">
	    <p className={`w3-left`}></p>
	    <p className="w3-right">
	      <i className="fa fa-shopping-cart w3-margin-right"></i>
	      <i className="fa fa-search"></i>
	    </p>
		  </header>

			 {props.children}

			 <div style={{height: "55px"}} />
 			
 			<div style={{marginTop: "64px", textAlign: "center"}} >
	    <span className="w3-button">
	    	&copy; Copyright {d.getFullYear()}
	    </span>
	   </div>
			</div>
		</div>
	)
}