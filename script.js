/*Lien avec l'API */
getAllTeddies = () => {
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
  const rootElement = document.getElementById('listeProduit')//lien avec la page index
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
  listContainer.setAttribute("class", "produit_contenant")
  for (let teddy of teddies) {
    const itemContainer = displayProductItem(teddy)
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
function displayProductTitle(teddy) {
  const productTitle = document.createElement('h2');
  productTitle.setAttribute("class", "produit_nom");
  productTitle.textContent = teddy.name;
  return productTitle
}
//photo produit
function displayProductPicture(teddy) {
  console.log (teddy)
  const productPicture = document.createElement ('img');
  productPicture.setAttribute("src", teddy.imageUrl);
  productPicture.setAttribute('alt', 'Photo Ours en Peluche');
  productPicture.textContent = teddy.picture;
  return productPicture
}
//prix produit
function displayProductPrice(teddy) {
  const productPrice = document.createElement("p");
  productPrice.setAttribute("class", "produit_prix");
  productPrice.textContent = teddy.price / 100 + "€";
  return productPrice
}
//lien vers page produit
function displayProductLink(teddy) {
  const productLink = document.createElement ('a');
  productLink.setAttribute("href", "produit.html?id=" + teddy._id);
  productLink.textContent =  'En savoir Plus';
  return productLink
}

//PAGE DETAIL PRODUIT
// J'ai besoin d'une fonction qui récupère l'ID sélectionnée afin de
//obtenir une description détaillée
//choisir la couleur
//ajouter au panier

//  récupération de l'id produit dans l'url

const idNounours = "";
async function detailTeddies() {
  idNounours = location.search.substring(4); //L'id du produit arrive à partir de la 4eme lettre : _id (voir tableau des paramètres API)
  const detailTeddies = await getAllTeddies();
  const rootElement = document.getElementById('detailProduit')  /* Lien avec la page produit HTML */
  const productList = displayProductSelected(detailTeddies)
  rootElement.appendChild(productList)
}

//liste produit
function displayProductSelected(detailTeddies) {
  console.log('DISPLAY PRODUCT SELECTED')
  const listContainer = document.createElement("div")
  listContainer.setAttribute("class", "produit_contenant")
  for (let detailTeddy of detailTeddies) {
    const itemContainer = displayProductItem(detailTeddy)
    listContainer.appendChild(itemContainer)
  }
  return listContainer
}
//container produit
function displayProductSelected (detailTeddies) {
  const itemContainer = document.createElement("div")
  itemContainer.setAttribute("class", "produit_illustration")
  const productTitle = displayProductTitle(detailteddies)
  itemContainer.appendChild(productTitle)
  const productPicture = displayProductPicture(detailTeddies)
  itemContainer.appendChild(productPicture)
  const productDescription = displayProductDescription(detailTeddies)
  itemContainer.appendChild(productDescription)
  const productPrice = displayProductPrice(detailTeddies)
  itemContainer.appendChild(productPrice)
  const productLink = displayProductLink(detailTeddies)
  itemContainer.appendChild(productLink)
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
async function colorTeddies (detailTeddy){
  const choixOption = document.createElement('option')
  choixOption = document.getElementById('choixOption')
  choixOption = document.appendChild ('option')
  detailTeddy.innerHTML="<ul><li>Sable</li><li>Marron</li><li>Blanc</li></ul>"
}

//-----PANIER----------//

//Ajout de l'article au panier de l'utilisateur

ajoutPanier = () => {
  const acheter = document.getElementById("ajout_panier");//Au clic de l'utilisateur, le produit se rajoute au panier
  acheter.addEventListener("click", async function () {
    const ajout = await getAllTeddies();
    panier.push(ajout);
    localStorage.setItem("panier", JSON.stringify(panier));//On récupère le produit dans le local storage
    console.log("Le produit a été ajouté au panier");
    alert("Ce produit a été ajouté dans votre panier");
  })}

  //Affichage du nombre d'article dans le panier
function nombreIndexPanier() {
  const indexPanier = document.getElementById("indexPanier"); // ajout dans la barre de nav
  indexPanier.textContent = panier.length;
}

function nombreProduitPanier() {
  const produitPanier = document.getElementById("produitPanier");//Ajout dans le body
  produitPanier.textContent = panier.length;
}