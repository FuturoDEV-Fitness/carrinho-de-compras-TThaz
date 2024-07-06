const Database = require('../database/Database');

class ProductsController extends Database {

    async createProduct(req, res) {
        try {
            const dados = req.body

            if (!dados.name || !dados.category_id || !dados.price) {
                return res.status(400).json({
                    mensagem: "Name, Price e Category_Id são obrigatórios!"
                })
            }

            const product = await this.database.query(`
            INSERT INTO products
            (name, amount, color, voltage, description, category_id, price)
            values
            ($1, $2, $3, $4, $5, $6, $7)
            returning *
        `, [dados.name, dados.amount, dados.color, dados.voltage, dados.description, dados.category_id, dados.price])
            res.status(201).json(product.rows[0])
        }

        catch (error) {
            return res.status(500).json({ mensagem: "Não foi possível cadastrar o produto" })
        }
    }

    async listProducts(req, res) {
        try {
            const allProducts = await this.database.query(`
                SELECT * FROM products
            `)
            res.status(200).json(allProducts.rows)
        }
        catch (error) {
            return res.status(500).json({
                mensagem: "Não foi possível completar a solicitação"
            })
        }
    }

    async listSingleProducts(req, res) {
        try {
            const id = req.params.id
            const allProducts = await this.database.query(`
                select  
                    p.id as idProduto,
                    p.name as nomeProduto,
                    p.description as descriçao,
                    c.name as categoria,
                    p.price as preco,
                    p.amount as quantidade
                from   
                    products p
                inner join 
                    categories c
                on 
                p.category_id = c.id
                where p.id = $1
            `, [id])

            if (allProducts.rowCount === 0) {
                return res.status(404).json({ mensagem: "Nenhum produto com esse ID cadastrado" })
            }

            res.status(200).json(allProducts.rows)

        }
        catch (error) {
            return res.status(500).json({
                mensagem: "Não foi possível completar a solicitação"
            })
        }
    }
}

module.exports = new ProductsController