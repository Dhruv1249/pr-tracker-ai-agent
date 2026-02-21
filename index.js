require('dotenv').config();
const cors = require('cors');
const express = require('express');
const aiRoutes = require('./routes/ai.route');
const riskRoutes = require('./routes/risk.route');
const securityRoutes = require('./routes/security.route');


const app = express();

app.use(cors());
app.use(aiRoutes);
app.use(riskRoutes);
app.use(securityRoutes);


Port = process.env.PORT || 5001;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
