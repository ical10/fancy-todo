const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authorize } = require('../middlewares/auth')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.postTodos)
router.get('/:id', TodoController.getCurrentTodos)

router.put('/:id', authorize, TodoController.putUpdateTodos)
router.patch('/:id', authorize, TodoController.patchUpdateTodos)
router.delete('/:id', authorize, TodoController.deleteTodos)

module.exports = router
