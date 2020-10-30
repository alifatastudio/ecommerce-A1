import Firebase from "../Library/Firebase"

export default async function DELETEPRODUCT(ID){
	const db = Firebase.firestore()
	const paymentRef = db.collection('payments').doc(ID);

	await paymentRef.delete()
}