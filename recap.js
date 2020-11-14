const { request } = require("express");

// Lien avec l'API//
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
  
  //PANIER//
  //Fonction d'initialisation//
  async function init() {
    console.info("LANCER DE L'APPLICATION");
    const product= await getAllTeddies();
    console.log(product)
  }
  (init);

const productsFromApi = getAllTeddies();
const productsFromShoppingCard = list(); // list provient de panier.js

const productsList = []

for (let product of productsFromApi) {
  if (productsFromShoppingCard[product._id] !== undefined) { // Si le produit est présent dans le localStorage, on l'ajout à notre liste
     productsList.push( // Ici, on ajoute un produit qui contient toute les propriétés du produits de l'api, et on ajoute la propriété selectedColor
       {
           ...product,
           selectedColor: productsFromShoppingCard[product._id],
       }
    )
  }
}
displayShoppingCard(productsList)// On a vu dans le fichier panier.js que les données étaient récupérées dans le local storage du "panier"

const displayShoppingCard = (saveProducts) => {                              
    //Création de la structure du panier
    if (Object.keys(saveProducts).length > 0) {                  
        console.log(saveProducts) 
        document.getElementById("panierVide").remove();//Suppression paragraphe 'panier vide' par défaut
        const rootElement = document.getElementById('panier-recap')//lien avec la page index
        rootElement.appendChild(recap)
        const recap = document.createElement('table') // Création du tableau
            recap.appendChild(lineTable)
            recap.appendChild(lineTotalPrice)
        const lineTable = document.createElement('tr') //Création de la ligne du tableau pour chaque article commandé
                lineTable.appendChild(recapPhoto)
                lineTable.appendChild(recapName)
                lineTable.appendChild(recapUnitPrice)
                lineTable.appendChild(recapRemove)
            const recapPhoto = document.createElement('th')//Création de la colonne photo
                recapPhoto.textContent='Photo'
            const recapName = document.createElement('th') //Création de la colonne nom
                recapName.textContent='Article'
            const recapUnitPrice = document.createElement ('th') //Création de la colonne de prix unitaire
                recapUnitPrice.textContent='Prix Unitaire'
            const recapRemove = document.createElement ('th') //création colonne annulation
                recapRemove.textContent='Supprimer'
        const lineTotalPrice = document.createElement ('tr')
            lineTotalPrice.appendChild(totalPrice)
            const totalPrice = document.createElement ('th')
    }

 // Affichage des articles dans le panier - On utilise la boucle for    
    for (let i=0; saveProducts.length>i; i++){ 
            const recap = document.getElementById('table')
            recap.appendChild (lineArticle)
            recap.appendChild (lineTotalArticles)
            const lineArticle = document.getElementById('tr')
            lineArticle.appendChild(articlePhoto)
            lineArticle.appendChild(articleName)
            lineArticle.appendChild(priceUnitArticle)
            lineArticle.appendChild(removeArticle)
                const articlePhoto = document.createElement('img')//Insertion de la photo
                articlePhoto.setAttribute('class','photo_article','src',panier(i).imageUrl,'alt', 'Photo article en commande')
                const articleName = document.createElement('th')//Insertion du nom de l'article
                articleName.setAttribute ('class','nom_article' )
                articleName.textContent=panier (i).name
                const priceUnitArticle = document.createElement('td')//Insertion du prix de l'article
                priceUnitArticle.setAttribute('class', 'prix_article')
                priceUnitArticle.textContent = panier (i).price /100  +'€'
                const removeArticle = document.createElement('i') //Insertion de la possibilité de suppression de l'article
                removeArticle.setAttribute ('id', 'remove'+(i))
                removeArticle.setAttribute('title', 'Supprimer du panier?')
                removeArticle.setAttribute('class',"fas fa-trassh-alt annulerProduit")
                removeArticle.addEventListener('click', annulerProduit.bind(i)) // Voir cette fonction ?
            const lineTotalArticles = document.getElementById('tr')//Ligne Total Articles
            lineTotalArticles.setAttribute("id",'ligneSomme')
            lineTotalArticles.appendChild (totalArticles)
            lineTotalArticles.appendChild(montantArticles)
                const totalArticles =document.createElement ('th')
                totalArticles.textContent='Montant à payer'
                const montantArticles = document.createElement ('td')
                montantArticles.setAttribute('id', 'totalprice')
    } 
}
// Calcul de l'addition au panier
    const totalPanier = 0;
    panier.forEach((panier) => {
        totalPanier+=panier.price/100;
    }); 
       
// Affichage du prix à payer dans le panier
document.getElementById('totalPrice')
document.textContent = totalPanier +'€'

//annuler un Article : 
annulerArticle = (i) => {
    panier.splice(i, 1);
     localStorage.clear();
// Mise à jour du nouveau panier avec suppression de l'article
     localStorage.setItem("panier", JSON.stringify(panier));
//Mise à jour de la page pour affichage de la suppression au client
     window.location.reload();
   };  


// FORMULAIRE//
//Contole REGEX (expressions régulières)des entrées du formulaire 
//source : https://www.codeflow.site/fr/article/regular-expressions__how-to-validate-email-address-with-regular-expression#:~:text=Comment%20valider%20une%20adresse%20email%20avec%20une%20expression%20r%C3%A9guli%C3%A8re,-email%20regex&text=La%20combinaison%20signifie%20que%20l,par%20le%20symbole%20%C2%AB%40%C2%BB.
const checkNumber =/[0-9]/;
const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

const checkMessage='';


//Récupérer les éléments du formulaire :
const lastName = document.getElementById ('nom');
const firstName = document.getElementById('prenom');
const email = document.getElementById('email')
const adress = document.getElementById('adresse')
const postalCode = document.getElementById('code_postal')
const city = document.getElementById('ville')

// Test des entrées du formulaire
//Nom
if(
    checkNumber.test(lastName)== true||
    checkSpecialCharacter.test(lastName)== true ||
    lastName ==''
){
    checkMessage = 'Veuillez vérifier les informations concernant votre nom, les caractères spéciaux ne sont pas acceptés';
}


else
{ console.log ('Nom accepté')}

//Prénom
if(
    checkNumber.test(firstName)== true||
    checkSpecialCharacter.test(firstName)== true ||
    firstName ==''
){
    checkMessage = 'Veuillez vérifier les informations concernant votre prénom, les caractères spéciaux ne sont pas acceptés';
}
else{console.log ('Prénom accepté')}
    
//Adresse Mail
if (checkMail.test==false||
    email =='')
    {
    checkMessage = 'Veuillez vérifier les informations concernant votre adresse mail'
}
else{console.log ('Adresse Mail validée')}
 
//Adresse Postale
if(
    checkNumber.test(adress)== true||
    checkSpecialCharacter.test(adress)== true ||
    adress ==''
){
checkMessage = 'Veuillez vérifier les informations concernant votre adresse, les caractères spéciaux ne sont pas acceptés';
}
else{console.log ('Adresse Postale acceptée')}
   
//Code Postal
if(
    checkNumber.test(postalCode) == true ||
    checkSpecialCharacter.test (postalCode)== false||
    checkMail.test(postalCode)== false ||
    postalCode.lenght == 5
)
{
    checkMessage = 'Code Postal Validé'
}
else{  checkMessage = 'Votre Code Postal doit comporter 5 chiffres'
}
  

//Ville
if(
    checkNumber.test(city)== true||
    checkSpecialCharacter.test(city)== true ||
    city ==''
){
checkMessage = 'Veuillez vérifier les informations concernant votre ville, les caractères spéciaux ne sont pas acceptés';
}
else{ console.log ('Ville acceptée')}
   
// Construction de l'objet contact
const contact ={
    nom = lastName,
    prenom : firstName,
    email : email,
    adresse : adress,
    codePostal : postalCode,
    ville : city
};
// Préparation à l'envoi de la commande 

confirmCommande =() => {
    const order = document.getElementById('form_1');
    order.addEventListener('submit', (validOrder) => {
        validOrder.preventDefault();
        if (totalPanier > 0) {
            const panierLink = document.createElement ('a');
            panierLink.setAttribute("href",'confirmation-orinounours');
            panierLink.textContent =  'Envoi validé';
            console.log('Envoi validé');
            productsList.push({
                ...product,
                selectedColor: productsFromShoppingCard[product._id],
            });
            const sendOrder = {             // Création de l'objet à envoyer
                contact,
                productsList
            }
            const sendForm = JSON.stringify(sendOrder);    //Envoi de la commande
            envoiFormulaire(sendForm, url)
            console.log(sendOrder) 
            contact = {};//Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
            products = [];
            localStorage.clear();
        }   
            else
         {
            console.log('Votre Panier est vide');
            alert('Veuillez sélectionner un article');
            window.location = './index.html';
         }
    }
    )}
