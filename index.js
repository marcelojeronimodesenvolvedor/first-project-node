/*
-Query params => meusite.com/users?name=marcelo&age=38 // Filtros 
-Route params => /users/2   // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
-Request Body => {"name": "Marcelo", "age": 38}

-Get      => Buscar informação no Back - End
-Post     => Criar informação no Back - End
-Put/Patch=> Deletar informação no Back- End
-Delete   => Deletar informação no Back -End

-Middleare => INTERCEPTADOR => Ter o poder de parar ou alterar dados da requisição
*/

const { request } = require('express')
const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const users = []

app.get('/users', (request, response) => {

    //  const { name, age } = request.query// Destructuring assignment name padrão


    return response.json(users)
})

app.post('/users', (request, response) => {

    const { name, age } = request.body


    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', (request, response) => {

    const { id } = request.params
    const { name, age } = request.body
    const updateUser = { id, name, age }

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not Found" })

    }

    users[index] = updateUser

    return response.json(updateUser)
   
})

app.delete('/users/:id', (request, response) => {

    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not Found" })

    }
    users.splice(index,1)

    return response.status(204).json()


})

app.listen(3000, () => {
    console.log(`🚀 Server started on port ${port}`)

})