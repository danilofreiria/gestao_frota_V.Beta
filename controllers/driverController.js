const pool = require('../db');


exports.addDriver = async (req, res) => {
    const { nome, cpf, cnh, validade_cnh, categoria_cnh, telefone } = req.body;
    console.log(req.body);
    try {
        const newDriver = await pool.query(
            'INSERT INTO motoristas (nome, cpf, cnh, validade_cnh, categoria_cnh, telefone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nome, cpf, cnh, validade_cnh, categoria_cnh, telefone]
        );
        res.json(newDriver.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.getDrivers = async (req, res) => {
    try {
        const motoristas = await pool.query('SELECT * FROM motoristas');
        res.json(motoristas.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.searchDriver = async (req, res) => {
    const { id } = req.params;
    try {
        const motorista = await pool.query('SELECT * FROM motoristas WHERE id = $1', [id]);
        if (motorista.rows.length === 0) {
            return res.status(404).json({ erro: 'Motorista não encontrado' });
        }
        res.json(motorista.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.updateDriver = async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, cnh, validade_cnh, categoria_cnh, telefone } = req.body;
    try {
        const motoristaAtualizado = await pool.query(
            'UPDATE motoristas SET nome = $1, cpf = $2, cnh = $3, validade_cnh = $4, categoria_cnh = $5, telefone = $6 WHERE id = $7 RETURNING *',
            [nome, cpf, cnh, validade_cnh, categoria_cnh, telefone, id]
        );
        if (motoristaAtualizado.rows.length === 0) {
            return res.status(404).json({ erro: 'Motorista não encontrado' });
        }
        res.json(motoristaAtualizado.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.deleteDriver = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM motoristas WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ erro: 'Motorista não encontrado' });
        }
        res.status(200).json({
            message: "Cadastro deletado com sucesso",
            motorista: result.rows[0]});

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
