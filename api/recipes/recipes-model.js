const db = require('../data/db-config')

function findAll() {
    return db('recipes as r')
    .select('recipe_id', 'title', 'r.source', 'category')
}

// select r.recipe_id, r.title, r.source,
// i.instruction_text, i.step_number,
// ingredients.ingredient_name
// from recipes as r
// left join instructions as i on r.recipe_id = i.recipe_id
// left join ing_instructions as ing on ing.instruction_id = i.instruction_id
// left join ingredients on ing.ingredient_id = ingredients.ingredient_id
// order by i.step_number

 async function findById(id){    
    const rows = await db('recipes as r')
    .leftJoin('instructions as i', 'r.recipe_id', 'i.recipe_id')
    .leftJoin('ing_instructions as ing', 'ing.instruction_id', 'i.instruction_id')
    .leftJoin('ingredients', 'ing.ingredient_id', 'ingredients.ingredient_id')
    .select('r.recipe_id', 'r.title', 'r.source', 'r.category',
     'i.instruction_text', 'i.step_number',
     'ingredients.ingredient_name')
     .where('r.recipe_id', id)
     .orderBy('i.step_number')

     let result = {
        title: rows[0].title,
        category: rows[0].category,
        recipe_id: rows[0].recipe_id,
        source: rows[0].source,
        instructions: [],
        ingredients: []  
     }
     rows.map(obj => {
         if(!obj.instruction_text || !obj.step_number){
             return []
         }else{
             result.instructions.push(obj.instruction_text)
         }
     })
     rows.map(obj => {
         if(!obj.ingredient_name){
             return []
         }else{
             result.ingredients.push(obj.ingredient_name)
         }
     })
     return result
}




module.exports = { findAll, findById }