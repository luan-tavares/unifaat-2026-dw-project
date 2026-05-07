import pool from "../../../database/connection.js";

export default class UpdateAddressController {
  async handle(req, res) {
    const { id } = req.params;
    const { name, district, city } = req.body;

    try {
      const result = await pool.query(
        `
          UPDATE addresses
          SET
            name = $1,
            district = $2,
            city = $3
          WHERE id = $4
          RETURNING *
        `,
        [name, district, city, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "Endereço não encontrado"
        });
      }

      return res.status(200).json(result.rows[0]);

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar endereço"
      });
    }
  }
}