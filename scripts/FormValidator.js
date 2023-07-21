export class FormValidator {
   constructor(config, formElement) {
      this._formElement = formElement;

      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._inputErrorSelector = config.inputErrorSelector;

      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
   }

   _showError(inputElement, errorElement) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
   }

   _hideError(inputElement, errorElement) {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
   }

   _checkInputValidity(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      if (!inputElement.validity.valid) {
         this._showError(inputElement, errorElement);
      } else {
         this._hideError(inputElement, errorElement);
      }
   }

   resetError() {
      this._inputList.forEach((inputElement) => {
         const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
         this._hideError(inputElement, errorElement);
      });
   }

   disabledButton() {
      this._buttonElement.setAttribute('disabled', 'true');
      this._buttonElement.classList.add(this._inactiveButtonClass);
   }

   enabledButton() {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
   }

   _toggleButtonState(isActive) {
      if (!isActive) {
         this.disabledButton();
      } else {
         this.enabledButton();
      }
   }

   _setEventListener() {
      this._toggleButtonState(this._formElement.checkValidity());
      this._inputList.forEach(inputElement => {
         inputElement.addEventListener('input', () => {
            this._toggleButtonState(this._formElement.checkValidity());
            this._checkInputValidity(inputElement);
         });
      });
   }

   enableValidation() {
      this._setEventListener();
   }
} 