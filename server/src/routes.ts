import express, { request } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import {celebrate, Joi} from 'celebrate'

const routes = express.Router();//desacopla as rotas do arquivo server para poder se utilizada em outro arquivo

const upload = multer(multerConfig);



const pointsController = new PointsController;
const itemsController = new ItemsController;


routes.get('/items',itemsController.index);


routes.get('/points/:id',pointsController.show);
routes.get('/points/',pointsController.index);

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body : Joi.object().keys({
            name: Joi.string().required(),
            email:Joi.string().required().email(),
            whatsapp : Joi.number().required(),
            latitude : Joi.number().required(),
            longitude : Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })

    },{
        abortEarly: false,
    }),
    pointsController.create);

export default routes; //esporta a váriavel para poder se utilizada em outros locais através de importação