# GoLangToDoList

## How to run BackEnd
 * Run a container using docker:
`sudo docker run -d --name api-todo -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres:13.5 `
 * Run a postgresql using docker:
`sudo docker exec -it api-todo psql -U postgres`

## Into PSQL
### Creating DataBase and User:
 * `create database api_todo;`
 * `create user user_todo;`
 * `alter user user_todo with encrypted password 1234;`

### Creating table:
 * `create table todos (id serial primary key, title varchar, description text, done bool);`
 
### Setting User Privileges:
* `grant all privileges on all tables in schema public to user_todo;`
* `grant all privileges on all sequences in schema public to user_todo;`
* `grant all privileges on database api_todo to user_todo;`

finally> `go run main.go`

## How to run FrontEnd
* `npm run dev`
