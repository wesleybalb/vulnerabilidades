import { getLogLevel } from "@sonar/scan/src/logging.js";
import {
  getVulneravel,
  getAll,
  allClientsWithOrder,
  getById,
  getCount,
  getAllOffset,
  getAllCursor,
  getLogin,
} from "../Repositories/ClientRepository.js";

export async function allClients(req, res) {
  const clientes = await getAll();
  res.json(clientes);
}

export async function vulneravel(req, res) {
  const id = req.params.id || req.query.id
  const clientes = await getVulneravel(id);
  res.json(clientes);
}
export async function login(req, res) {
  const email= req.body.email
  const senha= req.body.senha
  
  const cliente = await getLogin(email,senha);
  
  if (cliente.length>0){
    res.status(200).json({usuario:email,message:'Login efetuado com sucesso'});
  }else{
    res.status(401).json({erro:true,message:'Usuário ou/e senha incorretos'});
  }
  
}

export async function allClientsCursor(req, res) {
  const {cursor} = req.query
  const limit = 10
  const rows = await getCount()
  const data = await getAllCursor(limit+1,parseInt(cursor))
  const next_cursor = data[data.length-1].id
  data.pop()

  res.send({
    cursor:cursor,
    next_cursor:next_cursor,
    data:data
  })
}

export async function allClientsPage(req, res) {
  const {page} = req.query
  if(isNaN(page)){
    res.status(400).json({erro:true,message:'página inválida!'})
    return
  }
  const limit = 10
  const rows = await getCount()
  const offset = (page * limit) - limit
  const pages = Math.ceil(rows/limit)
  const prev_page = page-1>0?page-1:false
  const next_page = parseInt(page)+1>pages?false:parseInt(page)+1
  const data = await getAllOffset(limit,offset)
  res.send({
    limit:limit,
    pages: pages,
    page:parseInt(page),
    prev_page:prev_page,
    next_page:next_page,
    prev_path: `/admin/clientesPage?=${prev_page}`,
    next_path: `/admin/clientesPage?=${next_page}`,
    rows:rows,
    data:data
  })
}




export async function allClientsWithOrders(req, res) {
  const clientes = await allClientsWithOrder();
  res.json(clientes);
}
export async function getClientById(req, res) {
  const id = req.params.id;
  const clientes = await getById(id);
  res.json(clientes);
}
