import React from "react"
import { ContextApp } from "../../Context/App"
import LayoutDashboard from "../../Components/LayoutDashboard"
import UPDATEAPPINFOSERVICE from "../../Services/UPDATEAPPINFO"

export default function AdminOnlySetting(){
	const App = React.useContext(ContextApp)
	const [appInfo, setAppInfo] = React.useState({...App.appInfo})
	const [isEdit, setIsEdit] = React.useState(false)

	const input = [
		{
			name: "name",
			label: "name",
			placeholder: "name...",
			type: "text",
			value: appInfo.name
		},
		{
			name: "slogan",
			label: "slogan",
			placeholder: "slogan...",
			type: "text",
			value: appInfo.slogan
		},
		{
			name: "logoUrl",
			label: "logo url",
			placeholder: `https://exaplestore.com/logo.jpg...`,
			type: "text",
			value: appInfo.logoUrl
		},
		{
			name: "email",
			label: "email",
			placeholder: `example@email.com`,
			type: "text",
			value: appInfo.email
		},
		{
			name: "whatsApp",
			label: "whats app",
			placeholder: `62858xxxxxxx`,
			type: "text",
			value: appInfo.whatsApp
		},
		{
			name: "instagramName",
			label: "isntagram name",
			placeholder: `examplestore`,
			type: "text",
			value: appInfo.instagramName
		},
		{
			name: "instagramUrl",
			label: "instagram url",
			placeholder: `https://instagram.com/examplestore...`,
			type: "text",
			value: appInfo.instagramUrl
		},
		{
			name: "website",
			label: "website",
			placeholder: `https://exaplestore.com...`,
			type: "text",
			value: appInfo.website
		},
	]

	const valueChange = name => event => {
		setAppInfo({...appInfo, [name]: event.target.value})
	}

	const toggleEdit = () => {
			setIsEdit(!isEdit)
	}

	const UPDATEAPPINFO = async () => {
		try{
			setIsEdit(!isEdit)
			await UPDATEAPPINFOSERVICE(appInfo.id, appInfo)
		} catch(error){
			console.log(error)
		}
	}

	return (
		<LayoutDashboard>	
			<div className="w3-container">
				<h3>Setting App</h3>
				<button style={{marginRight: "15px"}} className="w3-button w3-blue" onClick={toggleEdit} >
					{isEdit? "Cancel": "Edit"}
				</button>
				<button className="w3-button w3-blue" onClick={UPDATEAPPINFO} disabled={!isEdit} >
					Save
				</button>
				<div>
					{input.map(value => (
						<p key={value.name} >
				  	<label htmlFor={value.name}>{value.label}</label>
			  		<input 
				  		className="w3-input" 
				  		type={value.type}
				  		id={value.name}
				  		name={value.name}
				  		value={value.value}
				  		onChange={valueChange(value.name)}
				  		disabled={!isEdit}
				  	/>
			  	</p>
					))}
				</div>
			</div>
		</LayoutDashboard>
	)
}