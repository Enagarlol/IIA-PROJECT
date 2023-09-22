import express from 'express';
import studentRoutes from './src/routes/student.routes.js';
import classroomRoutes from './src/routes/classroom.routes.js';
import rolesRoutes from './src/routes/roles.routes.js';
import scheduleRoutes from './src/routes/courseSchedule.routes.js';
import courseRoutes from './src/routes/course.routes.js';
import listCourseRoutes from './src/routes/listCourse.routes.js';
import paymentMethodRoutes from './src/routes/paymentMethod.routes.js';
import paymentHistoryRoutes from './src/routes/paymentHistory.routes.js';

const app = express();
const port = 8080 || process.env.PORT;

app.use(express.json());

// Rutas públicas
app.get('/', (req, res) => {
  res.send('Hola Mundo')
});

app.use('/api', studentRoutes);
app.use('/api', classroomRoutes);
app.use('/api', rolesRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', courseRoutes);
app.use('/api', listCourseRoutes);
app.use('/api', paymentMethodRoutes);
app.use('/api', paymentHistoryRoutes);

app.listen(port, () => {
  console.log(`Server ready at: http://localhost:${port}`)
});