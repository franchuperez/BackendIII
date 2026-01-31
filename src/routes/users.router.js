const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

/**
 * GET /api/users
 * Obtiene todos los usuarios de la base de datos
 */
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAll();
    
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
});

/**
 * GET /api/users/:id
 * Obtiene un usuario por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener usuario',
      error: error.message
    });
  }
});

/**
 * POST /api/users
 * Crea un nuevo usuario
 */
router.post('/', async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear usuario',
      error: error.message
    });
  }
});

module.exports = router;
