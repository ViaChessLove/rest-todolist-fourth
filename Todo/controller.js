import Model from './model.js';

class Todo {
  async getAll(_, res) {
    try {
      const todos = await Model.find();

      return res.status(200).json(todos);
    } catch (e) {
      return res.status(500).json(e);
    }
  };

  async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'No id' });
      }

      const todo = await Model
        .findOne({ _id: id });

      return res.status(200).json(todo);

    } catch (e) {
      if (e.name === 'CastError') {
        return res.status(404).json({ message: 'Not found' });
      }

      return res.status(500).json(e);
    }
  };

  async addTodo(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: 'empty body' });
      }

      const {
        completed,
        title,
        content,
      } = req.body;

      if ((!completed && completed !== false) || !title) {
        return res.status(400).json({ message: 'empty required fields' });
      }

      const requestData = {
        completed,
        title,
        content,
        date: new Date(),
      };

      const todo = await Model.create(requestData);

      return res.status(200).json(todo);
    } catch (e) {
      return res.status(500).json(e);
    }
  };

  async updateTodo(req, res) {
    try {
      const { id } = req.params;

      const todo = req.body;

      if (!id) {
        res.status(400).json({ message: 'No id' });
      }

      if (!todo) {
        res.status(400).json({ message: 'Empty body' });
      }

      await Model.findOneAndUpdate(
        { _id: id },
        { ...todo },
        { new: true },
      );

      return res.status(200);
    } catch (e) {
      if (e.name === 'CastError') {
        return res.status(404).json({ message: 'Not found' });
      }

      return res.status(500).json(e);
    }
  }

  async removeTodo(req, res) {
    try {
      const { id } = req.params;

      await Model.findByIdAndDelete(id);

      return res.status(200);
    } catch (e) {
      if (e.name === 'CastError') {
        return res.status(404).json({ message: 'Not found' });
      }

      return res.status(500).json(e);
    }
  }
};

export default new Todo();