const { ObjectID } = require("bson");

let dapp;
let courses;

class CoursesDao {
  static async injectDb(connection) {
    if (dapp) return;

    try {
      dapp = connection.db(process.env.DB_NAME);
      courses = connection
        .db(process.env.DB_NAME)
        .collection(process.env.COURSES_COLLECTION_NAME);
    } catch (error) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${error}`
      );
    }
  }
  static async getAllCourses(schoolNo) {
    try {
      const filter = {
        'schoolNo': schoolNo,
      };
      const response = await courses.find(filter).toArray();
      return {
        data: response,
        success: true,
      };
    } catch (error) {
      return { error: error };
    }
  }
}

module.exports = CoursesDao;
