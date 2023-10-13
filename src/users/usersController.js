//controller
// added new  get req for get particular details
var usersService = require('./usersService');

var get = async (req, res) =>
{
    var empolyee = await usersService.getDataFromDBService();
    res.send({ "status": true, "data": empolyee });
}
var get = async (req,res)=>
{
    console.log(req.params.id);
    console.log(req.body);
    var employee = await usersService.getDataFromDBService(req.params.id,req.body);
    res.send({"status": true, "data": employee});
}
var create = async (req, res) => 
{
    var status = await usersService.createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Please fill all the fields." }); 
    }
}

var update = async (req, res) => 
{
    console.log(req.params.id);
    console.log(req.body);
     
    var result = await usersService.updateUserDBService(req.params.id,req.body);

     if (result) {
        res.send({ "status": true, "message": "User Updateeeedddddd"} );
     } else {
         res.send({ "status": false, "message": "User Updateeeedddddd Faileddddddd" });
     }
}

var expunge = async (req, res) => 
{
     console.log(req.params.id);
     var result = await usersService.removeUserDBService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "User Deleteddd"} );
     } else {
         res.send({ "status": false, "message": "User Deleteddd Faileddddddd" });
     }
}

module.exports = { get, get, create, update, expunge};


