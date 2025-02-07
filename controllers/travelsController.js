const pool = require('../db');

exports.addTravel = async (req, res) => {
    const { origem, destino, motorista_id, veiculo_id, km_ida, km_retorno } = req.body;
    try {
        const newTravel = await pool.query(
            'INSERT INTO viagens (origem, destino, motorista_id, veiculo_id, km_ida, km_retorno) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [origem, destino, motorista_id, veiculo_id, km_ida, km_retorno]
        );
        res.json(newTravel.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.getTravels = async (req, res) => {
    try {
        const travel = await pool.query('SELECT * FROM viagens');
        res.json(travel.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.searchTravel = async (req, res) => {
    const { id } = req.params;
    try {
        const travel = await pool.query('SELECT * FROM viagens WHERE id = $1', [id]);
        if (travel.rows.length === 0) {
            return res.status(404).json({ erro: 'Viagem não encontrada' });
        }
        res.json(travel.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.updateTravel = async (req, res) => {
    const { id } = req.params;
    const { origem, destino, motorista_id, veiculo_id, km_ida, km_retorno } = req.body;
    try {
        const updateFillup = await pool.query(
            'UPDATE viagens SET origem = $1, destino = $2, motorista_id = $3, veiculo_id = $4, km_ida = $5, km_retorno = $6 WHERE id = $7 RETURNING *',
            [origem, destino, motorista_id, veiculo_id, km_ida, km_retorno,id]
        );
        if (updateFillup.rows.length === 0) {
            return res.status(404).json({ erro: 'Viagem não encontrada'});
        }
        res.json(updateFillup.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.deleteTravel = async (req, res) => {
    const { id } = req.params;
    try {
        const travel = await pool.query('DELETE FROM viagens WHERE id = $1 RETURNING *', [id]);
        if (travel.rows.length === 0) {
            return res.status(404).json({ erro: 'Viagem não encontrada' });
        }
        res.status(200).json({
            message: "Cadastro deletado com sucesso",
            viagem: travel.rows[0]});

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
