//controller
// added new  get req for get particular details

const studentsService = require('./studentsService');

let get = async (req, res) => {
    if (req.params.id) {
        console.log(req.params.id);
        console.log(req.body);
        let students = await studentsService.getStudentFromDBService(req.params.id, req.body);
        res.send({ "status": true, "data": students });
    } else {
        let students = await studentsService.getStudentFromDBService();
        res.send({ "status": true, "data": students });
    }
}

let create = async (req, res) => 
{
    let status = await studentsService.createStudentDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "Student created successfully" });
    } else {
        res.send({ "status": false, "message": "Please fill all the fields." }); 
    }
}

let update = async (req, res) => 
{
    console.log(req.params.id);
    console.log(req.body);
     
    let result = await studentsService.updateStudentDBService(req.params.id,req.body);

     if (result) {
        res.send({ "status": true, "message": "Student Updateeeedddddd"} );
     } else {
         res.send({ "status": false, "message": "Student Update Faileddddddd" });
     }
}

let expunge = async (req, res) => 
{
     console.log(req.params.id);
     let result = await studentsService.removeStudentDBService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "Student Deleteddd"} );
     } else {
         res.send({ "status": false, "message": "Student Delete Faileddddddd" });
     }
}

module.exports = { get, create, update, expunge};


