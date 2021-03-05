const router = require('express').Router()
const UserController = require('../controllers/UserController')
const NewsController = require('../controllers/news')
const todoRouter = require('./todoRouter')
const { authenticate } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('This is the homepage todos app!')
})

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/loginGoogle", UserController.loginGoogle)

router.use('/todos', authenticate, todoRouter)
router.get('/news', authenticate, NewsController.getNews)

module.exports = router 
