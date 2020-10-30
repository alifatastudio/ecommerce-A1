import React from "react"
import _ from "lodash"
import LayoutDashboard from "../../Components/LayoutDashboard"
import * as Faker from "../../Library/Faker"
import GETALLPAYMENTSERVICE from "../../Services/GETALLPAYMENT"
import CREATEPAYMENTSERVICE from "../../Services/CREATEPAYMENT"
import UPDATEPAYMENTSERVICE from "../../Services/UPDATEPAYMENT"
import DELETEPAYMENTSERVICE from "../../Services/DELETEPAYMENT"

export default function AdminOnlyBanner(){
	const [values, setValues] = React.useState({...Faker.fakepayment})
	const [allPayment, setAllPayment] = React.useState([])
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
			name: "bankName",
			label: "bank name",
			type: "text",
			value: values.bankName
		},
		{
			name: "bankCode",
			label: "bank code",
			type: "number",
			value: values.bankCode
		},
		{
			name: "rekeningNumber",
			label: "rekening number",
			type: "number",
			value: values.rekeningNumber
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
				setValues({...Faker.fakepayment})
				return {...Faker.fakemodaledit}
			} 
			setValues({...data})
			return {isOpen: true, editId: id}
		})
	}

	const toggleModalDelete = (id, data) => () => {
		setModalDelete(prevState => {
			if(prevState.isOpen){
				setValues({...Faker.fakepayment})
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
		if(values.bankName.length <= 0) return true
		if(values.bankCode.length <= 0) return true
		if(values.rekeningNumber.length <= 0) return true
		if(values.imageUrl.length <= 0) return true
		return false
	}

	const CREATEPAYMENT = async () => {
		try{
			const new_data = {...values}
			const new_data_id = await CREATEPAYMENTSERVICE(new_data)

			setAllPayment(prevState => ([{...new_data, id: new_data_id}, ...prevState]))
			setValues({...Faker.fakepayment})
			setModalCreate({...Faker.fakemodalcreate})
		} catch(error){
			console.log(error)
		}
	}

	const UPDATEPAYMENT = async () => {
		try{
			const id = modalEdit.editId
			const x = allPayment
			const x_ = x.filter(value => value.id !== id)
			const updated_data = {...values}
			const y = {id: id, ...values }
			setAllPayment([y,...x_])
			setValues({...Faker.fakepayment})
			setModalEdit({...Faker.fakemodaledit})

			await UPDATEPAYMENTSERVICE(id, updated_data)
		} catch(error){
			console.log(error)
		}
	}

	const DELETEPAYMENT = async () => {
		try{
			const id = modalDelete.deleteId
			const x = allPayment
			const x_ = x.filter(value => value.id !== id)
			setAllPayment([...x_])
			setModalDelete({...Faker.fakemodaldelete})
		
			await DELETEPAYMENTSERVICE(id)
		} catch(error){
			console.log(error)
		}
	}

	React.useEffect(() => {
		async function POPULATEFIRSTDATA(){
			try {
				const pay = await GETALLPAYMENTSERVICE()
				const y = _.sortBy(pay, "bankName")
				setAllPayment([...y])
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
					Create Payment
				</button>
				<div style={{height: "25px"}} />

				<div className="w3-container w3-text-grey">
	    <p>{allPayment.length} items</p>
	   </div>
				<table className="w3-table-all">
					<thead>
						<tr>
	      <th>name</th>
	      <th>bank name</th>
	      <th>bank code</th>
	      <th>rekening number</th>
	      <th>Image</th>
	      <th>action</th>
		    </tr>
		   </thead>
		   <tbody>
		    {allPayment.map(value => (
		    	<tr key={value.id}>
		      <td>{value.name}</td>
		      <td>{value.bankName}</td>
		      <td>{value.bankCode}</td>
		      <td>{value.rekeningNumber}</td>
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
					id="modal-create-payment" 
					className="w3-modal" 
					style={{display: modalCreate.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalCreate}
	        className="w3-button w3-display-topright">&times;</span>
	      		<h3>Create Payment</h3>
	      </header>
	      <div className="w3-container">
								{inputModifier}
	      </div>
	      <footer className="w3-container">
	      	<button 
	       	className="w3-button w3-small w3-theme w3-right"
				     onClick={CREATEPAYMENT}
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
					id="modal-edit-payment" 
					className="w3-modal" 
					style={{display: modalEdit.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalEdit(modalEdit.editId)}
	        className="w3-button w3-display-topright">&times;</span>
	      		<h3>Edit Payment</h3>
	      </header>
	      <div className="w3-container">
								{inputModifier}
	      </div>
	      <footer className="w3-container">
	      	<button 
	       	className="w3-button w3-small w3-theme w3-right"
				     onClick={UPDATEPAYMENT}
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
					id="modal-delete-payment" 
					className="w3-modal" 
					style={{display: modalDelete.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalDelete(0)}
	        className="w3-button w3-display-topright">&times;</span>
	      </header>
	      <div className="w3-container" style={{textAlign: "center"}}>
	        <p>Delete Payment {values.name} ?</p>
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
	      		onClick={DELETEPAYMENT}
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