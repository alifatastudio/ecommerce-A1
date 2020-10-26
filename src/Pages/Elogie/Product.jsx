import React from "react"
import * as Faker from "../../Library/Faker"
import LayoutDashboard from "../../Components/LayoutDashboard"
import GETALLPRODUCTSERVICE from "../../Services/GETALLPRODUCT"
import CREATEPRODUCTSERVICE from "../../Services/CREATEPRODUCT"
import UPDATEPRODUCTSERVICE from "../../Services/UPDATEPRODUCT"
import DELETEPRODUCTSERVICE from "../../Services/DELETEPRODUCT"

export default function Product(){
	const [values, setValues] = React.useState({...Faker.fakeproduct})
	const [allProduct, setAllProduct] = React.useState([])
	const [modalCreate, setModalCreate] = React.useState({...Faker.fakemodalcreate})
	const [modalEdit, setModalEdit] = React.useState({...Faker.fakemodaledit})
	const [modalDelete, setModalDelete] = React.useState({...Faker.fakemodaldelete})
	
	const input = [
		{
			name: "code",
			label: "Code",
			type: "text",
			value: values.code
		},
		{
			name: "name",
			label: "Name",
			type: "text",
			value: values.name
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			value: values.slug
		},
		{
			name: "price",
			label: "Price",
			type: "number",
			value: values.price
		},
		{
			name: "discount",
			label: "Discount",
			type: "number",
			value: values.discount
		},
		{
			name: "status",
			label: "Status",
			type: "text",
			value: values.status
		},
		{
			name: "category",
			label: "Category",
			type: "text",
			value: values.category
		},
		{
			name: "brand",
			label: "Brand",
			type: "text",
			value: values.brand
		},
		{
			name: "description",
			label: "Description",
			type: "text",
			value: values.description
		},
	]

	const toggleModalCreate = () => {
		setModalCreate(prevState => ({isOpen: !prevState.isOpen}))
	}

	const toggleModalEdit = (id, data) => () => {
		setModalEdit(prevState => {
			if(prevState.isOpen){
				setValues({...Faker.fakeproduct})
				return {...Faker.fakemodaledit}
			} 
			setValues({...data})
			return {isOpen: true, editId: id}
		})
	}

	const toggleModalDelete = id => () => {
		setModalDelete(prevState => {
			if(prevState.isOpen) return {...Faker.fakemodaldelete}
			return {isOpen: true, deleteId: id}
		})
	}

	const valueChange = name => event => {
		setValues({...values, [name]: event.target.value})
	}

	const valueImageChange = index => event => {
		let x = values.images
		x[index] = {id: index, url: event.target.value}
		setValues({...values, images: [...x]})
	}

	const addValueImage = () => {
		let x = values.images
		const max = values.images.length
		x[max] = {id: max, url: ""}
		setValues({...values, images: [...x]})
	}

	const reduceValueImage = () => {
		let x = values.images
		const last = values.images.length - 1
		const x_ = x.filter(value => value.id !== last)
		setValues({...values, images: [...x_]})
	}

	const valueVariantChange = (id, name) => event => {
		let x = values.variants.variant
		const y = values.variants.name
		x[id] = {...x[id], [name]: event.target.value}
		setValues({...values, variants: {name: y, variant: [...x]}})
	}

	const valueNameVariantChange = event => {
		const x = values.variants.variant
		const y = event.target.value
		setValues({...values, variants: {name: y, variant: [...x]}})
	}

	const addValueVariant = () => {
		let x = values.variants.variant
		const max = values.variants.variant.length
		const y = values.variants.name
		x[max] = {id: max, name: "", stock: 0, imageId: 0}
		setValues({...values, variants: {name: y, variant: [...x]}})
	}

	const reduceValueVariant = () => {
		let x = values.variants.variant
		const last = values.variants.variant.length - 1
		const y = values.variants.name
		const x_ = x.filter(value => value.id !== last)
		setValues({...values, variants: {name: y, variant: [...x_]}})
	}

	const validate = () => {
		return false
	}

	const CREATEPRODUCT = async () => {
		try{
			const new_data = {...values}
			const new_data_id = await CREATEPRODUCTSERVICE(new_data)

			setAllProduct(prevState => ([{...new_data, id: new_data_id}, ...prevState]))
			setValues({...Faker.fakeproduct})
			setModalCreate({...Faker.fakemodalcreate})
		} catch(error){
			console.log(error)
		}
	}

	const UPDATEPRODUCT = async () => {
		try{
			const id = modalEdit.editId
			const x = allProduct
			const x_ = x.filter(value => value.id !== id)
			const updated_data = {...values}
			const y = {id: id, ...values }
			setAllProduct([y,...x_])
			setValues({...Faker.fakeproduct})
			setModalEdit({...Faker.fakemodaledit})

			await UPDATEPRODUCTSERVICE(id, updated_data)
		} catch(error){
			console.log(error)
		}
	}

	const DELETEPRODUCT = async () => {
		try{
			const id = modalDelete.deleteId
			const x = allProduct
			const x_ = x.filter(value => value.id !== id)
			setAllProduct([...x_])
			setModalDelete({...Faker.fakemodaldelete})
		
			await DELETEPRODUCTSERVICE(id)
		} catch(error){
			console.log(error)
		}
	}

	React.useEffect(() => {
		async function POPULATEFIRSTDATA(){
			try{
				const x = await GETALLPRODUCTSERVICE()
				setAllProduct([...x])
			} catch(error){
				console.log(error)
			}
		}

		POPULATEFIRSTDATA()
	}, [])
	
	const inputModifier = (
		<div>
			{input.map(value => (
				<p key={value.name} >
		  	<label htmlFor={value.name}>{value.label}</label>
		  	{value.name === "description" ?
		  		<textarea 
			  		className="w3-input" 
			  		rows="4"
			  		id={value.name}
			  		name={value.name}
			  		value={value.value}
			  		onChange={valueChange(value.name)} 
			  		/> :
			  		<input 
				  		className="w3-input" 
				  		type={value.type}
				  		id={value.name}
				  		name={value.name}
				  		value={value.value}
				  		onChange={valueChange(value.name)}
				  	/>
		  	}
	  	</p>
			))}

		 <div style={{height: "35px"}} />
	  <div>	
	  	<label>Variants</label>

				<p>
		  	<label htmlFor="variantName">Variant</label>
		  	<button 
		  		className="w3-btn w3-green" 
		  		style={{marginLeft: "10px"}}
		  		onClick={addValueVariant}
		  	>
						 tambah
					</button>
					<button 
		  		className="w3-btn w3-red" 
		  		style={{marginLeft: "10px"}}
		  		onClick={reduceValueVariant}
		  		disabled={values.variants.variant.length <= 1 ? true: false}
		  	>
						 kurangi
					</button>
		  	<input 
		  		className="w3-input" 
		  		type="text"
		  		name="variantName"
		  		placeholder="variantName"
		  		value={values.variants.name}
		  		onChange={valueNameVariantChange}
		  	/>
	  	</p>

	  	{values.variants.variant.map((value, index) => (
	  		<div className="w3-row-padding" key={value.id}>
	  			<p className="w3-col w3-third">
			  		<label>name index {value.id}</label>
	  				<input 
				  		className="w3-input"
				  		name={value.id}
				  		value={value.name}
				  		onChange={valueVariantChange(value.id, "name")}
				  	/>
			  	</p>
			  	<p className="w3-col w3-third">
			  		<label>stock index {value.id}</label>
	  				<input 
				  		className="w3-input"
				  		type="number"
				  		name={value.id}
				  		value={value.stock}
				  		onChange={valueVariantChange(value.id, "stock")}
				  	/>
			  	</p>
			  	<p className="w3-col w3-third">
			  		<label>image id {value.id}</label>
	  				<input 
				  		className="w3-input"
				  		type="number"
				  		name={value.id}
				  		value={value.imageId}
				  		onChange={valueVariantChange(value.id, "imageId")}
				  	/>
			  	</p>
	  		</div>
	  	))}
  	</div>

		 <div style={{height: "45px"}} />
	  <div>
	  	<label >Images</label>
	  	<button 
	  		className="w3-btn w3-green" 
	  		style={{marginLeft: "10px"}}
	  		onClick={addValueImage}
	  	>
					 tambah
				</button>
				<button 
	  		className="w3-btn w3-red" 
	  		style={{marginLeft: "10px"}}
	  		onClick={reduceValueImage}
	  		disabled={values.images.length <= 1 ? true: false}
	  	>
					 kurangi
				</button>

	  	{values.images.map((value, index) => (
	  		<p key={value.id} >
		  		<label>url index {value.id}</label>
  				<input 
			  		className="w3-input" 
			  		name={value.id}
			  		value={value.url}
			  		onChange={valueImageChange(index)}
			  	/>
		  	</p>
	  	))}
  	</div>
		</div>
	)

	return (
		<LayoutDashboard title="Produk">
			<div className="w3-container">
				<button 
					className="w3-btn w3-blue"
					onClick={toggleModalCreate}
				>
					Tambah Produk
				</button>
				<div style={{height: "25px"}} />

				
				<div className="w3-container w3-text-grey">
	    <p>{allProduct.length} items</p>
	   </div>
				<table className="w3-table-all">
					<thead>
						<tr>
	      <th>id</th>
	      <th>code</th>
	      <th>name</th>
	      <th>price</th>
	      <th>category</th>
	      <th>action</th>
		    </tr>
		   </thead>
		   <tbody>
		    {allProduct.map(value => (
		    	<tr key={value.id}>
		      <td>{value.id}</td>
		      <td>{value.code}</td>
		      <td>{value.name}</td>
		      <td>{value.price}</td>
		      <td>
		      	<span className="w3-tag w3-theme w3-round-large">
          #{value.category.replace(/\s/g,'')}
         </span>
		      </td>
		      <td>
		      	<button 
		      		className="w3-button w3-small w3-blue"
		      		onClick={toggleModalEdit(value.id, value)}
		      	>
		      		edit
		      	</button>
		      	<button 
		      		className="w3-button w3-small w3-red"
		      		onClick={toggleModalDelete(value.id)}
		      	>
		      		delete
		      	</button>
		      </td>
			    </tr>
		    ))}
		   </tbody>
				</table>
			</div>

			{modalCreate.isOpen && (
				<div 
					id="modal-create-product" 
					className="w3-modal" 
					style={{display: modalCreate.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalCreate}
	        className="w3-button w3-display-topright">&times;</span>
	      		<h3>Create Product</h3>
	      </header>
	      <div className="w3-container">
								{inputModifier}
	      </div>
	      <footer className="w3-container">
	      	<button 
	       	className="w3-button w3-small w3-theme w3-right"
				     onClick={CREATEPRODUCT}
				     disabled={validate()}
	       >
	      		kirim
	      	</button>
	       <button 
	       	className="w3-button w3-small w3-blue w3-right"
				     onClick={toggleModalCreate}
	       >
	      		cancel
	      	</button>
	      	<div style={{height: "100px"}} />
	      </footer>
	    </div>
	  	</div>
			)}

			{modalEdit.isOpen && (
				<div 
					id="modal-create-product" 
					className="w3-modal" 
					style={{display: modalEdit.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalEdit(modalEdit.editId)}
	        className="w3-button w3-display-topright">&times;</span>
	      		<h3>Edit Product</h3>
	      </header>
	      <div className="w3-container">
								{inputModifier}
	      </div>
	      <footer className="w3-container">
	      	<button 
	       	className="w3-button w3-small w3-theme w3-right"
				     onClick={UPDATEPRODUCT}
				     disabled={validate()}
	       >
	      		kirim
	      	</button>
	       <button 
	       	className="w3-button w3-small w3-blue w3-right"
				     onClick={toggleModalEdit(modalEdit.editId)}
	       >
	      		cancel
	      	</button>
	      	<div style={{height: "100px"}} />
	      </footer>
	    </div>
	  	</div>
			)}

			{modalDelete.isOpen && (
				<div 
					id="modal-delete-category" 
					className="w3-modal" 
					style={{display: modalDelete.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalDelete(0)}
	        className="w3-button w3-display-topright">&times;</span>
	      </header>
	      <div className="w3-container" style={{textAlign: "center"}}>
	        <p>Hapus kategory id {modalDelete.deleteId} ?</p>
	      </div>
	      <footer className="w3-container" style={{textAlign: "center"}}>
	       <button 
	       	className="w3-button w3-small w3-blue"
				     onClick={toggleModalDelete(0)}
	       >
	      		cancel
	      	</button>
	      	<button 
	      		className="w3-button w3-small w3-red"
	      		onClick={DELETEPRODUCT}
	      	>
	      		delete
	      	</button>
	      </footer>
	    </div>
	  	</div>
			)}
		</LayoutDashboard>
	)
}