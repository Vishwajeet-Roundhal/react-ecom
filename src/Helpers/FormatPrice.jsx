
function FormatPrice({price}) {
  return Intl.NumberFormat("en-IN",{
    style: "currency",
    currency: "INR",
    maximumFractionDigits:3,

  }).format(price/100);
}

export default FormatPrice