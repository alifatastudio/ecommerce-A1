export const fakeproduct = {
	id: 0,
	code: "",
	name: "",
	slug: "",
	price: "",
	discount: 0,
	status: "",
	brandId: "",
	categoryId: "",
	description: "",
	variants: {
		name: "",
		variant: [{id: 0, name: "", stock: 1, production: 100, imageId: 0}]
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
	isLoadingTheProduct: true,
 isError: false,
 errorMessage: ""
}