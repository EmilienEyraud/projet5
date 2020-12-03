// Lien vers l'API
const retourOrder = () => {
  return new Promise((resolve) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(JSON.parse(this.responseText));
        console.log("Connecté");
      }
      else {

      }
    };
    request.open("GET", "http://localhost:3000/api/teddies/order");
    request.send(order);
  });
};


//Récupération des informations pour affichage sur la page de confirmation
async function init() {
  if (localStorage.getItem("order") != null) {
    //localStorage.removeItem("order");
    const order = JSON.parse(localStorage.getItem("order"));
    console.log("********", order)
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    displayOrderId(order.orderId) // afficher le numéro de commande
    displayProducts(order.products)//afficher le détail des produits commandés
    localStorage.clear();
  }
  else {
    document.getElementsById('confirmation-recap');
    document.textContent("Vous n'avez rien en commande")
  }
};
init()

function displayOrderId(id) {
  document.getElementById("orderId").innerHTML = id;
}

function displayProducts(products) {
  if (Object.keys(products).length > 0) {
    console.log(products)
    const rootElement = document.getElementById('confirmation-recap')//lien avec la page index
    const recap = document.createElement('table') // Création du tableau
    const lineTable = document.createElement('tr') //Création de la ligne du tableau pour chaque article commandé
    const recapPhoto = document.createElement('th')//Création de la colonne photo
    recapPhoto.textContent = 'Photo'
    const recapName = document.createElement('th') //Création de la colonne nom
    recapName.textContent = 'Nom'
    const recapUnitPrice = document.createElement('th') //Création de la colonne de prix unitaire
    recapUnitPrice.textContent = 'Prix Unitaire'
    const lineTotalPrice = document.createElement('tr')//Création de la ligne prix total
    const totalPrice = document.createElement('th')
    lineTotalPrice.appendChild(totalPrice)


    rootElement.appendChild(recap)
    recap.appendChild(lineTable)
    recap.appendChild(lineTotalPrice)
    lineTable.appendChild(recapPhoto)
    lineTable.appendChild(recapName)
    lineTable.appendChild(recapUnitPrice)


    // Affichage des articles dans le panier - On utilise la boucle for    
    for (let product of products) {

      const productLine = document.createElement('tr')
      const productLinePhoto = document.createElement('td')
      const productLinePhotoImg = document.createElement('img')
      productLinePhotoImg.src = product.imageUrl;
      productLinePhotoImg.width = '50'
      const productLineTitle = document.createElement('td')
      productLineTitle.textContent = product.name
      const productLinePrice = document.createElement('th')
      productLinePrice.textContent = product.price / 100 + '€'

      recap.appendChild(productLine)

      productLine.appendChild(productLinePhoto)
      productLine.appendChild(productLineTitle)
      productLine.appendChild(productLinePrice)
      productLinePhoto.appendChild(productLinePhotoImg)
    }
    // Calcul de l'addition au panier
    let totalPanier = 0;
    products.forEach((panier) => {totalPanier += panier.price / 100;
    });
    //Incrémentation du montant du panier
    const totalLine = document.createElement('tr')
    totalLine.setAttribute('class', 'totalValide')
    const totalLabel = document.createElement('td')
    totalLabel.textContent = "Total panier"
    const totalValue = document.createElement('td')
    totalValue.textContent = totalPanier + '€'

    recap.appendChild(totalLine)
    totalLine.appendChild(totalLabel)
    totalLine.appendChild(totalValue)
  }
}








