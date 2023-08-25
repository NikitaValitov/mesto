import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { config, configApi, initialCards } from "../utils/constants.js";
import { Api } from '../components/Api';
import { PopupWithDelete } from '../components/PopupWithDelete.js';


const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonOpenPopupAvatar = document.querySelector('.profile__button-avatar');
const formElementEdit = document.querySelector('.popup__form-edit');
const formElementAdd = document.querySelector('.popup__form-add');
const formElementAvatar = document.querySelector('.popup__form-avatar');

const inputPopupName = document.querySelector('.popup__input_type_name');
const inputPopupActivity = document.querySelector('.popup__input_type_activity');


const editFormValidator = new FormValidator(config, formElementEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, formElementAdd);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, formElementAvatar);
avatarFormValidator.enableValidation();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

function createCard(data) {
  const newCard = new Card(data, '#elements-template', handleCardClick, userId, handleLikeCard, handleCardDelete);
  const cardElement = newCard.generateCard()
  return cardElement;
}



const popupWithImage = new PopupWithImage('.popup-images');
popupWithImage.setEventListeners();

//открытие попапа редактирование профиля
buttonOpenPopupEdit.addEventListener('click', () => {
  const elementInfo = userInfo.getUserInfo();
  inputPopupName.value = elementInfo.name;
  inputPopupActivity.value = elementInfo.about;
  editFormValidator.enabledButton();
  editFormValidator.resetError();
  popupWithEditForm.open();
});

//открытие попапа добавленя карточки
buttonOpenPopupAdd.addEventListener('click', () => {
  addFormValidator.disabledButton();
  addFormValidator.resetError();
  popupWithAddForm.open();
});

//открытие попапа изменения аватарки
buttonOpenPopupAvatar.addEventListener('click', () => {
  avatarFormValidator.disabledButton();
  avatarFormValidator.resetError();
  popupWithAvatarForm.open();
});

const api = new Api(configApi);

let userId = null;


// экземпляр класса управления отображением информации пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  activitySelector: '.profile__activity',
  avatarSelector: '.profile__avatar'
});


// экземляр классса отрисовки карточек
const cardsContainer = new Section({
  renderer: (data, userData) => {
    cardsContainer.addItem(createCard(data, userData), 'append');
  }
},
  '.elements__list'
);

// получение данных пользователя и начальных картчоек с сервера
Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([userData, initialCardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardsContainer.renderItems(initialCardsData, userData);
  })
  .catch((err) => {
    console.log('Ошибка при получении данных юзера и карточек: ', err);
  })


// попап редактрирование инфо пользщователя
const popupWithEditForm = new PopupWithForm('.popup-edit', (data) => {
  popupWithEditForm.renderLoading(true);
  api
    .editUserInfo({
      name: data['popup-name'],
      about: data['popup-activity']
    })
    .then(() => {
      userInfo.setUserInfo({
        name: data['popup-name'],
        about: data['popup-activity'],
      });
      popupWithEditForm.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithEditForm.renderLoading(false);
  });
})

popupWithEditForm.setEventListeners();


// попап добавленя карточек
const popupWithAddForm = new PopupWithForm('.popup-add', (data) => {
  popupWithAddForm.renderLoading(true);
  api
    .addNewCard({ name: data.name, link: data.link })
    .then((data) => {
      cardsContainer.addItem(createCard(data), 'prepend');
      popupWithAddForm.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAddForm.renderLoading(false);
  });
})

popupWithAddForm.setEventListeners();


// лайки карточек
function handleLikeCard(instance) {
  api.changeLike(instance.getId(), instance.isLiked())
    .then((res) => {
      instance.setLikesData(res);
    })
    .catch(err => console.log(err));
};

// попап удаления карточки
const popupWithDelete = new PopupWithDelete('.popup-delete', null);
popupWithDelete.setEventListeners();

function handleCardDelete(cardInstance) {
  popupWithDelete.open();
  popupWithDelete.setActionSubmit(() => {
    api.deleteCard(cardInstance.getId())
      .then(() => {
        cardInstance.remove();
        popupWithDelete.close();
      })
      .catch(err => console.log(err));
  })
}

//попап изменения аватарки 
const popupWithAvatarForm = new PopupWithForm('.popup-avatar', (data) => {
  popupWithAvatarForm.renderLoading(true);
  api.editAvatar({ avatar: data['linkAvatar'] })
    .then(() => {
      userInfo.setUserAvatar({ avatar: data['linkAvatar'] });
      popupWithAvatarForm.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAvatarForm.renderLoading(false);
  });
})
popupWithAvatarForm.setEventListeners();