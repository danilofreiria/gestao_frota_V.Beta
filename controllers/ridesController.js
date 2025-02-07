const pool = require('../db');

exports.addRide = async (req, res) => {
    const { placa, modelo, ano, cor, veiculoNum } = req.body;
    try {
        const novoVeiculo = await pool.query(
            'INSERT INTO veiculos (placa, modelo, ano, cor, veiculoNum) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [placa, modelo, ano, cor, veiculoNum]
        );
        res.json(novoVeiculo.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.getRides = async (req, res) => {
    try {
        const veiculos = await pool.query('SELECT * FROM veiculos');
        res.json(veiculos.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.searchRide = async (req, res) => {
    const { id } = req.params;
    try {
        const veiculo = await pool.query('SELECT * FROM veiculos WHERE id = $1', [id]);
        if (veiculo.rows.length === 0) {
            return res.status(404).json({ erro: 'Veículo não encontrado' });
        }
        res.json(veiculo.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.updateRide = async (req, res) => {
    const { id } = req.params;
    const { placa, modelo, ano, cor, veiculoNum } = req.body;
    try {
        const veiculoAtualizado = await pool.query(
            'UPDATE veiculos SET placa = $1, modelo = $2, ano = $3, cor = $4, veiculoNum = $5 WHERE id = $6 RETURNING *',
            [placa, modelo, ano, cor, veiculoNum, id]
        );
        res.json(veiculoAtualizado.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.deleteRide = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM veiculos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ erro: 'Veículo não encontrado' });
        }
        res.status(200).json({
            message: "Cadastro deletado com sucesso",
            veículo: result.rows[0]});

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
