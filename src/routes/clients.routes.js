const { Router } = require('express');
const ClientsController = require('../controllers/ClientsController');
const clientsRoutes = new Router()

clientsRoutes.post('/', ClientsController.createClient.bind(ClientsController))

module.exports = clientsRoutes