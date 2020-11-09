// Panier est une liste des produits sélectionnés avec les couleurs

// LISTE ========

const listArray = [ // Liste de produits sous forme de tableau
  'produit1',
  'produit2',
]

const listObject = { // Liste de produits sous forme d'objet
  'produit1': 'dark', // id-color
  'produit2': 'red',
}

function addProduct(id, color) { // ajouter un produit au panier
  const panier = list();
  panier[id] = color;
  console.log(panier)
  save(panier); 
  console.log("Le produit a été ajouté au panier");
  alert("Ce produit a été ajouté dans votre panier");
  }
  
function deleteProduct(id) { // supprimer un produit du panier
  const panier = list();
  panier.getElementById('suppression_panier');
  panier.addEventListener('click', function (){
    delete panier[id];
    for(let i=0; i<panier.length; i--); //Suppression du panier
    save(panier);
    console.log("Le produit a été supprimé du panier");
    alert("Ce produit a été supprimé de votre panier");
    })}
 
function save(panier) { // sauvegarder le panier dans le local storage
  console.log (JSON.stringify(panier))
    // sauvegarder en localStorage
    localStorage.setItem('panier', JSON.stringify(panier)) //1er argument de type string qui précise où sont stockées les données
  }
  function list() { // lister le produit dans le panier
    // lire le localstorage, et retourner la liste des produits sélectionnés
    const panier = localStorage.getItem('panier')
    if (panier) return JSON.parse(panier)
    return {}
  }
  
//Affichage du nombre d'article dans le panier
function nombreIndexPanier() {
    const indexPanier = document.getElementById("indexPanier"); // ajout dans la barre de nav
    indexPanier.textContent = panier.length;
  }
  
  function nombreProduitPanier() {
    const produitPanier = document.getElementById("produitPanier");//Ajout dans le body
    produitPanier.textContent = panier.length;
  }




