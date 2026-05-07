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