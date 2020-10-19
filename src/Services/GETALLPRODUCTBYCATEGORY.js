import { ALLPRODUCT } from "./STORE/ALLPRODUCT"
import { ALLCATEGORY } from "./STORE/ALLCATEGORY"

export default function GETALLPRODUCTBYCATEGORY(SLUG){
	const x1 = ALLCATEGORY.filter(value => value.slug === SLUG)
	const x2 = x1[0]
	if(x1.length <= 0) return null

	const y = ALLPRODUCT.filter(value => value.categoryId === x2.id)
	if(y.length <= 0) return null

	return y
}