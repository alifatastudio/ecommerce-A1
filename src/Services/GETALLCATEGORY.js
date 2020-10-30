import Firebase from "../Library/Firebase"

export default async function GETALLCATEGORY(){
	const db = Firebase.firestore();
	const categoryRef = db.collection('categories');

	let categoryList = []
	const data = await categoryRef.get()
	data.docs.map(doc => categoryList.push({ ...doc.data(), id: doc.id }))

	return categoryList
}