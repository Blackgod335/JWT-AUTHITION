require('dotenv').config();
const { ObjectId } = require('mongoose').Types
const userModel = require("../model/user");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const register = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = req.body;
      console.log(data);
      const password = await bcrypt.hash(data.password, 10);
      const useData = await userModel.create({
        username: data.username,
        email: data.email,
        password: password,
      });
      resolve(useData);
      console.log(userData);
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};
const login = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = req.params;
      console.log(data);

      const user = await userModel.findById({ _id: data.userId });
      if (!user) {
        return reject({ message: "User not found" });
      }

      const jwtData = {
        userId: user._id.toString(), // Ensure userId is a string
        username: user.username,
        email: user.email,
      };

      // Ensure the secret key is defined
      if (!process.env.AUTH_key) {
        return reject({ message: "JWT secret key is not defined" });
      }

      // Generate the token
      const token = jwt.sign(jwtData, process.env.AUTH_key, { expiresIn: '1h' }); // Add expiration time

      resolve({
        message: "Login successful",
        userId: user._id,
        username: user.username,
        email: user.email,
        token: token,
      });
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

const getsingleaddress = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
      
      if (!ObjectId.isValid(userId)) {
        return reject({ message: "Invalid user ID" });
      }

      const user = await userModel.aggregate([
        {
          $match: {
            _id: new ObjectId(userId),
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
          },
        },
      ]);

      if (!user || user.length === 0) {
        return reject({ message: "User not found" });
      }

      resolve({ user });
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports = {
  register,
  login,
  getsingleaddress,
};
