const popUp = document.querySelector('.popup');
const openPopUp = document.querySelector('.profile__edit-button');
const closePopUp = document.querySelector('.popup__close');
const savePopUp = document.querySelector('.popup__save');
let formElement = document.querySelector('.popup__conteiner');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let popUpName = document.querySelector('.popup__name');
let popUpActivity = document.querySelector('.popup__activity');

openPopUp.addEventListener('click', () => {
   popUp.classList.add('popup_opened');
   popUpName.value = profileName.textContent;
   popUpActivity.value = profileActivity.textContent;

})

closePopUp.addEventListener('click', () => {
   popUp.classList.remove('popup_opened');

})

savePopUp.addEventListener('click', () => {
   popUp.classList.remove('popup_opened');

})

function handleFormSubmit(evt) {
   evt.preventDefault();
   profileName.textContent = popUpName.value;
   profileActivity.textContent =  popUpActivity.value;
}


formElement.addEventListener('submit', handleFormSubmit);