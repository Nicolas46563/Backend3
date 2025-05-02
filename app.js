import express from 'express';
import mongoose from 'mongoose';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/passport.js';
import dotenv from 'dotenv';
dotenv.config();

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/session.router.js';
import mocksRouter from './routes/mocks.router.js';
import adoptionRouter from './routes/adoption.router.js';

// Compatibilidad con __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configuración de Handlebars con helper
const hbs = create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        getIndex: (array, index) => (Array.isArray(array) ? array[index] : ''),
    },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(passport.initialize());

// Documentación de APIs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => {
        console.error('Error al conectar a MongoDB:', err.message);
        process.exit(1);
    });

// Rutas de API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api/adoptions', adoptionRouter);

// Rutas de vistas
app.use('/', viewsRouter);

// Manejo de 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

// Servidor
const PORT = process.env.PORT || 8580;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Exportar para SuperTest
export default app;
