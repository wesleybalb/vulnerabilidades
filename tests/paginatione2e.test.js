import { describe, test, assert } from "poku";

describe('TESTE DA PAGINAÇÃO',{background:'blue',icon:'😒'})

await test('Pagina válida de clientes',async ()=>{
    const url = `http://localhost:3000/admin/clientesPage?page=1`
    const resp = await fetch(url)
    assert.strictEqual(resp.status,200,"response status 200")
    const data = await resp.json()
    assert.strictEqual(data.data.length,10,"Trouxe 10 registros")
})
await test('Pagina inválida de clientes',async ()=>{
    const url = `http://localhost:3000/admin/clientesPage?page=a`
    const resp = await fetch(url)
    assert.strictEqual(resp.status,400,"response status 400")
    const data = await resp.json()
    assert.deepStrictEqual(data,{erro:true,message:'página inválida!'},"erro retornado com sucesso")
})
