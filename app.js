
// obj utilisé pour check si tous les champs sont bons avant envoi du formulaire
const inputsValidity = {
  user: false,
  email: false,
  password: false, 
  passwordConfirmation: false
}

const form = document.querySelector("form");
const container = document.querySelector(".container");

form.addEventListener("submit", handleForm)

// systeme de loc de variable pour savoir si l'animation est en cours ou non
let isAnimating = false;
function handleForm(e){
  e.preventDefault()

// Obejct.keys() permet de récupérer les clés d'un objet sous forme de tableau
  const keys = Object.keys(inputsValidity) 

  // filtrer les clés qui ont une valeur false 
  const failedInputs = keys.filter(key => !inputsValidity[key]) 

  // autre methode
  // const failedInputs = keys.filter(key =>{
  //   if (!inputsValidity[key]) {
  //     return key
  //   }
  // })


// si il y a des inputs qui ont une valeur false on affiche les erreurs
  if(failedInputs.length && !isAnimating) {
    // on gere l'animation si erreur 
    isAnimating = true;
    container.classList.add("shake");

    setTimeout(() =>{
      container.classList.remove("shake")
      isAnimating = false;
    }, 400)


// afficher toutes les erreurs 
    failedInputs.forEach(input => {

      const index = keys.indexOf(input) 
      showValidation( index,  false)
    })
  }
  else {
  
    alert("Données envoyées avec succès.")
  }

}










function showValidation(index, validation) { 
  if(validation){
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "ressources/check.svg";
    if(validationTexts[index])  validationTexts[index].style.display = "none";// on met une condition pour verifier si il existe un text de validation pour l'input, à faire pour la verif du mot de passe.
  } 
  else {
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "ressources/error.svg";
    if(validationTexts[index]) validationTexts[index].style.display = "block";
  }
}








// verification du nom d'utilisateur
const validationIcons = document.querySelectorAll(".icone-verif");
const validationTexts = document.querySelectorAll(".error-msg");

const userInput = document.querySelector(".input-group:nth-child(1) input")
//  OU 
// const inputs = document.querySelectorAll(".input-group input");
// const userInput = inputs[0];

userInput.addEventListener("blur", userValidation) // blur = quand on sort de l'input
userInput.addEventListener("input", userValidation) // input = quand on tape dans l'input

function userValidation(){
  if(userInput.value.length >= 3) {
    showValidation( 0, true)
    inputsValidity.user = true;
  }
  else {
    showValidation( 0, false)
    inputsValidity.user = false;
  }
}
// Fin verfiication du nom d'utilisateur







// verfiication du mail
const mailInput = document.querySelector(".input-group:nth-child(2) input")

mailInput.addEventListener("blur", mailValidation)
mailInput.addEventListener("input", mailValidation) // 

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function mailValidation(){
  if(regexEmail.test(mailInput.value)){
    showValidation(1, true)
    inputsValidity.email = true;

  }
  else {
    showValidation(1,  false)
    inputsValidity.email = false;

  }
}
// fin vérif mail 






// vérif mot de passe
const pswInput = document.querySelector(".input-group:nth-child(3) input")

pswInput.addEventListener("blur", passwordValidation)
pswInput.addEventListener("input", passwordValidation)

const passwordVerification = {
  length: false,
  symbol: false,
  number: false
}

const regexList = {
  symbol: /[^a-zA-Z0-9\s]/,
  number: /[0-9]/
}
let passwordValue;

function passwordValidation(){
  passwordValue = pswInput.value;
  let validationResult = 0; // compteur de validation permet d'afficher la mesure de securité du mot de passe

      if(passwordValue.length >= 6) {
        passwordVerification.length = true;
        validationResult++;
      }

    // verifier si le mot de passe contient au moins un symbole et un chiffre
    for (const prop in regexList) {
    if(regexList[prop].test(passwordValue)) {
      passwordVerification[prop] = true;
      validationResult++;
    } 
  }
 
  if(validationResult !== 3) {
    // showValidation({index: 2, validation: false})
    showValidation(2,  false)
    inputsValidity.password = false;
  }
  else {
    showValidation(2,  true)
    inputsValidity.password = true;
  }
  passwordStrength()
}



// verif niveau de securité du mot de passe

const lines = document.querySelectorAll(".lines div")

function passwordStrength(){
  const passwordLength = pswInput.value.length;

  lines.forEach((el) => {
    el.style.display = "none";
  });
  
  if(!passwordLength) { // si le mot de passe est vide
    return;
  }
  else if(passwordLength > 9 && passwordVerification.symbol && passwordVerification.number) {
    addLines(3)
  }
  else if(passwordLength > 6 && passwordVerification.symbol && passwordVerification.number) {
    addLines(2)
  }
  else { // un text qui ne contient pas de chiffre et de symbole mais qui fait plus de 1 caractère
    addLines(1)
  }

 
  function addLines(numberOfLines) {
    lines.forEach((el, index) => {
      if(index < numberOfLines) {
        el.style.display = "block"
      }
      else {
        el.style.display = "none"
      }
    })
  }


// si ma 4 eme icone de validation est affichée je rappel la fonction confirmPassword pour verifier si la confirmation du mot de passe est valide
  if(validationIcons[3].style.display === "inline") {
    confirmPassword()
  }
}



// vérif confirmation du mot de passe
const confirmInput = document.querySelector(".input-group:nth-child(4) input")

confirmInput.addEventListener("blur", confirmPassword)
confirmInput.addEventListener("input", confirmPassword)

function confirmPassword(){
  const confirmedValue = confirmInput.value;

  // si le mot de passe et la confirmation sont vides
  if(!confirmedValue && !passwordValue) {
    validationIcons[3].style.display = "none";
  }
  // si le mot de passe et la confirmation ne sont pas egales
  else if(confirmedValue !== passwordValue) {
    showValidation(3, false)
    inputsValidity.passwordConfirmation = false;
  }
  else {
    showValidation( 3, true)
    inputsValidity.passwordConfirmation = true;
  }
}

