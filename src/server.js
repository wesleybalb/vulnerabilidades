

import express from 'express'
import sql from 'mssql'
import clientRoutes from './routes/clientRoutes.js'
import cors from 'cors'

const port = process.env.PORT
const strConn = process.env.CONNECTION_STRING

const app = express()
//app.use(express.json())

const config = {
    user:'sa',
    password:'0000',
    server:'TPCP14LAB1405\\SQLEXPRESS01',
    database:'loja_virtual',
    port:1433,
    options:{
        trustServerCertificate:false,
        trustedConnection: false,
        enableArithAbort:false,
        encrypt:false,
    }
}
 
import ms from 'msnodesqlv8'

app.get('/teste',async (req,res)=>{
    const connectionString = "Server=TPCP14LAB1405\\SQLEXPRESS01,1433;Database=loja_virtual;User Id=sa;Password=0000;Encrypt=true;Driver={SQL Server Native Client 11.0}";
const query = "SELECT name FROM sys.databases";

ms.query(connectionString, query, (err, rows) => {
    console.log(rows);
});
});

    
app.use(express.json())
app.use(cors())
app.use('/admin',clientRoutes)
app.get('/',(req,res)=>{
    res.status(200).json({server:'ok',port:port})
})

app.listen(port,()=>{
    console.log("Servidor rodando")
})