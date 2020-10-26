import Firebase from "../Library/Firebase"

export default async function GETPRODUCTBYSLUG(SLUG){
	const db = Firebase.firestore()
	const productRef = db.collection('products');

	let productList = []
	const data = await productRef.where('slug', '==', SLUG).get()
	data.docs.map(doc => productList.push({ ...doc.data(), id: doc.id }))

	if(productList.length <= 0) return null
	return productList[0]
}