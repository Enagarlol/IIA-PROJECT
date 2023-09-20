import express from 'express'
import studentRoutes from './routes/studentRoutes.js'
import verificarToken from './routes/verificarToken.js'

const app = express()

app.use(express.json());

// Rutas públicas
app.use('/api', studentRoutes);

// Rutas protegidas con token JWT
app.use('/api', verificarToken);

app.listen(3000, () => 
  console.log('Server ready at: http://localhost:3000')
);