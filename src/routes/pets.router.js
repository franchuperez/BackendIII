const express = require('express');
const router = express.Router();
const petService = require('../services/pet.service');

/**
 * GET /api/pets
 * Obtiene todas las mascotas de la base de datos
 */
router.get('/', async (req, res) => {
  try {
    const pets = await petService.getAll();
    
    res.status(200).json({
      status: 'success',
      results: pets.length,
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener mascotas',
      error: error.message
    });
  }
});

/**
 * GET /api/pets/:id
 * Obtiene una mascota por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const pet = await petService.getById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({
        status: 'error',
        message: 'Mascota no encontrada'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: pet
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener mascota',
      error: error.message
    });
  }
});

/**
 * POST /api/pets
 * Crea una nueva mascota
 */
router.post('/', async (req, res) => {
  try {
    const newPet = await petService.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: newPet
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear mascota',
      error: error.message
    });
  }
});

module.exports = router;
