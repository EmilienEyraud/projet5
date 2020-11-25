// Panier est une liste des produits sélectionnés avec les couleurs

function addProduct(id, color) { // ajouter un produit au panier
  const panier = list();
  panier[id] = color;
  console.log(panier)
  for (let i = 0; i < panier.length; i++){ //Ajouter au panier
  let nombrePanier = document.getElementById("indexPanier"); // ajout dans la barre de nav
  nombrePanier.textContent = panier.length;}
  save(panier);
  console.log("Le produit a été ajouté au panier");
  alert("Ce produit a été ajouté dans votre panier");
}

function deleteProduct(id) { // supprimer un produit du panier
  const panier = list();
  panier[id] = id;
  for (let i = 0; i < panier.length; i--){ //Suppression du panier
  let nombrePanier = document.getElementById("indexPanier"); // retrait dans la barre de nav
  nombrePanier.textContent=panier.length;}
  save(panier);
  console.log("Le produit a été supprimé du panier");
  alert("Ce produit a été supprimé de votre panier");
}

function save(panier) { // sauvegarder le panier dans le local storage
  console.log(JSON.stringify(panier))
  // sauvegarder en localStorage
  localStorage.setItem('panier', JSON.stringify(panier)) //1er argument de type string qui précise où sont stockées les données
}
function list() { // lister le produit dans le panier
  const panier = localStorage.getItem('panier')
  // lire le localstorage, et retourner la liste des produits sélectionnés
  if (panier) return JSON.parse(panier)
  return {}
}




