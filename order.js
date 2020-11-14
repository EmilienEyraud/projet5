const { request } = require("express");

// Lien vers l'API
const envoiFormulaire = () => {
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
      request.open("POST", "http://localhost:3000/api/teddies/order");
      request.send();
    });
  };


//Récupération des informations pour affichage sur la page de confirmation
retourOrder = () => {
    if (sessionStorage.getItem("order") != null) {
      const order = JSON.parse(sessionStorage.getItem("order"));
      document.getElementById("firstName").innerHTML = order.contact.firstName;
      document.getElementById("orderId").innerHTML = order.orderId;
      console.log(order);
      sessionStorage.removeItem("order");
    }
    //Redirection vers l'accueil
    else {
      alert("Merci pour vote commande. A bientôt");
      window.location = "./index.html";
    }
  };
  
  //------Tableau de recap de la commande dans la page de confirmation------//
  
  confirmRecap = () => {
    //Création de la structure du tableau récapitulatif
    
    //Placement de la structure dans la page
    const confirmPanier = document.getElementById("confirmation-recap");
    confirmPanier.appendChild(recapConfirm);
    const recapConfirm = document.createElement("table");
    recapConfirm.appendChild(ligneConfirm);
    recapConfirm.appendChild(ligneConfirmTotal);
    const ligneConfirm = document.createElement("tr");
        ligneConfirm.appendChild(confirmPhoto);
        const confirmPhoto = document.createElement("th");
        confirmPhoto.textContent = "Article";
        ligneConfirm.appendChild(confirmNom);
        const confirmNom = document.createElement("th");
        confirmNom.textContent = "Nom";
        ligneConfirm.appendChild(confirmPrixUnitaire);
        const confirmPrixUnitaire = document.createElement("th");
        confirmPrixUnitaire.textContent = "Prix";
    const ligneConfirmTotal = document.createElement("tr");
    ligneConfirmTotal.appendChild(colonneConfirmTotal);
    ligneConfirmTotal.appendChild(confirmPrixPaye);
    ligneConfirmTotal.setAttribute("id", "ligneSomme");
        const colonneConfirmTotal = document.createElement("th");
        colonneConfirmTotal.textContent = "Total payé";
        colonneConfirmTotal.setAttribute("id", "colonneConfirmTotal");
        const confirmPrixPaye = document.createElement("td");
        confirmPrixPaye.setAttribute("id", "sommeConfirmTotal");

      
    //Incrémentation de l'id des lignes pour chaque produit
    const i = 0;
    const order = JSON.parse(sessionStorage.getItem("order"));
  
    // Implémentation du tableau
    order.productsList.forEach((orderArticle) => {
      recapConfirm.appendChild(ligneConfirmArticle);
      const ligneConfirmArticle = document.createElement("tr");
      ligneConfirmArticle.setAttribute("id", "article_acheté" + i);
        ligneConfirmArticle.appendChild(nomConfirmArticle);
        ligneConfirmArticle.appendChild(prixUnitConfirmArticle)
        ligneConfirmArticle.appendChild(photoConfirmArticle);
      const photoConfirmArticle = document.createElement("img");
      photoConfirmArticle.setAttribute("class", "photo_article_acheté");
      photoConfirmArticle.setAttribute("src", orderArticle.imageUrl);
      photoConfirmArticle.setAttribute("alt", "Photo de l'article acheté");
      const nomConfirmArticle = document.createElement("td"); 
      nomConfirmArticle.textContent = orderArticle.name;
      const prixUnitConfirmArticle = document.createElement("td");
      prixUnitConfirmArticle.textContent = orderArticle.price / 100 + " €";
    });
     
      
    //Calcule de l'addition total
    let sommeConfirmTotal = 0;
    order.products.forEach((orderArticle) => {
      sommeConfirmTotal += orderArticle.price / 100;
    });
  
    //Affichage du prix total à payer dans l'addition
    console.log(sommeConfirmTotal);
    document.getElementById("sommeConfirmTotal").textContent =
      sommeConfirmTotal + " €";
  };