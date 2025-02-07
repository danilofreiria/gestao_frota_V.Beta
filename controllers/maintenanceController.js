const pool = require('../db');

exports.addMaintenance = async (req, res) => {
    const { placa, veiculoNum, motorista, data, hora, manutencao_realizada, oficina, valor_total } = req.body;
    try {
        const newMaintenance = await pool.query(
            'INSERT INTO manutencoes (placa, veiculoNum, motorista, data, hora, manutencao_realizada, oficina, valor_total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [placa, veiculoNum, motorista, data, hora, manutencao_realizada, oficina, valor_total]
        );
        res.json(newMaintenance.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.getMaintenance = async (req, res) => {
    try {
        const maintenance = await pool.query('SELECT * FROM manutencoes');
        res.json(maintenance.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.searchMaintenance = async (req, res) => {
    const { id } = req.params;
    try {
        const maintenance = await pool.query('SELECT * FROM manutencoes WHERE id = $1', [id]);
        if (maintenance.rows.length === 0) {
            return res.status(404).json({ erro: 'Manutenção não encontrada' });
        }
        res.json(maintenance.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.updateMaintenance = async (req, res) => {
    const { id } = req.params;
    const { placa, veiculoNum, motorista, data, hora, manutencao_realizada, oficina, valor_total } = req.body;
    try {
        const maintenance = await pool.query(
            'UPDATE manutencoes SET placa = $1, veiculoNum = $2, motorista = $3, data = $4, hora = $5, manuencao_realizada = $6 oficina = $7, valor_total = $8 WHERE id = $9 RETURNING *',
            [placa, veiculoNum, motorista, data, hora, manutencao_realizada, oficina, valor_total, id]
        );
        if (maintenance.rows.length === 0) {
            return res.status(404).json({ erro: 'Manutenção não encontrada' });
        }
        res.json(maintenance.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.deleteMaintenance = async (req, res) => {
    const { id } = req.params;
    try {
        const maintenance = await pool.query('DELETE FROM manutencoes WHERE id = $1 RETURNING *', [id]);
        if (maintenance.rows.length === 0) {
            return res.status(404).json({ erro: 'Manutenção não encontrada' });
        }
        res.status(200).json({
            message: "Cadastro deletado com sucesso",
            manutenção: maintenance.rows[0]});

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
