import React from 'react'
import { useParams } from "react-router-dom"
import NumberFormat from "react-number-format"
import LayoutStore from "../../Components/LayoutStore"
import Loader from "../../Components/Loader"
import SeeTogetherProduct from "../../Library/SeeTogetherProduct"
import * as Faker from "../../Library/Faker"
import GETPRODUCTBYSLUGSERVICE from "../../Services/GETPRODUCTBYSLUG"

export default function ProductSLug(){
 const { slug } = useParams()
 const countwhoseetogether = SeeTogetherProduct()
 const [product, setProduct] = React.useState({...Faker.fakeproduct})
 const [imageShow, setImageShow] = React.useState(0)
 const [productLoader, setProductLoader] = React.useState({...Faker.fakeloader}) 
 const WhatsAppLinkOrder = `https://api.whatsapp.com/send?phone=6282133170120&text=Permisi%20ka%2C%20mau%20beli%20`+ encodeURI(product.name + " " + product.code)

 const prevImageShow = () => {
 	const max = product.images.length -1
  setImageShow(prevState => {
   if(prevState === 0) return max
    return prevState-1
  })
 }

 const nextImageShow = () => {
 	const max = product.images.length -1
  setImageShow(prevState => {
   if(prevState === max) return 0
   	return prevState+1
  })
 }
 
 const onClickThubnail = idImageShow => () => {
		setImageShow(idImageShow)
	}

 React.useEffect(() => {
 	async function POPULATEFIRSTDATA(){
 		try{
 			const x = await GETPRODUCTBYSLUGSERVICE(slug)
    
 			setProduct(prevState => {
 				if(x === null){
 					setProductLoader(prevState => {
		     const y = "Kesalahal terjadi !! Coba ulangi beberapa saat lagi. Jangan ragu untuk segera hubungi kami : )"
		      return {
		      ...prevState,
		      isLoading: false,
		      isError: true,
		      errorMessage: y
		     }
		    })
		    return prevState
 				}
 				setProductLoader({
		    ...Faker.fakeloader,
		    isLoading: false,
		   })
 				return {...x}
 			})
 		} catch(error){
 			setProductLoader(prevState => {
     const y = "Kesalahal terjadi !! Coba ulangi beberapa saat lagi. Jangan ragu untuk segera hubungi kami : )"
      return {
      ...prevState,
      isLoading: false,
      isError: true,
      errorMessage: y
     }
    })
    console.log(error)
 		}
 	}

 	POPULATEFIRSTDATA()
 }, [slug])

 return (
 	<LayoutStore title={product.name}>
   {productLoader.isError? 
    <p style={{textAlign: "center" }}>{productLoader.errorMessage}</p>
    :null
   } 

 		{productLoader.isLoading ? <Loader />: 
    !productLoader.isError ?
     <div className="w3-row w3-animate-fading-x">
      {/* IMAGES */}
   			<div className="w3-col m6">
   				<div className="w3-display-container">
   					{product.images.map(value => (
   							<img 
   								width="100%"
   								alt="PRODUCT"
   								key={value.id}
   								src={product.images[imageShow].url} 
   								style={{display: imageShow === parseFloat(value.id)?"block":"none"}} 
   							/>
   					))}
   					<button 
   						className="w3-button w3-theme w3-display-left" 
   						onClick={prevImageShow}
   					>
   						&#10094;
   					</button>
        <button 
        	className="w3-button w3-theme w3-display-right" 
        	onClick={nextImageShow}>
        	&#10095;
        </button>
   				</div>

   				<div style={{height: "15px"}} />
   				<div className="row-padding">
   					{product.images.map(value => (
   						<div 
          key={value.id}
          className="w3-col s4 m3" 
          style={{padding: "6px"}}
          onClick={onClickThubnail(value.id)}
       		>
   							<img 
   								width="100%"
   								alt="THUBNAIL PRODUCT"
   								className="w3-hover-opacity w3-card" 
   								src={value.url}
   							/>
         </div>
      		))}
      	</div>
   			</div>

   			{/* TITLE, DESCRIPTION DLL */}
   			<div className="w3-col m6">
   				<div className="w3-container">
   					<h1>{product.name}</h1>
        {/* PRICE */}
   					<p>
   						<i style={{fontSize: "18px"}}>
          {parseFloat(product.discount) > 0 ?
           <b>
            <del>
             <NumberFormat 
              value={product.price} 
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'Rp '} 
             />
            </del>
            <NumberFormat 
             value={((100-parseFloat(product.discount))/100) * parseFloat(product.price)} 
             displayType={'text'} 
             thousandSeparator={true} 
             prefix={'  Rp '} 
             decimalScale={0}
            />
           </b>:
           <b>
            <NumberFormat 
             value={product.price} 
             displayType={'text'} 
             thousandSeparator={true} 
             prefix={'Rp '} 
            />
           </b>
          }
   			   </i>
   			   <br/>
         {product.status.length > 0 ?
          <React.Fragment>
           <span 
            className={`w3-tag ${product.status.toLowerCase() === "sold out"?"w3-theme":"w3-red"}`}
           >{product.status}</span>
           <br/>
          </React.Fragment>
          :null
         }
         <br/>
   			   <i className="fa fa-angle-double-right"></i> kode produk {product.code}
   					</p>

        {/* VARIANTS */}
        {product.variants.map((variant, index) => (
          <p style={{marginBottom: "15px"}} key={index + variant.name} >
           <i className="fa fa-angle-double-right"></i> variasi <i>{variant.name}</i>
           <br/>
           {variant.variant.split(" ").map((aa, index) => (
            <span
             key={index + "-" + aa} 
             className="w3-tag w3-theme w3-round" 
             style={{marginRight: "10px"}}
            >
             {aa}
            </span>
           ))}
          </p>
        ))}

        <br/>

        {/* INVENTORY INFO */}
        <p className="w3-panel w3-theme-l4 w3-round-large" style={{padding: "7px"}}>
          <i className="fa fa-exclamation-triangle" style={{marginRight: "7px"}}></i>
          {product.inventoryStatus}
        </p>

        {/* SEE TOGETHER INFO */}
        <p className="w3-panel w3-theme-l4 w3-round-large" style={{padding: "7px"}}>
          <i className="fa fa-eye" style={{marginRight: "7px"}}></i>
          {countwhoseetogether} orang sedang melihat ini
        </p>

        <br/>
        {/* BUTTON ORDER */}
        <a
         href={WhatsAppLinkOrder}
         target="_blank"
         rel="noopener noreferrer"
         className="w3-card-4 w3-button w3-green" 
         style={{ width: "100%"}}>
          <i className="fa fa-whatsapp"></i> Miliki Sekarang Juga
        </a>  
        <p style={{marginTop: "5px"}}>
   			   <small><em>*Pesan langsung melalui WhatsApp (+62 821 3317 0120)</em></small>
   		   </p>

        {/* DESCRIPTION */}
        <p style={{whiteSpace: "pre-wrap"}}>
         <span role="img" aria-label="emojis">&#128526; &#128522;</span> 
         <br/>
         {product.description}
        </p>

        {/* TAGS */}
        {product.tags.split(" ").map((tag, index) => (
         <span
          key={index + "-" + tag} 
          className="w3-tag w3-theme w3-round" 
          style={{marginRight: "10px"}}
         > 
          #{tag}
         </span>
        ))}

   				</div>
   			</div>
   		</div>
    :null
   }
 	</LayoutStore>
 )
}