# Desafio nginx - node - mysql - Full Cycle
Desafio com objetivos didáticos onde será criado uma aplicação Node.js que ao ser acessada criará uma nova entrada no banco de dados MySql, além disso deverá imprimir a mensagem "Full Cycle Rocks!!", adicionalmente será apresentado a tabela dos nomes já cadastrados.

## Tecnologias
Node.js
Mysql
Nginx
Phpmyadmin
Docker

## Utilização

### Clone este repositório em sua máquina local:

```shell
git clone git@github.com:paulo-ramos/fullcycle-desafio-nginx-node.git
```

### Navegue até o diretório do projeto:
```shell
cd fullcycle-desafio-nginx-node
```

### Crie arquivo .env contendo as variáveis de ambiente que serão utilizadas pelo docker-compose para criação dos containers.
```
MYSQL_HOST=db 
MYSQL_ROOT_PASSWORD=root_password_super_segura
MYSQL_DATABASE=desafio_node_db
MYSQL_USER=desafio_node_user
MYSQL_PASSWORD=desafio_node_password
```

### Construa a imagem Docker executando o seguinte comando:
```shell
docker-compose up -d --build
```

Aguarde a criação da imagem, após a execução do build, você pode acessar a aplicaçao node através do endereço:

[http://localhost:3001/]([http://localhost:3001/)

Você verá a mensagem "Full Cycle Rocks!!" impressa, uma tabela dos ítens previamente cadastrados e um link "Adicionar novo". Clique no link para adicionar automaticamente novos itens.

Você poderá acessar o banco de dados Mysql através da aplicação phpMyAdmin através do seguinte endereço:
[http://localhost:8080/](http://localhost:8080/)

