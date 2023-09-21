require('dotenv').config();
const express = require('express');
const app = express();

const sequelize = require('./src/config/db/db');

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
test();

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'server running properly',
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
