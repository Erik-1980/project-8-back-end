const { Users } = require('./db');

const createUser = async (email, password) => { // +
  try {
    const newUser = await Users.create({
      email: email,
      password: password
    });
    return newUser;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

const getUserByUsername = async (email) => { // +
  try {
    const user = await Users.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error.message}`);
  }
};

const findAllUsers = async () => {// +
  try {
    const users = await Users.findAll({ attributes: ['id', 'name', 'lastname', 'email', 'adress', 'phone', 'isAdmin','verification', 'createdAt', 'updatedAt'] });
    return users;
  } catch (error) {
    throw new Error(`Failed to get all users: ${error.message}`);
  }
};

const findById = async (id) => {// +
  try {
    const user = await Users.findOne({ attributes: ['id', 'name', 'lastname', 'email', 'adress', 'phone', 'verification', 'createdAt', 'updatedAt'], where: { id } });
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by id: ${error.message}`);
  }
};

const deleteUserById = async (id) => {// +
  try {
    const deletedUser = await Users.destroy({ where: { id } });
    return deletedUser;
  } catch (error) {
    throw new Error(`Failed to delete user by id: ${error.message}`);
  }
};

const updateUserAdminStatus = async (email, isAdmin) => {// +
  try {
    const updatedUser = await Users.update({ isAdmin }, { where: { email } });
    return updatedUser;
  } catch (error) {
    throw new Error(`Failed to update user admin status: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  findAllUsers,
  findById,
  deleteUserById,
  updateUserAdminStatus
};