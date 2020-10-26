import React from "react"
import GETALLPRODUCTBYCATEGORY from "../Services/GETALLPRODUCTBYCATEGORY"

export default function Testing(){
	React.useState(() => {
		async function TEST(){
			try{
				const x = await GETALLPRODUCTBYCATEGORY("jaket")
				console.log(x)
			} catch(error){
				console.log(error)
			}
		}

		TEST()
	}, [])

	return <p>testing somethink</p>
}