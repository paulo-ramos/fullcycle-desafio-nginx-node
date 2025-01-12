const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3001;

const config = { 
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE 
};

const pool = mysql.createPool(config);

// Função para criar a tabela se não existir
const createTable = () => {
  const dml = `CREATE TABLE IF NOT EXISTS people(
    id int not null auto_increment,
    name varchar(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key(id)
  )`;
  pool.query(dml, function(err, results) {
    if (err) throw err;
    console.log('Tabela criada com sucesso ou já existia!');
  });
};

// Função para gerar nomes aleatórios
const generateRandomName = () => {
  const names = [ 'Adriana', 'Afonso', 'Alice', 'Amanda', 'André', 'Angela', 'Antônio', 
                  'Ariadne', 'Artur', 'Aurora', 'Bárbara', 'Beatriz', 'Bernardo', 'Bianca', 
                  'Bruno', 'Caio', 'Camila', 'Carlos', 'Carmen', 'Catarina', 'Cecília', 'Clara', 
                  'Claudio', 'Cristina', 'Daniel', 'Danielle', 'David', 'Denise', 'Diego', 'Diogo', 
                  'Eduardo', 'Elisa', 'Eloísa', 'Enzo', 'Erick', 'Esther', 'Fernanda', 'Felipe', 
                  'Fernando', 'Flávia', 'Fábio', 'Gabriel', 'Gabriela', 'Giovanna', 'Guilherme', 
                  'Gustavo', 'Helena', 'Henrique', 'Hugo', 'Isabela', 'Isadora', 'Ítalo', 'Joana', 
                  'Joaquim', 'Jorge', 'José', 'Julia', 'Juliana', 'Larissa', 'Laura', 'Leonardo', 
                  'Letícia', 'Lívia', 'Lucas', 'Luiza', 'Luna', 'Manuela', 'Marcos', 'Mariana', 'Matheus', 
                  'Melissa', 'Miguel', 'Murilo', 'Nicole', 'Nina', 'Otávio', 'Paula', 'Pedro', 'Pietro', 
                  'Rafael', 'Rafaela', 'Renata', 'Ricardo', 'Rodrigo', 'Sofia', 'Sônia', 'Stella', 'Suzana', 
                  'Thiago', 'Valentina', 'Vera', 'Vicente', 'Vinícius', 'Vitória', 'Yasmin'
                ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

// Função para inserir dados na tabela
const insertData = () => {
  const name = generateRandomName();
  const sql = `INSERT INTO people(name) values('${name}')`;
  pool.query(sql, function(err, results) {
    if (err) throw err;
    console.log(`Dados inseridos com sucesso: ${name}`);
  });
};

// Função para ler dados da tabela
const getData = (callback) => {
  const query = 'SELECT id, name, createdAt FROM people';
  pool.query(query, (err, results) => {
    if (err) return callback(err);
    let html = '<table border="1"><tr><th>ID</th><th>Name</th><th>Created At</th></tr>';
    results.forEach(row => {
      html += `<tr>
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.createdAt}</td>
      </tr>`;
    });
    html += '</table>';
    callback(null, html);
  });
};

// Inicializando a tabela e inserindo dados uma vez
createTable();

app.get('/', (req, res) => {
  insertData();
  getData((err, html) => {
    if (err) throw err;
    res.send('<h1>Full Cycle Rocks!</h1>' + '<br>' + html + '<br>' + '<a href="/">Adicionar novo</a>');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
