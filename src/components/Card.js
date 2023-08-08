
export class Card {
   constructor(data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._tempateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
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
      this._setEventListeners();

      this._cardName.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;

      return this._element;
   }

   _handleLikeButton() {
      this._likeButton.classList.toggle('elements__like_active');
   }

   _handleDeleteButton() {
      this._element.remove();
   }

   _handleImageOpen() {
      this._handleCardClick(this._name, this._link);
   }
   
   _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
         this._handleLikeButton();
      });

      this._delButton.addEventListener('click', () => {
         this._handleDeleteButton();
      });

  
      this._cardImage.addEventListener("click", () => {
         this._handleImageOpen();
       });
   }
}