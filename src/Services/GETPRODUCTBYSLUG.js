import { ALLPRODUCT } from "./STORE/ALLPRODUCT"

export default function GETPRODUCTBYSLUG(SLUG){
	const x = ALLPRODUCT.filter(value => value.slug === SLUG)
	if(x.length <= 0) return null
	const y = {...x[0]}
	return y
}