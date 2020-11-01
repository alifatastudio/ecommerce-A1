import Firebase from "../Library/Firebase"

export default async function CREATEPRODUCT(RESOURCE){
	const db = Firebase.firestore()
	const productRef = db.collection('products');

	const new_data = {
		code: RESOURCE.code,
		name: RESOURCE.name,
		slug: RESOURCE.slug,
		price: parseFloat(RESOURCE.price),
		discount: parseFloat(RESOURCE.discount),
		status: RESOURCE.status,
		category: RESOURCE.category,
		tags: RESOURCE.tags,
		inventoryStatus: RESOURCE.inventoryStatus,
		description: RESOURCE.description,
		variants: RESOURCE.variants,
		images: RESOURCE.images
	}

	const res = await productRef.add(new_data)

	return res.id
}