const debug = require('debug')('tmm:dataMapper:core');
const client = require('../helpers/client');

class CoreDatamapper {
  /**
     * Fetch all data from desired table
     * @returns {array} array of entries
     */
  async getAll() {
    debug(`${this.constructor.name} findAll`);
    const dataSource = this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${dataSource}" ORDER BY "id"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  /**
   * fetch an entry according to its id
   *
   * @param {number} id - id of the entry
   * @returns an entry
   */
  async getOne(id) {
    debug(`${this.constructor.name} findByPk(${id})`);
    const dataSource = this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${dataSource}" WHERE id=$1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * create a new entry
   *
   * @param {Object} obj - the entry to create
   * @returns {Object} the created entry
   */
  async createOne(createObj) {
    debug(`${this.constructor.name} create`);
    const results = await client.query(`SELECT * FROM ${this.constructor.insertFunc}('${JSON.stringify(createObj)}')`);
    return results.rows[0];
  }

  /**
   * update an entry
   *
   * @param {number} id - the entry id
   * @param {Object} obj - object containing the mods and the id of the entry
   * @returns {Object} the modified entry
   */

  async update(updateObject) {
    debug(`${this.constructor.name} update(${updateObject.id})`);
    const results = await client.query(`SELECT * FROM ${this.constructor.updateFunc}('${JSON.stringify(updateObject)}')`);
    return results.rows[0];
  }

  /**
   * remove an entry
   *
   * @param {number} id - the entry id
   */
  async delete(id) {
    debug(`${this.constructor.name} delete(${id})`);
    const preparedQuery = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id=$1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rowCount;
  }
}

module.exports = CoreDatamapper;