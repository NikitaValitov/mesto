import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
   constructor(popupSelector, handleItemSubmit = null) {
      super(popupSelector);
      this._popup = document.querySelector(popupSelector);
      this._popupForm = this._popup.querySelector('.form');
      this._handleItemSubmit = handleItemSubmit;
   }

   setActionSubmit(callback) {
      this._handleItemSubmit = callback;
   }

   setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener("submit", (e) => {
         e.preventDefault();
         this._handleItemSubmit();
      })
   }
}