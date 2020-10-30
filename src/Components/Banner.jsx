import React from "react"
import _ from "lodash"
import GETALLBANNERSERVICE from "../Services/GETALLBANNER"

export default function BannerCategory(){
 const [showBanner, setShowBanner] = React.useState(0)
 const [allBanner, setAllBanner] = React.useState([])

 React.useEffect(() => {
  const x = setInterval(() => {
   setShowBanner(prevState => {
    const max = allBanner.length - 1
    if(prevState === max) return 0
    return prevState + 1
   })
  }, 7000)

  return () => clearInterval(x)
 })

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

	return (
  <div className="w3-container">
   {allBanner.map((value, index) => (
    <img
     key={value.id}
     className="w3-animate-fading w3-round-large w3-card"
     src={value.imageUrl} 
     alt="Banner" 
     style={{
      width:"100%",
      display: showBanner === index ?"block":"none"}} 
    />
   ))}
  </div>
	)
}