import { Router } from "express";
import { allClients,allClientsCursor,allClientsPage,allClientsWithOrders, getClientById, vulneravel,login} from "../controllers/ClientController.js";


const clientRoutes = Router()
clientRoutes.get('/clientes',allClients)
clientRoutes.get('/clientesComPedidos',allClientsWithOrders)
clientRoutes.get('/clientes/:id',getClientById)

clientRoutes.get('/clientesPage',allClientsPage)
clientRoutes.get('/clientesCursor',allClientsCursor)

clientRoutes.get('/clientes/teste/:id',vulneravel)
clientRoutes.post('/login', login)


export default clientRoutes