// Lien vers l'API
const retourOrder = () => {
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
      request.open("GET", "http://localhost:3000/api/teddies/order");
      request.send(order);
    });
  };


//Récupération des informations pour affichage sur la page de confirmation
async function init () {

    if (sessionStorage.getItem("order") != null) {
       sessionStorage.removeItem("order");
      const order = JSON.parse(sessionStorage.getItem("order"));
      document.getElementById("firstName").innerHTML = order.contact.firstName;
      document.getElementById("orderId").innerHTML = order.orderId;
      const confirmRecap = document.getElementById('confirmation-recap')
      confirmRecap = displayShoppingCard()
    }
    
    else {
      document.getElementsById ('confirmation-recap');
      document.textContent ("Vous n'avez rien en commande" )
      }
       
  };
  