const { Todo, User } = require('../models')

class TodoController {
    static getTodos (req, res, next) {
        Todo.findAll({
            where: {
                UserId: req.user.id
            }
        })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                next(err)
            })
    }

    static postTodos (req, res, next) {
        const { title, description, due_date } = req.body
        const UserId = req.user.id
        const status = false

        Todo.create({
            title,
            description,
            due_date,
            status,
            UserId
        })
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(err => {
                next(err)
            })
    }

    static getCurrentTodos (req, res, next) {
        const id = +req.params.id
        Todo.findByPk(id)
            .then(currentTodo => {
                if (!currentTodo) {
                    next({ name: "ResourceNotFound" })
                }
                else {
                    res.status(200).json(currentTodo)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static putUpdateTodos (req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo.findByPk(+req.params.id)
            .then(currentTodo => {
                return currentTodo.update({
                    title,
                    description,
                    status,
                    due_date
                })
            })
            .then(updatedTodo => {
                res.status(200).json(updatedTodo)
            })
            .catch(err => {
                next(err)
            })
    }

    static patchUpdateTodos (req, res, next) {
        const { status } = req.body
        Todo.findByPk(+req.params.id)
            .then(currentTodo => {
                return currentTodo.update({
                    status
                })
            })
            .then(updatedTodo => {
                res.status(200).json(updatedTodo)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTodos (req, res, next) {
        Todo.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(result => {
                if (result === 1) {
                    res.status(200).json({ message: "Todo successfully deleted." })
                }
                else {
                    next({ name: "ResourceNotFound" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = TodoController
