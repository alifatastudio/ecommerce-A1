import { ALLPRODUCT } from "./STORE/ALLPRODUCT"

export default function GETPRODUCTBYCODE(CODE){
	const x = ALLPRODUCT.filter(value => value.code === CODE)
	if(x.length <= 0) return null
	const y = {...x[0]}
	return y
}