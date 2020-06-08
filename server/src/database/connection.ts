import knex from 'knex' //importar o knex
import path from 'path' //path é utilizado para padronizar o uso de diretórios
const connection = knex({
    client: 'sqlite3',// banco utilizado -deve ser instalado o banco
    connection:{
        filename: path.resolve(__dirname,'database.sqlite'), //onde será armazenar o banco de dados
    },
    useNullAsDefault : true,
});

export default connection; //exportar a conexão para uso externo