const pool = require('../db');

exports.addTicket = async (req, res) => {
    const { motorista, data, hora, veiculoNum, placa, local, descricao, valor_total } = req.body;
    try {
        const newTicket = await pool.query(
            'INSERT INTO multas (motorista, data, hora, veiculoNum, placa, local, descricao, valor_total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [motorista, data, hora, veiculoNum, placa, local, descricao, valor_total]
        );
        res.json(newTicket.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const ticket = await pool.query('SELECT * FROM multas');
        res.json(ticket.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.searchTickets = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await pool.query('SELECT * FROM multas WHERE id = $1', [id]);
        if (ticket.rows.length === 0) {
            return res.status(404).json({ erro: 'Multa não encontrada' });
        }
        res.json(ticket.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const { motorista, data, hora, veiculoNum, placa, local, descricao, valor_total } = req.body;
    try {
        const ticket = await pool.query(
            'UPDATE multas SET motorista = $1, data = $2, hora = $3, veiculoNum = $4, placa = $5, local = $6 descricao = $7, valor_total = $8 WHERE id = $9 RETURNING *',
            [motorista, data, hora, veiculoNum, placa, local, descricao, valor_total, id]
        );
        if (ticket.rows.length === 0) {
            return res.status(404).json({ erro: 'Multa não encontrada'});
        }
        res.json(ticket.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await pool.query('DELETE FROM multas WHERE id = $1 RETURNING *', [id]);
        if (ticket.rows.length === 0) {
            return res.status(404).json({ erro: 'Multa não encontrada' });
        }
        res.status(200).json({
            message: "Cadastro deletado com sucesso",
            multa: ticket.rows[0]});

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

