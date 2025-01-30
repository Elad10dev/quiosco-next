

export  function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount); 
}

export function getImagenPath(imagePath:string){
  const cloudinaryBaseUrl = 'https://res.cloudinary.com/';
  if(imagePath.includes(cloudinaryBaseUrl)){
    return imagePath;
  }else {
    return `/products/${imagePath}.jpg`
  }
}
