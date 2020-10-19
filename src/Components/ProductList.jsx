import React from "react"
import { Link } from "react-router-dom"
import NumberFormat from "react-number-format"

export default function ProductList({
	products,
	GETCATEGORYNAMEPRODUCT
}){
	
	return (
		<div className="w3-animate-fading-x">
   <div className="w3-container w3-text-grey">
    <p>{products.length} items</p>
   </div>

   <div className="w3-row">
    {products.map(value => (
     <div className="w3-col l3 s6" key={value.id}>
      <Link to={"/product/"+value.slug} style={{textDecoration: "none"}}>
       <div className="w3-container" style={{cursor: "pointer"}}>
        <div className="w3-display-container">
         <img src={value.images[0].url} style={{width:"100%"}} alt="PRODUCT" />
         
         <span 
          className={`w3-tag w3-display-topright ${value.status !== null ? value.status.toLowerCase() === "sold out"?"w3-theme":"w3-red": ""}`}
         >{value.status}</span>
        
         <p>{value.name}<br/>
          {parseFloat(value.discount) > 0 ?
           <b><i><del>
            <NumberFormat 
             value={value.price} 
             displayType={'text'} 
             thousandSeparator={true} 
             prefix={'Rp '} 
            /></del></i>
            <NumberFormat 
             value={((100-parseFloat(products[1].discount))/100) * parseFloat(products[1].price)} 
             displayType={'text'} 
             thousandSeparator={true} 
             prefix={'  Rp '} 
             decimalScale={0}
            />
           </b>:
           <b>
            <NumberFormat 
             value={value.price} 
             displayType={'text'} 
             thousandSeparator={true} 
             prefix={'Rp '} 
            />
           </b>
          }
          <br/>
          <span className="w3-tag w3-theme w3-round-large">
            #{GETCATEGORYNAMEPRODUCT(value.categoryId)}
          </span>
         </p>
        </div>
       </div>
      </Link>
     </div>
    ))}
   </div> 
  </div>
	)
}