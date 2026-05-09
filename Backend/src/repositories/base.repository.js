/*

 * BaseRepository - Clase base para todos los repositories
 * Proporciona métodos CRUD genéricos reutilizables

*/

export class BaseRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async findById(id, options = {}) {
    try {
      if (!id) throw new Error(`${this.Model.modelName} ID is required`);

      let query = this.Model.findById(id);

      if (options.select) query = query.select(options.select);
      if (options.populate) {
        if (Array.isArray(options.populate)) {
          options.populate.forEach(pop => query = query.populate(pop));
        } else {
          query = query.populate(options.populate);
        }
      }

      const doc = await query;
      if (!doc) throw new Error(`${this.Model.modelName} not found`);

      return doc.toObject ? doc.toObject() : doc;
    } catch (error) {
      throw new Error(`Error finding ${this.Model.modelName} by ID: ${error.message}`);
    }
  }

  async findOne(query, options = {}) {
    try {
      if (!query || Object.keys(query).length === 0) {
        throw new Error('Query is required');
      }

      let dbQuery = this.Model.findOne(query);

      if (options.select) dbQuery = dbQuery.select(options.select);
      if (options.populate) {
        if (Array.isArray(options.populate)) {
          options.populate.forEach(pop => dbQuery = dbQuery.populate(pop));
        } else {
          dbQuery = dbQuery.populate(options.populate);
        }
      }

      const doc = await dbQuery;
      if (!doc) throw new Error(`${this.Model.modelName} not found`);

      return doc.toObject ? doc.toObject() : doc;
    } catch (error) {
      throw new Error(`Error finding ${this.Model.modelName}: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      const { query = {}, select = '', populate = null, sort = {} } = options;

      let dbQuery = this.Model.find(query);

      if (select) dbQuery = dbQuery.select(select);
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(pop => dbQuery = dbQuery.populate(pop));
        } else {
          dbQuery = dbQuery.populate(populate);
        }
      }
      if (Object.keys(sort).length > 0) dbQuery = dbQuery.sort(sort);

      const docs = await dbQuery;
      return docs.map(doc => doc.toObject ? doc.toObject() : doc);
    } catch (error) {
      throw new Error(`Error fetching all ${this.Model.modelName}: ${error.message}`);
    }
  }

  async create(data) {
    try {
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Data is required');
      }

      const doc = new this.Model(data);
      const savedDoc = await doc.save();

      return savedDoc.toObject ? savedDoc.toObject() : savedDoc;
    } catch (error) {
      throw new Error(`Error creating ${this.Model.modelName}: ${error.message}`);
    }
  }

  async update(id, data, options = {}) {
    try {
      if (!id) throw new Error(`${this.Model.modelName} ID is required`);
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Update data is required');
      }

      const {
        new: returnNew = true,
        runValidators = true,
        select = '',
        populate = null,
      } = options;

      let query = this.Model.findByIdAndUpdate(id, data, {
        returnDocument: returnNew ? 'after' : 'before',
        runValidators,
      });

      if (select) query = query.select(select);
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(pop => query = query.populate(pop));
        } else {
          query = query.populate(populate);
        }
      }

      const updatedDoc = await query;
      if (!updatedDoc) throw new Error(`${this.Model.modelName} not found`);

      return updatedDoc.toObject ? updatedDoc.toObject() : updatedDoc;
    } catch (error) {
      throw new Error(`Error updating ${this.Model.modelName}: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      if (!id) throw new Error(`${this.Model.modelName} ID is required`);

      const deletedDoc = await this.Model.findByIdAndDelete(id);

      if (!deletedDoc) throw new Error(`${this.Model.modelName} not found`);

      return deletedDoc.toObject ? deletedDoc.toObject() : deletedDoc;
    } catch (error) {
      throw new Error(`Error deleting ${this.Model.modelName}: ${error.message}`);
    }
  }

  async exists(query) {
    try {
      if (!query || Object.keys(query).length === 0) {
        throw new Error('Query is required');
      }

      const doc = await this.Model.findOne(query).lean();
      return !!doc;
    } catch (error) {
      throw new Error(`Error checking ${this.Model.modelName} existence: ${error.message}`);
    }
  }

  async count(query = {}) {
    try {
      const count = await this.Model.countDocuments(query);
      return count;
    } catch (error) {
      throw new Error(`Error counting ${this.Model.modelName}: ${error.message}`);
    }
  }
}
