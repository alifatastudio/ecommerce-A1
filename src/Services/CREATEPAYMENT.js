import Firebase from "../Library/Firebase"

export default async function CREATEPAYMENT(RESOURCE){
	const db = Firebase.firestore()
	const paymentRef = db.collection('payments');

	const new_data = {
		name: RESOURCE.name,
		bankName: RESOURCE.bankName,
		bankCode: RESOURCE.bankCode,
		rekeningNumber: RESOURCE.rekeningNumber,
		imageUrl: RESOURCE.imageUrl
	}

	const res = await paymentRef.add(new_data)

	return res.id
}