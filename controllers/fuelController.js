const pool = require('../db');

exports.addFillup = async (req, res) => {
    const { motorista, data, hora, veiculoNum, placa, km_abastecimento, local, valor_total } = req.body;
    try {
        const newFillup = await pool.query(
            'INSERT INTO abastecimentos (motorista, data, hora, veiculoNum, placa, km_abastecimento, local, valor_total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [motorista, data, hora, veiculoNum, placa, km_abastecimento, local, valor_total]
        );
        res.json(newFillup.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.getFillups = async (req, res) => {
    try {
        const fillup = await pool.query('SELECT * FROM abastecimentos');
        res.json(fillup.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.searchfillup = async (req, res) => {
    const { id } = req.params;
    try {
        const fillup = await pool.query('SELECT * FROM abastecimentos WHERE id = $1', [id]);
        if (fillup.rows.length === 0) {
            return res.status(404).json({ erro: 'Abastecimento não encontrado' });
        }
        res.json(fillup.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.updateFillups = async (req, res) => {
    const { id } = req.params;
    const { motorista, data, hora, veiculoNum, placa, km_abastecimento, local, valor_total} = req.body;
    try {
        const updateFillup = await pool.query(
            'UPDATE abastecimentos SET motorista = $1, data = $2, hora = $3, veiculoNum = $4, placa = $5, km_abastecimento = $6 local = $7, valor_total = $8 WHERE id = $9 RETURNING *',
            [motorista, data, hora, veiculoNum, placa, km_abastecimento, local, valor_total,id]
        );
        if (updateFillup.rows.length === 0) {
            return res.status(404).json({ erro: 'Abastecimento não encontrado' });
        }
        res.json(updateFillup.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.deleteFillup = async (req, res) => {
    const { id } = req.params;
    try {
        const fillup = await pool.query('DELETE FROM abastecimentos WHERE id = $1 RETURNING *', [id]);
        if (fillup.rows.length === 0) {
            return res.status(404).json({ erro: 'Abastecimento não encontrado' });
        }
        res.status(200).json({
            message: "Cadastro deletado com sucesso",
            abastecimento: fillup.rows[0]});

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

