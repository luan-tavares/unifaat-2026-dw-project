export async function up(db) {
    await db.query(`
        ALTER TABLE addresses
        ADD COLUMN state VARCHAR(255)
    `)
}
export async function down(db) {
    await db.query(`
        ALTER TABLE addresses
        DROP COLUMN state
    `)
}