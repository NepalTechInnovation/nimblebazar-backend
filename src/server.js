require('dotenv').config(); 
const app = require('./app');

const PORT = process.env.PORT || 5503;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});