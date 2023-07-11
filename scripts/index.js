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

const span = document.querySelector('.error');


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
  const event = new Event('input');
  openPopup(popUpEdit);
  inputPopupName.value = profileName.textContent;
  inputPopupActivity.value = profileActivity.textContent;
  inputPopupName.dispatchEvent(event);
  inputPopupActivity.dispatchEvent(event);
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
  const error = popUpAdd.querySelectorAll('.error');
  [...error].forEach((item) => {
    item.textContent = '';
  })

  inputPopupImageName.value = '';
  inputPopupImageLink.value = '';
  inputPopupImageName.classList.remove('popup__input_state_invalid')
  inputPopupImageLink.classList.remove('popup__input_state_invalid')
  disabledButton(buttonSavCard, config);
  buttonSavCard

  openPopup(popUpAdd);
})

buttonClosePopupAdd.addEventListener('click', () => {
  closePopup(popUpAdd);
})

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
    openPopup(popUpImages);
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
  });
  return card;
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


initialCards.forEach(function (item) {
  renderCard(item, elementsList, 'append');
})

formElementAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  const nameNewCard = inputPopupImageName.value;
  const linkNewCard = inputPopupImageLink.value;

  renderCard({ name: nameNewCard, link: linkNewCard }, elementsList, 'prepend');

  inputPopupImageName.value = '';
  inputPopupImageLink.value = '';

  closePopup(popUpAdd);
});  