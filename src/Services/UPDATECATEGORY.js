import Firebase from "../Library/Firebase"

export default async function UPDATEPRODUCT(ID, RESOURCE){
	const db = Firebase.firestore()
	const categoryRef = db.collection('categories').doc(ID);

	const updated_data = {
		name: RESOURCE.name,
		urlSlug: RESOURCE.urlSlug
	}

	await categoryRef.update(updated_data)
}