let studentsModel = require('./studentsModel');

// read operation
module.exports.getStudentFromDBService = async (id) => {
    try {
        if (!id) {
            const result = await studentsModel.find({});
            return result;
        } else {
            const result = await studentsModel.findOne({ _id: id });
            if (result) {
                return result;
            } else {
                throw new Error('Student not found');
            }
        }
    } catch (error) {
        throw error;
    }
};


// create operation
module.exports.createStudentDBService = async (studentsDetails) => {
    if (studentsDetails.name === "" || studentsDetails.email === "" || studentsDetails.address === "" || studentsDetails.phone === "") {
        return false;
    }

    try {
        const studentModelData = new studentsModel();

        studentModelData.name = studentsDetails.name;
        studentModelData.email = studentsDetails.email;
        studentModelData.address = studentsDetails.address;
        studentModelData.phone = studentsDetails.phone;

        const result = await studentModelData.save();
        return true;
    } catch (error) {
        throw error;
    }
};


// updatee operation
module.exports.updateStudentDBService = async (id, studentsDetails) => {
    try {
        console.log(studentsDetails);
        const result = await studentsModel.findOneAndUpdate({ _id: id }, studentsDetails, { new: true });
        if (!result) {
            throw new Error('Student not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
};


// delete operation
module.exports.removeStudentDBService = async (id) => {
    try {
        const result = await studentsModel.findOneAndDelete({ _id: id });
        if (!result) {
            throw new Error('Student not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
};
