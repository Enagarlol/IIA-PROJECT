import express from 'express'
import studentRoutes from './src/routes/studentRoutes.js'
import verificarToken from './src/routes/verificarToken.js'
import classroomRoutes from './src/routes/classroom.routes.js'

const app = express()
const port = 8080 || process.env.PORT

app.use(express.json());

// Rutas públicas
app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.use('/api', studentRoutes);

// Rutas protegidas con token JWT
app.use('/api', verificarToken);

app.use('/api', classroomRoutes)

app.listen(port, () => {
  console.log(`Server ready at: http://localhost:${port}`)
})
