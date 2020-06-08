import express from 'express';
import cors from 'cors';
import routes from './routes'; // ./ é acrescentado quando não é um elemento da pasta node
import path from 'path';

import {errors} from 'celebrate';
const app = express();
app.use(cors()) //defini quais origens podem acessar a API
app.use(express.json())//uma configuração que indica ao express para ele entender requisições em formato json
app.use(routes); //habilita o uso do arquivo routes
app.use(errors()) // lida com os erros encontrados com o celebrate 

app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads'))); // cria uma rota para acesso direto





app.listen(3333); //define a porta que estará escutando aquela requisição.

