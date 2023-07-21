import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { config, initialCards } from "./constants.js";

const popUpEdit = document.querySelector('.popup-edit');
const popUpAdd = document.querySelector('.popup-add');
const popUpImages = document.querySelector('.popup-images');
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupEdit = document.querySelector('.popup__close-edit');
const buttonClosePopupAdd = document.querySelector('.popup__close-add');
const buttonClosePopupImage = document.querySelector('.popup__close-image');
const buttonSavCard = document.querySelector('.popup__save_card');

const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');

const formElementEdit = document.querySelector('.popup__form-edit');
const formElementAdd = document.querySelector('.popup__form-add');
const inputPopupName = document.querySelector('.popup__input_type_name');
const inputPopupActivity = document.querySelector('.popup__input_type_activity');

const inputPopupImageName = document.querySelector('.popup__input_type_image-name');
const inputPopupImageLink = document.querySelector('.popup__input_type_image-link');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}


function closeOverlay(evt) {
  if (
    evt.currentTarget === evt.target || evt.target.classList.contains('popup__close')
  ) {
    closePopup(evt.currentTarget);
  }
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened)
  }
}


popUpEdit.addEventListener('click', closeOverlay);
popUpAdd.addEventListener('click', closeOverlay);
popUpImages.addEventListener('click', closeOverlay);


buttonOpenPopupEdit.addEventListener('click', () => {
  openPopup(popUpEdit);
  inputPopupName.value = profileName.textContent;
  inputPopupActivity.value = profileActivity.textContent;
  editFormValidator.enabledButton();
  editFormValidator.resetError();
})

buttonClosePopupEdit.addEventListener('click', () => {
  closePopup(popUpEdit)
});

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputPopupName.value;
  profileActivity.textContent = inputPopupActivity.value;
  closePopup(popUpEdit);
}

formElementEdit.addEventListener('submit', handleFormProfileSubmit);


buttonOpenPopupAdd.addEventListener('click', () => {
  formElementAdd.reset();
  addFormValidator.disabledButton();
  addFormValidator.resetError();
  openPopup(popUpAdd);

})

buttonClosePopupAdd.addEventListener('click', () => {
  closePopup(popUpAdd);
})

const editFormValidator = new FormValidator(config, formElementEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, formElementAdd);
addFormValidator.enableValidation();


function createCard(data) {
  const cardElement = new Card(data, '#elements-template');
  return cardElement.generateCard();
}

export function openPopupView(data) {
  openPopup(popUpImages);
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupImageName.textContent = data.name;
}


buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popUpImages);
});

function renderCard(data, container, position = 'append') {
  switch (position) {
    case "append":
      container.append(createCard(data));
      break;
    case "prepend":
      container.prepend(createCard(data));
      break;
    default:
      break;
  }
}

const elementsList = document.querySelector('.elements__list');

initialCards.forEach(function (item) {
  renderCard(item, elementsList, 'append');
})


formElementAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  const nameNewCard = inputPopupImageName.value;
  const linkNewCard = inputPopupImageLink.value;

  renderCard({ name: nameNewCard, link: linkNewCard }, elementsList, 'prepend');

  closePopup(popUpAdd);
});  