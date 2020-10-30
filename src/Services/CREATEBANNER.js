import Firebase from "../Library/Firebase"

export default async function CREATEBANNER(RESOURCE){
	const db = Firebase.firestore()
	const bannerRef = db.collection('banner');

	const new_data = {
		name: RESOURCE.name,
		imageUrl: RESOURCE.imageUrl
	}

	const res = await bannerRef.add(new_data)

	return res.id
}