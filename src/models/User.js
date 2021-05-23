class User {
    constructor({ schoolNo, password, preferences = {} } = {}) {
        this.schoolNo = schoolNo
        this.password = password
        this.preferences = preferences
    }

    toJson() {
        return {
            schoolNo: this.schoolNo, 
            preferences: this.preferences
        }
    }
}

module.exports = User