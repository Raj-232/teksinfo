const bcrypt = require('bcryptjs');
const User =require('../Model/user')
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { name, email, mobileNumber, password,verifyed } = req.body;
        // Validate name, email, mobileNumber, password, and verifyed fields
        if (!name || !email || !mobileNumber || !password || !verifyed) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate mobile number format (10 digits)
        const mobileRegex =/^\+\d{1,3}\d{10}$/;
        if (!mobileRegex.test(mobileNumber)) {
            return res.status(400).json({ message: 'Mobile number must be 10 digits long' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if mobile number or email already exists
        const existingUserMobile = await User.findOne({ mobileNumber });
        const existingUserEmail = await User.findOne({ email });
        if (existingUserMobile) {
            return res.status(400).json({ message: 'Mobile number already exists' });
        }
        if (existingUserEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, mobileNumber, password: hashedPassword, profileImage: req.file.path, verifyed});
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });
        res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: user,
            token:token
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}
const userLogin = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(401).json({ message: 'Invalid mobileNumber or password' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });
        res.status(200).json({
            status: 200,
            message: "User login successfully",
            token,
            data: user
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: error.name });
    }
}
// Get a single user by ID
const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Retrieved user successfully',
            data: user
        });
    } catch (error) {
        console.error('Error retrieving user by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
  };
  
  // Delete a user by ID
  const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
  };
  
  // Update a user by ID
  const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, password,mobileNumber } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email,mobileNumber, password }, { new: true });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
  };
module.exports = {
    createUser,
    userLogin,
    getUserById,
    updateUser,
    deleteUser
}