//service
//added few code in getdatadbservice to get particular details

var usersModel = require('./usersModel');

module.exports.getDataFromDBService = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            usersModel.find({})
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                });
        } else {
            usersModel.findOne({ _id: id })
                .then(result => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject('User not found');
                    }
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
};


 module.exports.createUserDBService = (usersDetails) => {

    if(usersDetails.name=="" || usersDetails.email=="" || usersDetails.address=="" || usersDetails.phone=="")
        return false; 

    return new Promise(function myFn(resolve, reject) {
 
        var usersModelData = new usersModel();
 
        usersModelData.name = usersDetails.name;
        usersModelData.email = usersDetails.email;
        usersModelData.address = usersDetails.address;
        usersModelData.phone = usersDetails.phone;
        
        usersModelData.save()
            .then(result => {
            resolve(true);
        })
             .catch(error => {
              reject(false);
        });
 
    });
 
 }


 module.exports.updateUserDBService = (id,usersDetails) => {     
    console.log(usersDetails);
    return new Promise(function myFn(resolve, reject) {
        usersModel.findOneAndUpdate({ _id: id }, usersDetails, { new: true })
        .then(result => {
            if (!result) {
                 reject(false);
            } else {
                resolve(result);
            }
    })
        .catch(error => {
            reject(false);
         });
 
    });
 }

 module.exports.removeUserDBService = (id) => { 
    return new Promise(function myFn(resolve, reject) {
        usersModel.findOneAndDelete({ _id: id })
            .then(result => {
                if (!result) {
                reject(false);
            } else{
            resolve(result);
            }
        })
            .catch(error => {
             reject(false);
        });

    });
 
 }

 