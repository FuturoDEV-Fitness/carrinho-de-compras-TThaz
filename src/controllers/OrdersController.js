const Database = require('../database/Database');

class OrdersController extends Database {

    async createOrder(req, res) {
        try {
            const dados = req.body
            const produtosPedidos = dados.products

            if (!dados.address || !dados.client_id || !produtosPedidos) {
                return res.status(400).json({
                    mensagem: "Address, client_id e products são obrigatórios"
                })
            } else if (produtosPedidos.length === 0) {
                return res.status(400).json({
                    mensagem: "Não é possível registrar um pedido sem produtos"
                })

            }    else {
                    let total = 0;

                    for (let i = 0; i < produtosPedidos.length; i++) {
                        const item = produtosPedidos[i];
                        const produtoAtual = await this.database.query(`    
                SELECT price FROM products 
                WHERE id = $1
            `, [item.product_id]);

                        total = total + (produtoAtual.rows[0].price * item.amount);
                    }

                    const order = await this.database.query(`
                    INSERT INTO orders (total, address, observations, client_id)
                    VALUES ($1, $2, $3, $4)
                    returning *
                    `,
                        [total, dados.address, dados.observations, dados.client_id])

                    produtosPedidos.forEach(async item => {
                        const produtoAtualPreco = await this.database.query(`
                        SELECT price from products 
                        where id = $1
                        `, [item.product_id])

                        this.database.query(`
                        INSERT INTO orders_items (amount, price, orders_id, products_id)
                        values ($1,$2,$3,$4)
                        returning *
                        `, [item.amount, produtoAtualPreco.rows[0].price, order.rows[0].id, item.product_id])
                    })


                    res.status(200).json({
                        mensagem: "Cadastrado com sucesso"
                    })
                }
            } catch (error) {
                return res.status(500).json({
                    mensagem: "Não foi possível cadastrar o pedido"
                })
            }

        }
}

module.exports = new OrdersController()