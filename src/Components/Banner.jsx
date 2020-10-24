import React from "react"
import FASHIONPRIA from "../Assets/BANNER/3.jpg"
import FASHIONWANITA from "../Assets/BANNER/2.jpg"
import FURNITURE from "../Assets/BANNER/1.jpg"

export default function BannerCategory(){
 const [showBanner, setShowBanner] = React.useState(0)

 const banner = [ FASHIONPRIA, FASHIONWANITA, FURNITURE ]

 React.useEffect(() => {
  const x = setInterval(() => {
   setShowBanner(prevState => {
    const max = banner.length - 1
    if(prevState === max) return 0
    return prevState + 1
   })
  }, 7000)

  return () => clearInterval(x)
 })

	return (
  <div className="w3-container">
   {banner.map((value, index) => (
    <img
     key={value}
     className="w3-animate-fading w3-round-large w3-card"
     src={value} 
     alt="Banner" 
     style={{
      width:"100%",
      display: showBanner === index ?"block":"none"}} 
    />
   ))}
  </div>
	)
}