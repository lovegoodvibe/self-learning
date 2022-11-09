'use strict';

module.exports = {


  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Nguyen',
      lastName: 'Rin',
      address: 'HCM',
      gender: 1,
      roleId: 'ROLE',
      positionId: 'R1',

      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
