import Firebase from "../Library/Firebase"
import NormalizeCategorySlug from "../Library/NormalizeCategorySlug"

export default async function GETALLPRODUCTBYCATEGORY(SLUG){
	const db = Firebase.firestore()
	const productRef = db.collection('products');

	const x = NormalizeCategorySlug(SLUG)
	let productList = []
	const data = await productRef.where('category', '==', x).get()
	data.docs.map(doc => productList.push({ ...doc.data(), id: doc.id }))

	return productList
}