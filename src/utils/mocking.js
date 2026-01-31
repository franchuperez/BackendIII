const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/**
 * Genera usuarios mock con las características especificadas
 * @param {number} count - Número de usuarios a generar
 * @returns {Promise<Array>} Array de usuarios generados
 */
const generateMockUsers = async (count) => {
  const users = [];
  
  // Encriptar la contraseña "coder123" una sola vez para reutilizar
  const hashedPassword = await bcrypt.hash('coder123', 10);
  
  for (let i = 0; i < count; i++) {
    const role = faker.helpers.arrayElement(['user', 'admin']);
    
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: role,
      pets: [] // Array vacío como se especifica
    };
    
    users.push(user);
  }
  
  return users;
};

/**
 * Genera mascotas mock
 * @param {number} count - Número de mascotas a generar
 * @returns {Array} Array de mascotas generadas
 */
const generateMockPets = (count) => {
  const pets = [];
  const species = ['dog', 'cat', 'bird', 'rabbit', 'fish'];
  
  const breedsBySpecies = {
    dog: ['Labrador', 'Golden Retriever', 'Bulldog', 'Beagle', 'Poodle', 'German Shepherd'],
    cat: ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll', 'Bengal', 'British Shorthair'],
    bird: ['Parrot', 'Canary', 'Parakeet', 'Cockatiel', 'Finch', 'Lovebird'],
    rabbit: ['Holland Lop', 'Mini Rex', 'Netherland Dwarf', 'Flemish Giant', 'Lionhead'],
    fish: ['Goldfish', 'Betta', 'Guppy', 'Angelfish', 'Tetra', 'Molly']
  };
  
  for (let i = 0; i < count; i++) {
    const selectedSpecies = faker.helpers.arrayElement(species);
    
    const pet = {
      name: faker.person.firstName(),
      species: selectedSpecies,
      breed: faker.helpers.arrayElement(breedsBySpecies[selectedSpecies]),
      age: faker.number.int({ min: 0, max: 15 }),
      adopted: false
    };
    
    pets.push(pet);
  }
  
  return pets;
};

module.exports = {
  generateMockUsers,
  generateMockPets
};
