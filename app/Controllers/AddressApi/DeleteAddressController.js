import pool from "../../../database/connection.js";

export default class DeleteAddressController {
  async handle(req, res) {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "DELETE FROM addresses WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "Endereço não encontrado"
        });
      }

      return res.status(200).json({
        message: "Endereço deletado com sucesso"
      });

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao deletar endereço"
      });
    }
  }
}