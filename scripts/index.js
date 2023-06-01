const popUp = document.querySelector('.popup');
const openPopUp = document.querySelector('.profile__edit-button');
const closePopUp = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let popUpName = document.querySelector('.popup__field_name');
let popUpActivity = document.querySelector('.popup__field_activity');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');


openPopUp.addEventListener('click', () => {
   popUp.classList.add('popup_opened');
   popUpName.value = profileName.textContent;
   popUpActivity.value = profileActivity.textContent;

})

function closePop() {
   popUp.classList.remove('popup_opened');
}

closePopUp.addEventListener('click', closePop)

function handleFormSubmit(evt) {
   evt.preventDefault();
   profileName.textContent = popUpName.value;
   profileActivity.textContent = popUpActivity.value;
   closePop();
}


formElement.addEventListener('submit', handleFormSubmit);