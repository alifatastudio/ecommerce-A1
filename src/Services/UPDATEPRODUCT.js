import Firebase from "../Library/Firebase"

export default async function UPDATEPRODUCT(ID, RESOURCE){
	const db = Firebase.firestore()
	const productRef = db.collection('products').doc(ID);

	const updated_data = {
		code: RESOURCE.code,
		name: RESOURCE.name,
		slug: RESOURCE.slug,
		price: parseFloat(RESOURCE.price),
		discount: parseFloat(RESOURCE.discount),
		status: RESOURCE.status,
		brand: RESOURCE.brand,
		category: RESOURCE.category,
		tags: RESOURCE.tags,
		inventoryStatus: RESOURCE.inventoryStatus,
		description: RESOURCE.description,
		variants: RESOURCE.variants,
		images: RESOURCE.images
	}

	await productRef.update(updated_data)
}