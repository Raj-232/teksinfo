const User = require("../Model/user");
const fs = require('fs');

// Function to read file data from the server using the file path
function getFileData(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const getAllUser= async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({
                status: 404,
                message: 'No users found'
            });
        }
        
        // Iterate through each user and add profile image data
        const usersWithData = await Promise.all(users.map(async user => {
            const profileImagePath = user.profileImage;
            const fileData = await getFileData(profileImagePath);
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                verifyed:user.verifyed,
                mobileNumber: user.mobileNumber,
                profileImage: {
                    data: fileData,
                    contentType: 'image/jpeg' // Set the appropriate content type based on your file type
                }
            };
        }));
        
        res.status(200).json({
            status: 200,
            message: 'Retrieved user data successfully',
            data: usersWithData
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    getAllUser
};
