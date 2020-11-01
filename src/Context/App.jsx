import React from "react"
import * as Faker from "../Library/Faker"
import GETAPPINFOSERVICE from "../Services/GETAPPINFO"

export const ContextApp = React.createContext()

export default function ContextProviderApp(props){
	const [appInfo, setAppInfo] = React.useState({...Faker.fakeappinfo})
	
	React.useEffect(() => {
		async function POPULATEFIRSTDATA(){
			try{
				const x = await GETAPPINFOSERVICE()
				setAppInfo({...x})
			} catch(error){
				console.log(error)
			}
		}

		POPULATEFIRSTDATA()
	}, [])

	return (
		<ContextApp.Provider value={{
			appInfo: {...appInfo}
		}}>
			{props.children}
		</ContextApp.Provider>
	)	
}