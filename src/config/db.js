const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

db.$connect()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error(' Failed to connect to the database:', err);
  });

module.exports = db;