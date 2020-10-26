export const fakeproduct = {
	id: 0,
	code: "",
	name: "",
	slug: "",
	price: "",
	discount: 0,
	status: "",
	brand: "",
	category: "",
	description: "",
	variants: {
		id: 0,
		name: "",
		variant: [{id: 0, name: "", stock: 1, imageId: 0}]
	},
	images: [{id: 0, url: ""}]
}

export const fakeorder = {
	name: "", 
	phone: "", country: "Indonesia", 
	province: "", city: "", subdistrict: "",
	zipcode: "", address: "", note: ""
}

export const fakeloader = {
	isLoading: true,
 isError: false,
 errorMessage: ""
}

export const fakemodalcreate = {
		isOpen: false
}

export const fakemodaledit = {
	isOpen: false, editId: 0,
}

export const fakemodaldelete = {
	isOpen: false, deleteId: 0
}