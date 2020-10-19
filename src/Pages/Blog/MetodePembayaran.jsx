import React from "react"
import LayoutStore from "../../Components/LayoutStore"
import { PAYMENTS } from "../../Services/STORE/PAYMENTS"

export default function MetodePembayaran(){

	return (
		<LayoutStore title="Motode Pembayaran">
   <p style={{textAlign: "center"}}>
    Berikut metode pembayaran yang tersedia, Jangan lupa untuk konfirmasi pembayaran yaa : ). Kami akan terus meningkatkannya demi kemudahan transaksi LOGIER di ELOGIE <span role="img" aria-label="emoji">&#128522;</span>
   </p>
   <ul className="w3-ul">
    <li>
     <i className="fa fa-angle-double-right"></i> <strong>REKENING ATM</strong><br/><br/>
     <ul className="w3-ul">
      {PAYMENTS.map(value => (
       <li key={value.id}>
        <div className="w3-row-padding w3-card-4">
         <div className="w3-col m4 w3-padding-16">
          <img src={value.mediaurl} alt={value.bank} style={{width:"100%"}} />
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