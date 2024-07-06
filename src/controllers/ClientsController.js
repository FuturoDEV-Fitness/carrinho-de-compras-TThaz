const Database = require('../database/Database');

class ClientController extends Database{

    async createClient(req, res) {
        try {
            const dados = req.body

            if (!dados.name || !dados.email || !dados.cpf || !dados.contact) {
                return res.status(400).json({
                    mensagem: "Name, Email, CPF e Contact são obrigatórios!"
                })
            }

            const registeredClients = await this.database.query(`
                SELECT email, cpf FROM clients
            `)  

            if(registeredClients.email === dados.email || registeredClients.cpf === dados.cpf){
                return res.status(404).json({
                    mensagem: "Já existe um usuario cadastrado com esse CPF/Email"
                })
            }

            const client = await this.database.query(`
            INSERT INTO clients
            (name, email, cpf, contact)
            values
            ($1, $2, $3, $4)
            returning *
        `, [dados.name, dados.email, dados.cpf, dados.contact])


            res.status(201).json(client.rows[0])
        }

        catch (error) {
            return res.status(500).json({ mensagem: "Não foi possível cadastrar o cliente" })
        }
    }
}

module.exports = new ClientController()