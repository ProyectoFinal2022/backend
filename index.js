require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./src/db/db.connection')

const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const publicRoutes = require('./src/routes/public.routes');

const app = express();
dbConnect();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(authRoutes);
app.use(publicRoutes);

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
