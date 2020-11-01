import React from "react"
import _ from "lodash"
import LayoutStore from "../Components/LayoutStore"
import * as Faker from "../Library/Faker"
import GETAPPINFOSERVICE from "../Services/GETAPPINFO"
import GETALLPAYMENTSERVICE from "../Services/GETALLPAYMENT"

export default function MetodePembayaran(){
 const [appInfo, setAppInfo] = React.useState({...Faker.fakeappinfo})
 const [allPayment, setAllPayment] = React.useState([])

 React.useEffect(() => {
  async function POPULATEFIRSTDATA(){
   try{
    const appInfo = await GETAPPINFOSERVICE()
    const pay = await GETALLPAYMENTSERVICE()
    const y = _.sortBy(pay, "bankName")
    setAllPayment([...y])
    setAppInfo({...appInfo})
   } catch(error){
    console.log(error)
   }
  }

  POPULATEFIRSTDATA()
 }, [])

	return (
	<LayoutStore title={appInfo.name + " | Metode Pembayaran" } >
   <ul className="w3-ul">
    <li>
     <i className="fa fa-angle-double-right"></i> <strong>REKENING ATM</strong><br/><br/>
     <ul className="w3-ul">
      {allPayment.map(value => (
       <li key={value.id}>
        <div className="w3-row-padding w3-card-4">
         <div className="w3-col m4 w3-padding-16">
          <img src={value.imageUrl} alt={value.bank} style={{width:"100%"}} />
         </div>
         <div className="w3-col m8">   
          <p>
          Nama <i className="fa fa-angle-double-right"></i> {value.name}<br/>
          Bank <i className="fa fa-angle-double-right"></i> {value.bank}<br/>
          Kode Bank <i className="fa fa-angle-double-right"></i> {value.bankCode}<br/>
          No. Rekening <i className="fa fa-angle-double-right"></i> {value.rekeningNumber}<br/>
          </p>
         </div>
        </div>
       </li>
      ))}
     </ul>
    </li>
   </ul>
  </LayoutStore>
	)
}