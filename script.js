/*Lien avec l'API */
getAllTeddies = () => {
  return new Promise((resolve) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(JSON.parse(this.responseText));
        console.log("Connecté");
      }
    };
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
  });
};

// J'ai besoin d'une fonction qui sera executée au chargement de la page et qui aura
// pour role d'éxecuter l'ensemble du code de la page
async function init() {
  console.info("LANCER DE L'APPLICATION");
  const teddies = await getAllTeddies();
  console.log(teddies)
  const rootElement = document.getElementById('listeProduit')
  const productList = displayProductList(teddies)
  rootElement.appendChild(productList)
}
init();

//PAGE ACCUEIL - index.html
// Le contexte
// On se retrouve sur la page de listing produits
//  A Je veux afficher la liste des produits (pour chaque: nom, prix, photos et un lien vers la page détail)
// Les conditions:
// B Je dois récupérer la liste des produits à partir du serveur sur l'url http://localhost:3000/api/teddies
//// A : je vais parcourir la liste des produits, et chaque item, j'affiche un élément contenant:
// un élément titre
// un élément lien
// un élément photo
// un élément prix

//liste produit
function displayProductList(teddies) {
  console.log('DISPLAY PRODUCT LIST')
  const listContainer = document.createElement("div")
  listContainer.style.border = "1px solid gray"
  listContainer.setAttribute("class", "produit_contenant")
  for (let teddies of teddies) {
    const itemContainer = displayProductItem(teddies)
    listContainer.appendChild(itemContainer)
  }
  return listContainer
}
//container produit
function displayProductItem (teddies) {
  const itemContainer = document.createElement("div")
  itemContainer.setAttribute("class", "produit_illustration")
  const productTitle = displayProductTitle(teddies)
  itemContainer.appendChild(productTitle)
  const productPicture = displayProductPicture(teddies)
  itemContainer.appendChild(productPicture)
  const productPrice = displayProductPrice(teddies)
  itemContainer.appendChild(productPrice)
  const productLink = displayProductLink(teddies)
  itemContainer.appendChild(productLink)
  return itemContainer
}
//titre produit
function displayProductTitle(teddies) {
  const productTitle = document.createElement('h2');
  productTitle.setAttribute("class", "produit_nom");
  productTitle.textContent = teddy.name;
  return productTitle
}
//photo produit
function displayProductPicture(teddies) {
  const productPicture = document.createElement ('img');
  productPicture.setAttribute("src", teddy.imageUrl);
  productPicture.setAttribute('alt', 'Photo Ours en Peluche');
  productPicture.textContent = product.picture;
  return productPicture
}
//prix produit
function displayProductPrice(teddies) {
  const productPrice = document.createElement("p");
  productPrice.setAttribute("class", "produit_prix");
  productPrice.textContent = teddy.price / 100 + "€";
  return productPrice
}
//lien vers page produit
function displayProductLink(teddies) {
  const productLink = document.createElement ('a');
  productLink.setAttribute("href", "produit.html?id=" + teddy._id);
  productLink.textContent =  'En savoir Plus';
  return productLink
}
