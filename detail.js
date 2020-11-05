getOneTeddy = (id) => {
    return new Promise((resolve) => {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          resolve(JSON.parse(this.responseText));
          console.log("Connecté");
        }
        else{
          
        }
      };
      request.open("GET", "http://localhost:3000/api/teddies/"+id);
      request.send();
    });
  };

async function init() {
    console.info("LANCER DE L'APPLICATION");
    const url = new URL (document.location.href)
    console.log (url)
    const id = url.searchParams.get('id')
    console.log (id)
    const teddy = await getOneTeddy(id);
    console.log(teddy)
    const rootElement = document.getElementById('detailProduit')//lien avec la page index
    const productDetail = displayDetailProduct(teddy) //détail produit commandé
    rootElement.appendChild(productDetail)
    choixCouleur(teddy)
  }
  init();

 //container produit
function displayDetailProduct (detailTeddies) {
    const itemContainer = document.createElement("div")
    itemContainer.setAttribute("class", "produit_illustration")
    const productTitle = displayProductTitle(detailTeddies)
    itemContainer.appendChild(productTitle)
    const productPicture = displayProductPicture(detailTeddies)
    itemContainer.appendChild(productPicture)
    const productDescription = displayProductDescription(detailTeddies)
    itemContainer.appendChild(productDescription)
    const productPrice = displayProductPrice(detailTeddies)
    itemContainer.appendChild(productPrice) 
    return itemContainer
  }
  //titre produit
  function displayProductTitle(detailTeddy) {
    const productTitle = document.createElement('h2');
    productTitle.setAttribute("class", "produit_nom");
    productTitle.textContent = detailTeddy.name;
    return productTitle
  }
  //photo produit
  function displayProductPicture(detailTeddy) {
    const productPicture = document.createElement ('img');
    productPicture.setAttribute("src", detailTeddy.imageUrl);
    productPicture.setAttribute('alt', 'Photo de'+ detailTeddy.name);
    return productPicture
  }
  //description produit
  function displayProductDescription(detailTeddy) {
    const productDescription = document.createElement ('p');
    productDescription.setAttribute('class', 'produit_description');
    productDescription.textContent = detailTeddy.description;
    return productDescription
  }
  //prix produit
  function displayProductPrice(detailTeddy) {
    const productPrice = document.createElement("p");
    productPrice.setAttribute("class", "produit_prix");
    productPrice.textContent = detailTeddy.price / 100 + "€";
    return productPrice
  }
  //choix couleur
  async function choixCouleur (teddy){
   teddy.colors.forEach ((color)=> {
   const choixOption = document.getElementById('choix_option')
   const option = document.createElement ('option')
   option.setAttribute ('value', color)
   option.textContent = color
   choixOption.appendChild (option)
   })};
  
 


