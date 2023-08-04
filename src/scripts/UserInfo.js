export class UserInfo {
    constructor({ nameSelector, activitySelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._activityElement = document.querySelector(activitySelector);
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            activity: this._activityElement.textContent
        }
    }

    setUserInfo(userInfo) {
        this._nameElement.textContent = userInfo.name;
        this._activityElement.textContent = userInfo.activity;
    }
}