export class UserInfo {
    constructor({ nameSelector, activitySelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._activityElement = document.querySelector(activitySelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._activityElement.textContent
        }
    }

    setUserInfo(userInfo) {
        this._nameElement.textContent = userInfo.name;
        this._activityElement.textContent = userInfo.about;

    }

    setUserAvatar(link) {
        this._avatarElement.src = link.avatar
    }
}