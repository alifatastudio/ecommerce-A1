import Firebase from "../Library/Firebase"

export default async function GETALLPRODUCT(){
	const db = Firebase.firestore();
	const productRef = db.collection('products');

	let productList = []
	const data = await productRef.get()
	data.docs.map(doc => productList.push({ ...doc.data(), id: doc.id }))

	return productList
}