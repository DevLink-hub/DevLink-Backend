import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../model/userModel.js';
import { userSchema } from '../schema/userSchema.js';

// Creating a user (sign up)
export const signup = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    value.password = hashedPassword;

    const newUser = await userModel.create(value);
    req.session.user = { id: newUser._id };

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

// Get a single user by username
export const getUser = async (req, res, next) => {
  try {
    const userName = req.params.userName.toLowerCase();
    const user = await userModel.findOne({ userName }).select("-password");

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// Get users based on query parameters
export const getUsers = async (req, res, next) => {
  try {
    const { email } = req.query;
    const filter = {};

    if (email) filter.email = email.toLowerCase();
  
    const users = await userModel.find(filter);
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// User login
export const login = async (req, res, next) => {
  try {
    const { email, userName, password } = req.body;

    if (!password || (!email && !userName)) {
      return res.status(400).json({ message: 'Email or username and password are required' });
    }

    const user = await userModel.findOne({
      $or: [{ email }, { userName }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.user = { id: user._id };
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

// Token authentication
export const token = async (req, res, next) => {
  try {
    const { email,password } = req.body;

    if (!password || !email ) {
      return res.status(400).json({ message: 'Email or username and password are required' });
    }

    const user = await userModel.findOne({
      $or: [{ email }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '4h' }
    );

    res.status(200).json({
      message: 'Login successful',
      accessToken: token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

// User logout
export const logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: 'User logged out' });
    });
  } catch (error) {
    next(error);
  }
};


