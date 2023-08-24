
export class Card {
   constructor(data, templateSelector, handleCardClick, userId, handleLikeCard, handleCardDelete) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._tempateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._userId = userId;
      this._handleLikeCard = handleLikeCard;
      this._handleCardDelete = handleCardDelete;
   }

   _getTemplate() {
      const cardElement = document.querySelector(this._tempateSelector).content.querySelector('.elements__card').cloneNode(true);

      return cardElement;
   }

   generateCard() {
      this._element = this._getTemplate();
      this._cardName = this._element.querySelector('.elements__name');
      this._cardImage = this._element.querySelector('.elements__image');
      this._delButton = this._element.querySelector('.elements__del');
      this._likeButton = this._element.querySelector('.elements__like');
      this._cardLikeCouner = this._element.querySelector('.elements__like-sum');
      this.setLikesData(this._data);
      this._setEventListeners();
      this._showDeleteButton();
      this._cardName.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;

      return this._element;
   }

   isLiked() {
      return this._data.likes.some((item) => {

         return item._id === this._userId;
      })
   }

   _updateLike() {
      this._cardLikeCouner.textContent = this._data.likes.length;
      if (this.isLiked()) {
         this._likeButton.classList.add('elements__like_active')
      } else {
         this._likeButton.classList.remove('elements__like_active')
      }
   }

   getId() {
      return this._data._id;
   }

   setLikesData(data) {
      this._data.likes = data.likes;
      this._updateLike();
   }


   remove() {
      this._element.remove();
      this._element = null;
   }

   _handleImageOpen() {
      this._handleCardClick(this._name, this._link);
   }

   _showDeleteButton() {
      if (this._userId !== this._data.owner._id) {
         this._delButton.style.display = "none"
      }
   }

   _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
         this._handleLikeCard(this);
      });

      if (this._userId === this._data.owner._id) {
         this._delButton.addEventListener('click', () => this._handleCardDelete(this));
      }


      this._cardImage.addEventListener("click", () => {
         this._handleImageOpen();
      });
   }
}