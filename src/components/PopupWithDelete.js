import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
   constructor(popupSelector, handleCardSubmit = null) {
      super(popupSelector);
      this._popup = document.querySelector(popupSelector);
      this._popupForm = this._popup.querySelector('.form');
      this._handleCardSubmit = handleCardSubmit;
   }

   setActionSubmit(callback) {
      this._handleCardSubmit = callback;
   }

   setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener("submit", (e) => {
         e.preventDefault();
         this._handleCardSubmit();
      })
   }
}