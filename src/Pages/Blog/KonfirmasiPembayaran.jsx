import React from "react"
import LayoutStore from "../../Components/LayoutStore"

export default function KonfirmasiPembayaran(){
 const waLink = `https://api.whatsapp.com/send?phone=6282133170120&text=Permisi%20ka%2C%20saya%20mau%20konfirmasi%20pembayaran`
	
	return (
	 <LayoutStore title="Konfirmasi Pembayaran">
   <h1 style={{textAlign: "center"}}>Bagaimana Cara Konfirmasi Pembayaran?</h1>
   <p style={{textAlign: "center"}}>
    <span className="w3-hide-large" role="img" aria-label="emoji">&#128526; &#128522;</span><br/>
    LOGIER cukup kirimkan bukti pembayaran ke <strong>+62 821 3317 0120</strong> jangan lupa <strong>sertakan Nama Lengkap dan ID PEMBELIAN</strong>.
    <br/>            
    <a 
    	href={waLink}
     target="_blank"
     rel="noopener noreferrer"
     className="w3-button w3-green" 
    >
      <i className="fa fa-whatsapp"></i> WhatsApp Admin
    </a>
   </p>
  </LayoutStore>
	)
}