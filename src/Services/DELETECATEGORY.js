import Firebase from "../Library/Firebase"

export default async function DELETEPRODUCT(ID){
	const db = Firebase.firestore()
	const categoryRef = db.collection('categories').doc(ID);

	await categoryRef.delete()
}