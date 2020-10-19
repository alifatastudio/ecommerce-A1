import React from "react"
import { useParams } from "react-router-dom"
import LayoutStore from "../../Components/LayoutStore"
import Banner from "../../Components/Banner"
import Loader from "../../Components/Loader"
import ProductList from "../../Components/ProductList"
import { fakeproduct } from "../../Library/Faker"
import { fakeloader } from "../../Library/Faker"
import GenerateTitle from "../../Library/GenerateTitle"
import GETALLPRODUCTBYCATEGORY from "../../Services/GETALLPRODUCTBYCATEGORY"
import GETALLCATEGORY from "../../Services/GETALLCATEGORY"

export default function Slug(){
 const { slug } = useParams()
 const [allProduct, setAllProduct] = React.useState([{...fakeproduct}])
 const [allCategory, setAllCategory] = React.useState([])
 const [loader, setLoader] = React.useState({...fakeloader}) 

  const GETCATEGORYNAMEPRODUCT = categoryId => {
  const x = allCategory.filter(y => y.id === parseFloat(categoryId))
  if(x.length <= 0) return "milikisekarang"
  if(x.[0].name === undefined) return "milikisekarang"
  const y = x.[0].name
  const z = y.replace(/\s/g,'');
  return z
 }

 React.useEffect(() => {
 	function POPULATEFIRSTDATA(){
 		try{
 			const x = GETALLPRODUCTBYCATEGORY(slug)
	 		const y = GETALLCATEGORY()
	 		
	 		setAllCategory([...y])
	   setAllProduct([...x])
	   setLoader({
	    ...fakeloader,
	    isLoadingTheProduct: false,
	   })
 		}
 		catch(error){
    setLoader(prevState => {
     const y = "Kesalahal terjadi !! Coba ulangi beberapa saat lagi. Jangan ragu untuk segera hubungi kami : )"
      return {
      ...prevState,
      isLoadingTheProduct: false,
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

			{loader.isError? 
    <p style={{textAlign: "center" }}>{loader.errorMessage}</p>
   :null}

   {loader.isLoadingTheProduct ? <Loader />: 
    !loader.isError ?
     <ProductList 
     	products={allProduct}
     	GETCATEGORYNAMEPRODUCT={GETCATEGORYNAMEPRODUCT}
     />
    : null
   }
		</LayoutStore>	
	)
}