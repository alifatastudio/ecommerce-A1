import React from "react"
import { useParams } from "react-router-dom"
import LayoutStore from "../../Components/LayoutStore"
import Banner from "../../Components/Banner"
import Loader from "../../Components/Loader"
import ProductList from "../../Components/ProductList"
import * as Faker from "../../Library/Faker"
import GenerateTitle from "../../Library/GenerateTitle"
import GETALLPRODUCTBYCATEGORYSERVICE from "../../Services/GETALLPRODUCTBYCATEGORY"

export default function Slug(){
 const { slug } = useParams()
 const [allProduct, setAllProduct] = React.useState([{...Faker.fakeproduct}])
 const [productLoader, setProductLoader] = React.useState({...Faker.fakeloader}) 

 React.useEffect(() => {
 	async function POPULATEFIRSTDATA(){
 		try{
 			const x = await GETALLPRODUCTBYCATEGORYSERVICE(slug)
	 		
	   setAllProduct([...x])
	   setProductLoader({
	    ...Faker.fakeloader,
	    isLoading: false,
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
		<LayoutStore title={GenerateTitle(slug)}>
			<Banner />

			{productLoader.isError? 
    <p style={{textAlign: "center" }}>{productLoader.errorMessage}</p>
   :null}

   {productLoader.isLoading? <Loader />: 
    !productLoader.isError ?
     <ProductList products={allProduct} />
    : null
   }
		</LayoutStore>	
	)
}