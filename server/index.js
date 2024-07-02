require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./apiRoutes');
const staticFiles = require('./staticFiles');
// const sequelize = require('./js/sequelizeIndex')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Mounting routes
app.use('/api', apiRoutes);
app.use('/', staticFiles);
app.use('/create', staticFiles)
app.use('/create/:id', staticFiles)
app.use('/update', staticFiles)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


