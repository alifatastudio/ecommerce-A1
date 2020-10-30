import Firebase from "../Library/Firebase"

export default async function CREATECATEGORY(RESOURCE){
	const db = Firebase.firestore()
	const categoryRef = db.collection('categories');

	const new_data = {
		name: RESOURCE.name,
		urlSlug: RESOURCE.urlSlug
	}

	const res = await categoryRef.add(new_data)

	return res.id
}