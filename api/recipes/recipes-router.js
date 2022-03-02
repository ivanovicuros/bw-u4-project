const router = require('express').Router()
const Recipes = require('./recipes-model')


router.get('/', (req, res, next) => {
    Recipes.findAll()
    .then(all => {
        res.status(200).json(all)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Recipes.findById(id)
    .then(recipe => {
        res.status(200).json(recipe)
    })
    .catch(next) 
})

router.post('/', (req, res, next) => {
    next()
})

router.put('/:id', (req, res, next) => {
    next()
})

router.delete('/:id', (req, res, next) => {
    next()
})

module.exports = router