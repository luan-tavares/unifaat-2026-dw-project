import pool from "../../../database/connection.js";

export default class ListAddressController {
  async handle(req, res) {
    try {
      const result = await pool.query(
        "SELECT * FROM addresses ORDER BY id ASC"
      );

      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao listar endereços"
      });
    }
  }
}
import postgres from '../../../database/connections/postgres.js';

export default async function ListAddressController(request, response) {
    try {
        const result = await postgres.query('SELECT * FROM addresses');
        return response.json(result.rows);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}
