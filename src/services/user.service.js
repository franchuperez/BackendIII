const User = require('../models/User');

class UserService {
  async getAll() {
    try {
      return await User.find().populate('pets');
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      return await User.findById(id).populate('pets');
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  async createMany(usersData) {
    try {
      return await User.insertMany(usersData);
    } catch (error) {
      throw new Error(`Error al crear múltiples usuarios: ${error.message}`);
    }
  }

  async update(id, userData) {
    try {
      return await User.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}

module.exports = new UserService();
