export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items, userInfo) {
        items.forEach((item) => {
            this._renderer(item, userInfo);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}