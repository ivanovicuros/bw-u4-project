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
    Recipes.add(req.body)
    .then(newRecipe => {
        res.status(201).json(newRecipe)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    Recipes.update(req.params.id, req.body)
    .then(recipe => {
        res.status(200).json(recipe)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Recipes.remove(req.params.id)
    .then(removed => {
        res.status(200).json(removed)
    })
    .catch(next)
})

module.exports = router