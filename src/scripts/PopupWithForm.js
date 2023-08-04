import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, popupCallbackSubmit) {
        super(popup);
        this._popupCallbackSubmit = popupCallbackSubmit;
        this._popupForm = this._popup.querySelector('.form');
        this._formInputList = this._popupForm.querySelectorAll('.popup__input');
        this._submitButton = this._popupForm.querySelector('.popup__save');
    }

    _getInputValues() {
        this._inputValues = {};

        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (e) => {
            this._popupCallbackSubmit(e);
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}