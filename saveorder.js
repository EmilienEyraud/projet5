// Préparation à l'envoi de la commande 

// FORMULAIRE//
const validateForm = () => {

    //Contole REGEX (expressions régulières)des entrées du formulaire 
    //source : https://www.codeflow.site/fr/article/regular-expressions__how-to-validate-email-address-with-regular-expression#:~:text=Comment%20valider%20une%20adresse%20email%20avec%20une%20expression%20r%C3%A9guli%C3%A8re,-email%20regex&text=La%20combinaison%20signifie%20que%20l,par%20le%20symbole%20%C2%AB%40%C2%BB.
    const checkNumber = /[0-9]/;
    const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

    let checkMessage = '';


    //Récupérer les éléments du formulaire :
    const lastName = document.getElementById('nom').value;
    const firstName = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const adress = document.getElementById('adresse').value;
    const postalCode = document.getElementById('code_postal').value;
    const city = document.getElementById('ville').value;

    // Test des entrées du formulaire
    //Nom
    if (
        checkNumber.test(lastName) === true ||
        checkSpecialCharacter.test(lastName) === true ||
        lastName === ''
    ) {
        checkMessage = 'Veuillez vérifier les informations concernant votre nom, les caractères spéciaux ne sont pas acceptés';
    }


    else { console.log('Nom accepté') }

    //Prénom
    if (
        checkNumber.test(firstName) === true ||
        checkSpecialCharacter.test(firstName) === true ||
        firstName === ''
    ) {
        checkMessage = 'Veuillez vérifier les informations concernant votre prénom, les caractères spéciaux ne sont pas acceptés';
    }
    else { console.log('Prénom accepté') }

    //Adresse Mail
    if (checkMail.test === false ||
        email === '') {
        checkMessage = 'Veuillez vérifier les informations concernant votre adresse mail'
    }
    else { console.log('Adresse Mail validée') }

    //Adresse Postale
    if (
        checkNumber.test(adress) === true ||
        checkSpecialCharacter.test(adress) === true ||
        adress === ''
    ) {
        checkMessage = 'Veuillez vérifier les informations concernant votre adresse, les caractères spéciaux ne sont pas acceptés';
    }
    else { console.log('Adresse Postale acceptée') }

    //Code Postal
    if (
        checkNumber.test(postalCode) === true ||
        checkSpecialCharacter.test(postalCode) === false ||
        checkMail.test(postalCode) === false ||
        postalCode.length === 5
    ) {
        checkMessage = 'Code Postal Validé'
    }
    else {
        checkMessage = 'Votre Code Postal doit comporter 5 chiffres'
    }


    //Ville
    if (
        checkNumber.test(city) === true ||
        checkSpecialCharacter.test(city) === true ||
        city === ''
    ) {
        checkMessage = 'Veuillez vérifier les informations concernant votre ville, les caractères spéciaux ne sont pas acceptés';
    }
    else { console.log('Ville acceptée') }

    // Construction de l'objet contact
    const contact = {
        lastName: lastName,
        firstName: firstName,
        email: email,
        address: adress,
        //codePostal: postalCode,
        city: city
    };
    return contact
}

//ENVOI FORMULAIRE
const sendOrder = async (contact, products) => {
        if (products.length < 1) {
            alert('Votre panier est vide')
            console.log('Votre panier est vide')
            return false;
        }
        else {
            //Si le panier est validé on crée l'objet à envoyer
            const order = {
                contact,
                products
            }
            // on se connecte avec l'API 
            orderTeddies = (validateOrder) => {
                return new Promise((resolve) => {
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                            resolve(JSON.parse(this.responseText));
                            console.log("Connecté");
                        }
                        else {

                        }
                    };
                    request.open("POST", "http://localhost:3000/api/teddies/order");
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send(validateOrder);
                });
            };
           const validateOrder = JSON.stringify(order);
           const confirmationData =  await orderTeddies (validateOrder) // récupère les éléménents envoyés à  l'API
            console.log(confirmationData)
           localStorage.setItem('order', JSON.stringify(confirmationData)) // Sauvegarde des éléments dans le local storage
           document.location.href = "confirmation-orinounours.html"
        

            //Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
            contact = {};
            products = [];
            //localStorage.clear();
        }
}

