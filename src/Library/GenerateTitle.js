export default function GenerateTitle(value) {
 if(typeof value !== 'string') return ""
 if(value.length < 1) return "" 

 let a_ = value.split("-")
 let b_ = ""
 for (var i = 0; i < a_.length; i++) {
   b_ = b_ + a_[i].charAt(0).toUpperCase() + a_[i].slice(1)  + " "
 }
 return b_
}