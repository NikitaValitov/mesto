import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, popupCallbackSubmit) {
        super(popupSelector);
        this._popupCallbackSubmit = popupCallbackSubmit;
        this._popupForm = this._popup.querySelector('.form');
        this._formInputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        const inputValues = {};

        this._formInputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._popupCallbackSubmit(this._getInputValues());
            this._popupForm.reset();
        });
    }

    close() {
        super.close();
        
    }
}