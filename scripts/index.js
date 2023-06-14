const popUp = document.querySelector('.popup');
const popUpEdit = document.querySelector('.popup-edit');
const popUpAdd = document.querySelector('.popup-add');
const popUpImages = document.querySelector('.popup-images');
const openPopUpEdit = document.querySelector('.profile__edit-button');
const openPopUpAdd = document.querySelector('.profile__add-button');
const closePopUp = document.querySelector('.popup__close');
const closePopUpAdd = document.querySelector('.popup__close-add');
const closePopUpImage = document.querySelector('.popup__close-image');

const popUpimage = document.querySelector('.popup__image');
const popUpImageName = document.querySelector('.popup__image-name');

let formElement = document.querySelector('.popup__form');
let formElementAdd = document.querySelector('.popup__form-add');
let popUpName = document.querySelector('.popup__input_type_name');
let popUpActivity = document.querySelector('.popup__input_type_activity');

let popUpImageInputName = document.querySelector('.popup__input_type_image-name');
let popUpImageInputLink = document.querySelector('.popup__input_type_image-link');

let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');


openPopUpEdit.addEventListener('click', () => {
  popUpEdit.classList.add('popup_opened');
  popUpName.value = profileName.textContent;
  popUpActivity.value = profileActivity.textContent;
})

function closePop() {
  popUp.classList.remove('popup_opened');
}

closePopUp.addEventListener('click', closePop);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popUpName.value;
  profileActivity.textContent = popUpActivity.value;
  closePop();
}

formElement.addEventListener('submit', handleFormSubmit);


openPopUpAdd.addEventListener('click', () => {
  popUpAdd.classList.add('popup_opened');
})
function closePopAdd() {
  popUpAdd.classList.remove('popup_opened');
}

closePopUpAdd.addEventListener('click', closePopAdd)


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementsList = document.querySelector('.elements__list');
const template = document.querySelector('#elements-template').content.querySelector('.elements__card');

function createCard({ name, link }) {
  const card = template.cloneNode(true);
  const cardName = card.querySelector('.elements__name');
  const cardImage = card.querySelector('.elements__image');
  const delButton = card.querySelector('.elements__del');
  const likeButton = card.querySelector('.elements__like');

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  delButton.addEventListener('click', () => {
    card.remove();
  })

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  })

  cardImage.addEventListener('click', () => {
    popUpImages.classList.add('popup_opened');
    popUpimage.src = link;
    popUpimage.alt - name;
    popUpImageName.textContent = name;
  });
  return card;
}

function closePopImages() {
  popUpImages.classList.remove('popup_opened');
}
closePopUpImage.addEventListener('click', closePopImages);

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


initialCards.forEach(function (item) {
  renderCard(item, elementsList, 'append');
})

formElementAdd.addEventListener('submit', function (e) {
  e.preventDefault();

  const nameNewCard = popUpImageInputName.value;
  const linkNewCard = popUpImageInputLink.value;
  renderCard({ name: nameNewCard, link: linkNewCard }, elementsList, 'prepend');

  popUpImageInputName.value = '';
  popUpImageInputLink.value = '';

  closePopAdd();
});  