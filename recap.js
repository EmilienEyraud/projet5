// Lien avec l'API//
getAllTeddies = () => {
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
        request.open("GET", "http://localhost:3000/api/teddies");
        request.send();
    });
};

//PANIER//
//Fonction d'initialisation//
async function init() {
    console.info("LANCER DE L'APPLICATION");
    const product = await getAllTeddies();
    console.log(product)
    const productsFromApi = await getAllTeddies();
    const productsFromShoppingCard = await list(); // list provient de panier.js

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
   
    const order = document.getElementById('form_1');
    order.addEventListener('submit', async (event) => {
        event.preventDefault()
        const formData = validateForm()
        console.log(formData)
        await sendOrder (formData, Object.keys (productsFromShoppingCard))
    
    })

}
init();

const displayShoppingCard = (saveProducts) => {
    console.info(saveProducts)
    //Création de la structure du panier
    if (Object.keys(saveProducts).length > 0) {
        console.log(saveProducts)
        if( document.getElementById("panierVide")) document.getElementById("panierVide").remove();//Suppression paragraphe 'panier vide' par défaut
        const rootElement = document.getElementById('panier-recap')//lien avec la page index
      
        const recap = document.createElement('table') // Création du tableau
        
        const lineTable = document.createElement('tr') //Création de la ligne du tableau pour chaque article commandé
        
        const recapPhoto = document.createElement('th')//Création de la colonne photo
        recapPhoto.textContent = 'Supprimer'
        const recapName = document.createElement('th') //Création de la colonne nom
        recapName.textContent = 'Photo'
        const recapUnitPrice = document.createElement('th') //Création de la colonne de prix unitaire
        recapUnitPrice.textContent = 'Article'
        const recapRemove = document.createElement('th') //création colonne annulation
        recapRemove.textContent = 'Prix unitaire'
        const lineTotalPrice = document.createElement('tr')
        const totalPrice = document.createElement('th')
        lineTotalPrice.appendChild(totalPrice)
        rootElement.appendChild(recap)
        recap.appendChild(lineTable)
        recap.appendChild(lineTotalPrice)
        lineTable.appendChild(recapPhoto)
        lineTable.appendChild(recapName)
        lineTable.appendChild(recapUnitPrice)
        lineTable.appendChild(recapRemove)

        // Affichage des articles dans le panier - On utilise la boucle for    
        for (let i = 0; saveProducts.length > i; i++) {
            
            const productLine = document.createElement('tr')
            const productLinePhoto = document.createElement('td')
            const productLinePhotoImg = document.createElement('img')
            productLinePhotoImg.src = saveProducts[i].imageUrl;
            productLinePhotoImg.width = '50'
            const productLineTitle = document.createElement('td')
            productLineTitle.textContent = saveProducts[i].name
            const productLinePrice = document.createElement('th')
            productLinePrice.textContent = saveProducts[i].price / 100 + '€'
            const deleteButton =document.createElement ('button')
            deleteButton.textContent= 'Supprimer'
            deleteButton.setAttribute('class','bouton-supprimer')
            recap.appendChild(productLine)
            
            productLine.appendChild(deleteButton)
            productLine.appendChild(productLinePhoto)
            productLine.appendChild(productLineTitle)
            productLine.appendChild(productLinePrice)
            productLinePhoto.appendChild(productLinePhotoImg)

            deleteButton.addEventListener('click', ()=>{
                deleteProduct(saveProducts[i]._id)
                document.location.reload ()
            })
        }
        // Calcul de l'addition au panier
        let totalPanier = 0;
        saveProducts.forEach((panier) => {
            totalPanier += panier.price / 100;
        });

       
        const totalLine = document.createElement('tr')
        totalLine.setAttribute('class', 'totalAchat')
        const totalLabel = document.createElement('td')
        totalLabel.textContent = "Total panier"
        const totalValue = document.createElement('td')
        totalValue.textContent = totalPanier + '€'
        
        recap.appendChild(totalLine)
        totalLine.appendChild(totalLabel)
        totalLine.appendChild(totalValue)
        // Affichage du prix à payer dans le panier
        document.getElementById('totalPrice')
        document.textContent = totalPanier + '€'
    }
        
}   

