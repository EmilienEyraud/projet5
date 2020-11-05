// On a vu dans le fichier panier.js que les données étainet récupérées dans le local storage du "panier"

panierCreation = () => {                              
    //Création de la structure du panier
    if (panier.length > 0) {                  
        document.getElementById("panierVide").remove();//Suppression paragraphe 'panier vide' par défaut
        const recapPanier = document.getElementById('panier-recap') //lien avec la page panier-orinounours
            recapPanier.appendChild(recap)
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
    for (let i=0; panier.length>i; i++){ 
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
                 //Manque calcul de l'addition du pannier
    }
}

        
      
      






