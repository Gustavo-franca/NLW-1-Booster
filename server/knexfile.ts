
import path from 'path';

module.exports = {
    client: 'sqlite3',// banco utilizado -deve ser instalado o banco
    connection:{
        filename: path.resolve(__dirname,'src','database','database.sqlite'), //onde será armazenar o banco de dados
    },
    migrations:{
        directory: path.resolve(__dirname,'src','database','migrations'), //onde será as migrations
    },
    seeds:{
        directory: path.resolve(__dirname,'src','database','seeds'), //onde será as migrations
    },
    useNullAsDefault : true, // no sqlite não aceita valores default com esse comando seta null como padrão

};