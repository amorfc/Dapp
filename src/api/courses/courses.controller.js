const CoursesDao = require("../../dao/coursesDao")

class CourseController {
    static async getAllCourses(req, res){
        try {
            const { authenticatedUser } = req
            console.log(`${authenticatedUser.schoolNo} tries to get courses`)
            const coursesListFromDb = await CoursesDao.getAllCourses(authenticatedUser.schoolNo)
            if(!coursesListFromDb.success){
                res.status(401).json({ error: coursesListFromDb.error })
                return
            }
            console.log(coursesListFromDb);
            res.json({
                data: coursesListFromDb.data,
                message: "Courses successfully fetched!!!AmerBombomvski"
            })

        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}


module.exports = CourseController