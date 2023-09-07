export default class Task {
    static taskCounter = 0;

    constructor(title, description, date) {
        this._id = ++Task.taskCounter;
        this._title = title;
        this._description = description;
        this._date = date;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get date() {
        return this._date;
    }

    set date(date) {
        this._date = date;
    }
}