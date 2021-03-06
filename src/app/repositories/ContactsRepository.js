const db = require('../../database/index');

// ARRAY MOCK - EXEMPLO
// const { v4 } = require('uuid');
// let contacts = [
//   {
//     id: v4(),
//     name: 'Italo',
//     email: 'italo@mail.com',
//     phone: '1919191',
//     category_id: v4(),
//   },
//   {
//     id: v4(),
//     name: 'Mateus',
//     email: 'mateus@mail.com',
//     phone: '2947488',
//     category_id: v4(),
//   },
// ];

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'; // Prevenir SQL INJECTION
    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.email = $1
    `, [email]);
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    // Os símbolos de dolar são os Bindings do Postgres (previnir SQL Injection)
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `, [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
     `, [name, email, phone, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ContactsRepository();
