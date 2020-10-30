import Firebase from "../Library/Firebase"

export default async function GETALLPRODUCT(){
	const db = Firebase.firestore();
	const appInfoRef = db.collection('appInfo');

	let appInfoList = []
	const data = await appInfoRef.get()
	data.docs.map(doc => appInfoList.push({ ...doc.data(), id: doc.id }))

	return appInfoList[0]
}