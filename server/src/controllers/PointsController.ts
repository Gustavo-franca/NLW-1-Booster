
import { Request, Response} from 'express';
import knex from '../database/connection';

//Create - utilizado quando é um método para criar algo
//Index - utilizado quando for retornar uma listagem
//show - exibir um único registro
//update - 
//delete -

class PointsController {
    async index(request :Request, response : Response){
        const {city, uf,items} = request.query;
 
        const parsedItems =  String(items).split(',').map(item => Number(item.trim()));

        
      const points = await knex('point')
        .join('point_items','point.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id',parsedItems)
        .where('city', String(city))
        .where('uf',String(uf))
        .distinct()
        .select('point.*');

        const serializedPoints = points.map( point=>{
          return{
            ...point,
            image_url : `http://192.168.0.104:3333/uploads/${point.image}`,
          };
        });

        return response.json(serializedPoints);


    }
    async show(request :Request, response :Response){
        const {id} = request.params; //desestruturação

       
       
        const point = await knex('point').where('id', id).first();

      
        const serializedPoint = {
            ...point,
            image_url : `http://192.168.0.104:3333/uploads/${point.image}`,
          };

        const items = await knex('items')
        .join('point_items','items .id', '=', 'point_items.item_id')
        .where('point_items.point_id',id)
        .select('items.title');

    


        if(!point){
            return response.status(400).json({message : 'Point not found.'});
        }

        return response.json({point: serializedPoint,items});

    
    }
    async create(request :Request, response :Response){
        
        const {
          name,
          email,
          whatsapp,
          longitude,
          latitude,
          city,
          uf,
          items
          
        } = request.body  //com o params você recebe os parametros obrigatórios da requisição
      
      const point = {
        image: request.file.filename,
        name,
        email,
        whatsapp,
        longitude,
        latitude,
        city,
        uf,
      }
        
        const trx = await knex.transaction(); //cria uma transação
      
      
        const ids =  await trx('point').insert(point);
        const point_id = ids[0];
      
        const pointItems = items.split(',')
        .map((item : string) => Number(item.trim()))
        .map( (item_id : number) => {
          return {
            item_id,
            point_id
           
        }
        });
        await trx('point_items').insert(pointItems);
      
        await trx.commit(); // da o commit se tudo der certo
      
        //caso não der deve ser dado rolback
      
        const newpoint = {
          id: point_id,
          ... point,
        }
        return response.json(newpoint);
      }
}

export default PointsController;