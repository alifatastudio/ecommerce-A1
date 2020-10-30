import Firebase from "../Library/Firebase"

export default async function GETALLCATEGORY(){
	const db = Firebase.firestore();
	const bannerRef = db.collection('banner');

	let bannerList = []
	const data = await bannerRef.get()
	data.docs.map(doc => bannerList.push({ ...doc.data(), id: doc.id }))

	return bannerList
}