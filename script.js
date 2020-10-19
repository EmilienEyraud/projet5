/*Lien avec l'API */

getAllTeddies = () => {
  return new Promise((resolve) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
        resolve(JSON.parse(this.responseText));
        console.log("Connecté");
      } 
    };
    request.open("GET",  "http://localhost:3000/api/teddies");
    request.send();
  });
};

async function teddies() {
  const teddies = await getAllTeddies();}
