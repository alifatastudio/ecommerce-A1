import React from "react"
import _ from "lodash"
import LayoutDashboard from "../../Components/LayoutDashboard"
import * as Faker from "../../Library/Faker"
import GETALLBANNERSERVICE from "../../Services/GETALLBANNER"
import CREATEBANNERSERVICE from "../../Services/CREATEBANNER"
import UPDATEBANNERSERVICE from "../../Services/UPDATEBANNER"
import DELETEBANNERSERVICE from "../../Services/DELETEBANNER"

export default function AdminOnlyBanner(){
	const [values, setValues] = React.useState({...Faker.fakebanner})
	const [allBanner, setAllBanner] = React.useState([])
	const [modalCreate, setModalCreate] = React.useState({...Faker.fakemodalcreate})
	const [modalEdit, setModalEdit] = React.useState({...Faker.fakemodaledit})
	const [modalDelete, setModalDelete] = React.useState({...Faker.fakemodaldelete})

	const input = [
		{
			name: "name",
			label: "name",
			type: "text",
			value: values.name
		},
		{
			name: "imageUrl",
			label: "url image",
			type: "text",
			value: values.imageUrl
		}
	]

	const toggleModalCreate = () => {
		setModalCreate(prevState => ({isOpen: !prevState.isOpen}))
	}

	const toggleModalEdit = (id, data) => () => {
		setModalEdit(prevState => {
			if(prevState.isOpen){
				setValues({...Faker.fakebanner})
				return {...Faker.fakemodaledit}
			} 
			setValues({...data})
			return {isOpen: true, editId: id}
		})
	}

	const toggleModalDelete = (id, data) => () => {
		setModalDelete(prevState => {
			if(prevState.isOpen){
				setValues({...Faker.fakebanner})
				return {...Faker.fakemodaldelete}
			} 
			setValues({...data})
			return {isOpen: true, deleteId: id}
		})
	}

	const valueChange = name => event => {
		setValues({...values, [name]: event.target.value})
	}

	const validate = () => {
		if(values.name.length <= 0) return true
		if(values.imageUrl.length <= 0) return true
		return false
	}

	const CREATEBANNER = async () => {
		try{
			const new_data = {...values}
			const new_data_id = await CREATEBANNERSERVICE(new_data)

			setAllBanner(prevState => ([{...new_data, id: new_data_id}, ...prevState]))
			setValues({...Faker.fakebanner})
			setModalCreate({...Faker.fakemodalcreate})
		} catch(error){
			console.log(error)
		}
	}

	const UPDATEBANNER = async () => {
		try{
			const id = modalEdit.editId
			const x = allBanner
			const x_ = x.filter(value => value.id !== id)
			const updated_data = {...values}
			const y = {id: id, ...values }
			setAllBanner([y,...x_])
			setValues({...Faker.fakebanner})
			setModalEdit({...Faker.fakemodaledit})

			await UPDATEBANNERSERVICE(id, updated_data)
		} catch(error){
			console.log(error)
		}
	}

	const DELETEBANNER = async () => {
		try{
			const id = modalDelete.deleteId
			const x = allBanner
			const x_ = x.filter(value => value.id !== id)
			setAllBanner([...x_])
			setModalDelete({...Faker.fakemodaldelete})
		
			await DELETEBANNERSERVICE(id)
		} catch(error){
			console.log(error)
		}
	}

	React.useEffect(() => {
		async function POPULATEFIRSTDATA(){
			try {
				const banner = await GETALLBANNERSERVICE()
				const y = _.sortBy(banner, "name")
				setAllBanner([...y])
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
	  		<input 
		  		className="w3-input" 
		  		type={value.type}
		  		id={value.name}
		  		name={value.name}
		  		value={value.value}
		  		onChange={valueChange(value.name)}
		  	/>
	  	</p>
			))}
		</div>
	)

	return (
		<LayoutDashboard>
			<div className="w3-container">
				<button 
					className="w3-btn w3-blue"
					onClick={toggleModalCreate}
				>
					Create Banner
				</button>
				<div style={{height: "25px"}} />

				<div className="w3-container w3-text-grey">
	    <p>{allBanner.length} items</p>
	   </div>
				<table className="w3-table-all">
					<thead>
						<tr>
	      <th>name</th>
	      <th>Image</th>
	      <th>action</th>
		    </tr>
		   </thead>
		   <tbody>
		    {allBanner.map(value => (
		    	<tr key={value.id}>
		      <td>{value.name}</td>
		      <td>
		      	<img 
		      		src={value.imageUrl} 
		      		alt="Banner" 
		      		style={{width:"350px"}}
		      	/>
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
		      		onClick={toggleModalDelete(value.id, value)}
		      	>
		      		delete
		      	</button>
		      </td>
			    </tr>
		    ))}
		   </tbody>
				</table>
				{/* END TABLE */}
			</div>

			{/* CRUD MODAL */}
			{/* CREATE */}
			{modalCreate.isOpen && (
				<div 
					id="modal-create-banner" 
					className="w3-modal" 
					style={{display: modalCreate.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalCreate}
	        className="w3-button w3-display-topright">&times;</span>
	      		<h3>Create Banner</h3>
	      </header>
	      <div className="w3-container">
								{inputModifier}
	      </div>
	      <footer className="w3-container">
	      	<button 
	       	className="w3-button w3-small w3-theme w3-right"
				     onClick={CREATEBANNER}
				     disabled={validate()}
	       >
	      		create
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
					id="modal-edit-banner" 
					className="w3-modal" 
					style={{display: modalEdit.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalEdit(modalEdit.editId)}
	        className="w3-button w3-display-topright">&times;</span>
	      		<h3>Edit Banner</h3>
	      </header>
	      <div className="w3-container">
								{inputModifier}
	      </div>
	      <footer className="w3-container">
	      	<button 
	       	className="w3-button w3-small w3-theme w3-right"
				     onClick={UPDATEBANNER}
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
					id="modal-delete-banner" 
					className="w3-modal" 
					style={{display: modalDelete.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalDelete(0)}
	        className="w3-button w3-display-topright">&times;</span>
	      </header>
	      <div className="w3-container" style={{textAlign: "center"}}>
	        <p>Delete Banner {values.name} ?</p>
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
	      		onClick={DELETEBANNER}
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