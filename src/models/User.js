class User {
    constructor({ name, surname, schoolNo, password, preferences = {} } = {}) {
        this.name = name
        this.surname = surname
        this.schoolNo = schoolNo
        this.password = password
        this.preferences = preferences
    }

    toJson() {
        return {
            name: this.name, 
            surname: this.surname, 
            schoolNo: this.schoolNo, 
            password: this.password, 
            preferences: this.preferences
        }
    }
}