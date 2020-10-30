import Firebase from "../Library/Firebase"

export default async function DELETEPRODUCT(ID){
	const db = Firebase.firestore()
	const bannerRef = db.collection('banner').doc(ID);

	await bannerRef.delete()
}