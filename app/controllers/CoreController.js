const debug = require('debug')('TAT:controllers:core');

const path = require('path');

const jwt = require('jsonwebtoken');

/** Abstract core controller class. */
class CoreController {
  /**
   * responds with all entries from a table
   *
   * @param {Object} _
   * @param {Object} response
   */
  async getAll(_, response) {
    debug(`${this.constructor.name} getAll`, this.constructor.dataMapper.constructor.tableName);
    console.log("je suis " + this.constructor.dataMapper);
    const results = await this.constructor.dataMapper.getAll();
    //const responseObject = { status: 'success', data: { } };
    //responseObject.data[this.constructor.dataName.many] = results;
    response.json(results);
  }

  /**
   * responds with one entry from a table
   *
   * @param {Object} request
   * @param {Object} response
   */
  async getOne(request, response) {
    debug(`${this.constructor.name} getOne`);
    const { id } = request.params;
    const result = await this.constructor.dataMapper.getOne(id);
    if (!result) {
      throw new UnprocessableEntityError();
    }
    const responseObject = { status: 'success', data: { } };
    responseObject.data[this.constructor.dataName.one] = result;
    return response.json(responseObject);
  }

  /**
   * create one entry in a table
   *
   * @param {Object} request
   * @param {Object} response
   */
  async createOne(request, response) {
    debug(`${this.constructor.name} create`);

    if(process.env.NODE_ENV === "development"){
      request.body.document = `http://localhost:3000/${request.body.document}`
    }
    if(process.env.NODE_ENV === "production"){
      request.body.document = path.join(__dirname,`../../public/${request.body.document}`)
      console.log(request.body.document) 
      const result = await this.constructor.dataMapper.createOne(request.body);
      const responseObject = { status: 'success', data: { } };
      responseObject.data[this.constructor.dataName.one] = result;

    }
    response.json(result);
  }

  /**
   * modify one entry in a table
   *
   * @param {Object} request
   * @param {Object} response
   */
  async patchOne(request, response) {
    debug(`${this.constructor.name} modify`);
    request.body.id = request.params.id;
    const result = await this.constructor.dataMapper.modify(request.body);
    if (!result) {
      throw new UnprocessableEntityError();
    }
    const responseObject = { status: 'success', data: { } };
    responseObject.data[this.constructor.dataName.one] = result;
    response.json(responseObject);
  }

  /**
   * remove one entry in a table
   *
   * @param {Object} request
   * @param {Object} response
   */
  async deleteOne(request, response) {
    debug(`${this.constructor.name} delete`);
    const { id } = request.params;
    const deleteCount = await this.constructor.dataMapper.delete(id);
    if (!deleteCount) {
      throw new UnprocessableEntityError();
    }
    response.json({ status: 'success', data: null });
  }
}

module.exports = CoreController;