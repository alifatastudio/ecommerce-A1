import Firebase from "../Library/Firebase"

export default async function UPDATEPAYMENT(ID, RESOURCE){
	const db = Firebase.firestore()
	const paymentRef = db.collection('payments').doc(ID);

	const updated_data = {
		name: RESOURCE.name,
		bankName: RESOURCE.bankName,
		bankCode: RESOURCE.name,
		rekeningNumber: RESOURCE.rekeningNumber,
		imageUrl: RESOURCE.imageUrl
	}

	await paymentRef.update(updated_data)
}