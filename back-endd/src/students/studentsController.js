//controller
// added new  get req for get particular details

const studentsService = require('./studentsService');

let get = async (req, res) => {
    if (req.params.id) {
        console.log(req.params.id);
        console.log(req.body);
        let students = await studentsService.getStudentFromDBService(req.params.id, req.body);
        res.send({ "status": true, "data": students });
        req.io.emit('studentUpdated'); // client update
    } else {
        let students = await studentsService.getStudentFromDBService();
        res.send({ "status": true, "data": students });
        req.io.emit('studentUpdated');//emit
    }
}

let create = async (req, res) => 
{
    let status = await studentsService.createStudentDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "Student created successfully" });
        req.io.emit('studentUpdated');
    } else {
        res.send({ "status": false, "message": "Please fill all the fields." }); 
        req.io.emit('studentUpdated');
    }
}

let update = async (req, res) => 
{
    console.log(req.params.id);
    console.log(req.body);
     
    let result = await studentsService.updateStudentDBService(req.params.id,req.body);

     if (result) {
        res.send({ "status": true, "message": "Student Updateeeedddddd"} );
        req.io.emit('studentUpdated');
     } else {
         res.send({ "status": false, "message": "Student Update Faileddddddd" });
         req.io.emit('studentUpdated');
     }
}

let expunge = async (req, res) => 
{
     console.log(req.params.id);
     let result = await studentsService.removeStudentDBService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "Student Deleteddd"} );
        req.io.emit('studentUpdated');
     } else {
         res.send({ "status": false, "message": "Student Delete Faileddddddd" });
         req.io.emit('studentUpdated');
     }
}

module.exports = { get, create, update, expunge};


