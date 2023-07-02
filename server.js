// Native Libs
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// External Libs
import 'dotenv/config.js'
import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import connectSessionSequelize from 'connect-session-sequelize';
import helmet from 'helmet';

// Routes
import { homeRoute } from './src/routes/homeRoute.js';
import { authRoute } from './src/routes/authRoute.js';
import { agendaRoute } from './src/routes/agendaRoute.js';
import { userRoute } from './src/routes/userRoute.js';

// Connection DB
import { sequelize } from './src/db/sequelize.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// FAuth with cookies
const SequelizeStore = connectSessionSequelize(session.Store);

const sessionOptions = session({
    secret: process.env.SECRET,
    store: new SequelizeStore({
        db: sequelize,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: parseInt(process.env.SESSION_EX) || 1000 * 60 * 30,
        httpOnly: true
    }
});

const app = express();

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(resolve(__dirname, 'public')));
app.use(sessionOptions);
app.use(flash());

app.set('views', resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

const port = 3001;

// Apply Routes 
app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/agenda', agendaRoute);
app.use('/usuario', userRoute);

// 404
app.use('*', (_, res) => {
    res.render('404');
});

sequelize.authenticate()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor executando em http://localhost:${port}`);
        });
    })
    .catch((err) => console.log(err));