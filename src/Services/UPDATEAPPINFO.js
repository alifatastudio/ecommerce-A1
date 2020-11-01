import Firebase from "../Library/Firebase"

export default async function UPDATEPRODUCT(ID, RESOURCE){
	const db = Firebase.firestore()
	const bannerRef = db.collection('appInfo').doc(ID);

	const updated_data = {
		name: RESOURCE.name,
		slogan: RESOURCE.slogan,
		theme: RESOURCE.theme,
		instagramName: RESOURCE.instagramName,
		instagramUrl: RESOURCE.instagramUrl,
		email: RESOURCE.email,
		logoUrl: RESOURCE.logoUrl,
		website: RESOURCE.website,
		whatsApp: RESOURCE.whatsApp
	}

	await bannerRef.update(updated_data)
}