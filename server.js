import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

// Routes
import { homeRoute } from './src/routes/homeRoute.js'

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(resolve(__dirname, 'public')));

app.set('views', resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

const port = 3000;

// Home (Tela Inicial)
app.use('/', homeRoute);

app.listen(port, () => {
    console.log(`Servidor executando em http://localhost:${3000}`);
});