import React from "react"
import { Link } from "react-router-dom"
import Helmet from "react-helmet"
import _ from "lodash"
import Footer from "./Footer"
import "./LayoutStore.css"
import * as Faker from "../Library/Faker"
import GETAPPINFOSERVICE from "../Services/GETAPPINFO"
import GETALLCATEGORYSERVICE from "../Services/GETALLCATEGORY"

export default function LayoutStore(props){
	const { title } = props
	const [sidebarShow, setSidebarShow] = React.useState(false)
	const [appInfo, setAppInfo] = React.useState({...Faker.fakeappInfo})
	const [allCategory, setAllCategory] = React.useState([])

	const toggleSidebar = () => {
		setSidebarShow(prevState => !prevState)
	}

	React.useEffect(() => {
		async function POPULATEFIRSTDATA(){
			try{
				const appInfo = await GETAPPINFOSERVICE()
				setAppInfo({...appInfo})

				const categories = await GETALLCATEGORYSERVICE()	
				const y = _.sortBy(categories, "name")
				setAllCategory([...y])
			} catch(error){
				console.log(error)
			}
		}

		POPULATEFIRSTDATA()
	}, [])

	return (
		<div className="w3-auto layout-wrapper">
			<Helmet>
    <title>{appInfo.name + " | " + title}</title>
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
					{allCategory.map(value => (
						<Link to={"/category/"+value.urlSlug} key={value.id}>
     		<span className="w3-bar-item w3-button w3-light-grey" onClick={toggleSidebar}>
     		{value.name}
     		</span>
						</Link>
					))}
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
 			<Footer appinfo={appInfo} />
			</div>
		</div>
	)
}