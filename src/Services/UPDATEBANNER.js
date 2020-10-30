import Firebase from "../Library/Firebase"

export default async function UPDATEPRODUCT(ID, RESOURCE){
	const db = Firebase.firestore()
	const bannerRef = db.collection('banner').doc(ID);

	const updated_data = {
		name: RESOURCE.name,
		imageUrl: RESOURCE.imageUrl
	}

	await bannerRef.update(updated_data)
}