import pool from "../../../database/connection.js";

export default class GetAddressController {
  async handle(req, res) {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "SELECT * FROM addresses WHERE id = $1",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "Endereço não encontrado"
        });
      }

      return res.status(200).json(result.rows[0]);

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar endereço"
      });
    }
  }
}
import postgres from '../../../database/connections/postgres.js';

export default async function GetAddressController(request, response) {
    try {
        const { id } = request.params;
        const result = await postgres.query('SELECT * FROM addresses WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'Address not found' });
        }

        return response.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}
