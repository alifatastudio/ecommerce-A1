import Firebase from "../Library/Firebase"

export default async function GETALLPAYMENT(){
	const db = Firebase.firestore();
	const paymentRef = db.collection('payments');

	let paymentList = []
	const data = await paymentRef.get()
	data.docs.map(doc => paymentList.push({ ...doc.data(), id: doc.id }))

	return paymentList
}