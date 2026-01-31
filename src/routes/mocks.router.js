const express = require('express');
const router = express.Router();
const { generateMockUsers, generateMockPets } = require('../utils/mocking');
const userService = require('../services/user.service');
const petService = require('../services/pet.service');

/**
 * GET /api/mocks/mockingpets
 * Endpoint migrado del primer desafío
 * Genera mascotas mock sin insertarlas en la base de datos
 */
router.get('/mockingpets', (req, res) => {
  try {
    const count = parseInt(req.query.count) || 50;
    const mockPets = generateMockPets(count);
    
    res.status(200).json({
      status: 'success',
      message: `${count} mascotas mock generadas`,
      data: mockPets
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al generar mascotas mock',
      error: error.message
    });
  }
});

/**
 * GET /api/mocks/mockingusers
 * Genera 50 usuarios mock con el formato de MongoDB
 * - Contraseña encriptada: "coder123"
 * - Role: "user" o "admin"
 * - Pets: array vacío
 */
router.get('/mockingusers', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 50;
    const mockUsers = await generateMockUsers(count);
    
    res.status(200).json({
      status: 'success',
      message: `${count} usuarios mock generados`,
      data: mockUsers
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al generar usuarios mock',
      error: error.message
    });
  }
});

/**
 * POST /api/mocks/generateData
 * Genera e inserta en la base de datos usuarios y mascotas
 * Body esperado: { users: number, pets: number }
 */
router.post('/generateData', async (req, res) => {
  try {
    const { users, pets } = req.body;
    
    // Validación de parámetros
    if (!users && !pets) {
      return res.status(400).json({
        status: 'error',
        message: 'Debe proporcionar al menos un parámetro: users o pets'
      });
    }

    const usersCount = parseInt(users) || 0;
    const petsCount = parseInt(pets) || 0;

    if (usersCount < 0 || petsCount < 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Los valores deben ser números positivos'
      });
    }

    const result = {
      usersInserted: 0,
      petsInserted: 0,
      users: [],
      pets: []
    };

    // Generar e insertar usuarios
    if (usersCount > 0) {
      const mockUsers = await generateMockUsers(usersCount);
      const insertedUsers = await userService.createMany(mockUsers);
      result.usersInserted = insertedUsers.length;
      result.users = insertedUsers;
    }

    // Generar e insertar mascotas
    if (petsCount > 0) {
      const mockPets = generateMockPets(petsCount);
      const insertedPets = await petService.createMany(mockPets);
      result.petsInserted = insertedPets.length;
      result.pets = insertedPets;
    }

    res.status(201).json({
      status: 'success',
      message: `Datos generados e insertados correctamente`,
      data: {
        summary: {
          usersInserted: result.usersInserted,
          petsInserted: result.petsInserted
        },
        users: result.users,
        pets: result.pets
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al generar e insertar datos',
      error: error.message
    });
  }
});

module.exports = router;
