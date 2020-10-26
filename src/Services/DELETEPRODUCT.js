import Firebase from "../Library/Firebase"

export default async function DELETEPRODUCT(ID){
	const db = Firebase.firestore()
	const productRef = db.collection('products').doc(ID);

	await productRef.delete()
}