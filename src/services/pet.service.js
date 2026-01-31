const Pet = require('../models/Pet');

class PetService {
  async getAll() {
    try {
      return await Pet.find().populate('owner');
    } catch (error) {
      throw new Error(`Error al obtener mascotas: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      return await Pet.findById(id).populate('owner');
    } catch (error) {
      throw new Error(`Error al obtener mascota: ${error.message}`);
    }
  }

  async create(petData) {
    try {
      const pet = new Pet(petData);
      return await pet.save();
    } catch (error) {
      throw new Error(`Error al crear mascota: ${error.message}`);
    }
  }

  async createMany(petsData) {
    try {
      return await Pet.insertMany(petsData);
    } catch (error) {
      throw new Error(`Error al crear múltiples mascotas: ${error.message}`);
    }
  }

  async update(id, petData) {
    try {
      return await Pet.findByIdAndUpdate(id, petData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar mascota: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await Pet.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar mascota: ${error.message}`);
    }
  }
}

module.exports = new PetService();
