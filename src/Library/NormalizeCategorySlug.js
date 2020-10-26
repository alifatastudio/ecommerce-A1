export default function NormalizeCategorySlug(value) {
 const x = value.replace(/-/g,' ')
 const y = x.toLowerCase()
 
 return y
}