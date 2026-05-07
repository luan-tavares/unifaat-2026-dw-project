import pool from "../../../database/connection.js";

export default class CreateAddressController {
  async handle(req, res) {
    const { name, district, city } = req.body;

    try {
      const result = await pool.query(
        `
          INSERT INTO addresses(name, district, city)
          VALUES($1, $2, $3)
          RETURNING *
        `,
        [name, district, city]
      );

      return res.status(201).json(result.rows[0]);

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao criar endereço"
      });
    }
  }
}