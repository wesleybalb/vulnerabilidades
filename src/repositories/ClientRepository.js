import sql from 'mssql'
import { connection } from "../database/connection.js";


export async function getAll(){
    try{
        const sql = `select * from cliente`
        const [rows, fields] = await connection.query(sql)
        return rows
    }catch(e){
        return e
    }
}
export async function getVulneravel(id){
    try{
        const sql = `select * from cliente where id=${id};`
        const [rows, fields] = await connection.query(sql)
        return rows
    }catch(e){
        return e
    }
}
export async function getLogin(email,senha){
    try{
        const sql = `select * from cliente where email='${email}' and senha = '${senha}';`
        const [rows, fields] = await connection.query(sql)
        return rows
    }catch(e){
        return e
    }
}
//por cursor
export async function getAllCursor(limit, cursor){
    try{
        const sql = `select * from cliente
                    where id>=?
                    order by id
                    limit ?; `
        const [rows, fields] = await connection.query(sql,[cursor,limit])
        return rows
    }catch(e){
        return e
    }
}
//paginação
export async function getAllOffset(limit, offset){
    try{
        const sql = `select * from cliente
                    order by id
                    limit ? 
                    offset ?;`
        const [rows, fields] = await connection.query(sql,[limit,offset])
        return rows
    }catch(e){
        return e
    }
}
//pegar quantidade de registros
export async function getCount(){
    try{
        const sql = `select count(*) as count from cliente;`
        const [rows, fields] = await connection.query(sql)
        return rows[0].count
    }catch(e){
        return e
    }
}


//CONSULTAS QUE EVITAM N+1 COM DBSERVER E COM BACKEND (CUSTO: PROCESSAMENTO SERVIDOR NODE)

//Cliente com pedidos por id
export async function getById(id){
    const sql = 'select c.id as id_cliente, c.nome, c.email,p.id as id_pedido, data_pedido, total,forma_pagamento, status_pagamento from cliente as c inner join pedido as p on c.id = p.id_cliente where c.id=?'
    const [rows, fields] = await connection.query(sql,[id])

    const cliente = {
        id_cliente: rows[0].id_cliente,
        nome: rows[0].nome,
        email: rows[0].email,
        pedidos: rows.map(ped=>{
            return {
                id_pedido: ped.id_pedido,
                data_pedido: ped.data_pedido,
                total:ped.total,
                forma_pagamento:ped.forma_pagamento, 
                status_pagamento:ped.status_pagamento
                }
        })
    }
   return cliente

}
//clientes com pedidos
export async function allClientsWithOrder(){

    
    const sql='select c.id as id_cliente, c.nome, c.email,p.id as id_pedido, data_pedido, total,forma_pagamento, status_pagamento from cliente as c inner join pedido as p on c.id = p.id_cliente'
    const [rows, fields] = await connection.query(sql)
    const unicos = new Map()
    rows.forEach((d)=>{
        if(!unicos.has(d.id_cliente)){
            unicos.set(d.id_cliente,
                {
                    id_cliente: d.id_cliente,
                    nome: d.nome,
                    email: d.email
                }
            )
        }
    })
    const clientes = [...unicos.values()]
    const clientesComPedidos = clientes.map(d=>{
        const pedidos = rows.filter(p=>p.id_cliente == d.id_cliente)
        const pedFormat = pedidos.map(ped=>{
            return {
                 id_pedido: ped.id_pedido,
                 data_pedido: ped.data_pedido,
                 total:ped.total,
                 forma_pagamento:ped.forma_pagamento, 
                 status_pagamento:ped.status_pagamento
                }
        })
        return {...d,pedidos:pedFormat}
    })
   return clientesComPedidos
}