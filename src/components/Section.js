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

    addItem(element, position = 'append') {
        switch (position) {
            case 'append':
                this._container.append(element);
                break;
            case 'prepend':
                this._container.prepend(element);
                break;
            default:

                break;
        }
    }
}