const users =[
  {username: 'Bobisha', password:'1234'}
]

const recipes = [
  {
    title: 'carbonara',
    source: " Luigi's granma' ",
    category: 'appetizer',
    user_id: 1,
  }
]

const ingredients = [
  {ingredient_name: 'pasta'},
  {ingredient_name: 'pancetta'},
  {ingredient_name: 'garlic'},
  {ingredient_name: 'olive oil'},
]

const instructions = [
  {recipe_id: 1, step_number: 1, instruction_text: 'Heat up pan'},
  {recipe_id: 1, step_number: 2, instruction_text: 'Add olive oil, garlic and pancetta'},
  {recipe_id: 1, step_number: 3, instruction_text: 'Add pasta'},
]

const ing_instructions = [
  {instruction_id: 2, ingredient_id:4, quantity:1},
  {instruction_id: 2, ingredient_id:3, quantity:1},
  {instruction_id: 2, ingredient_id:2, quantity:1},
  {instruction_id: 3, ingredient_id:1, quantity:1},
]

exports.seed = async function (knex) {
  await knex('users').insert(users)
  await knex('recipes').insert(recipes)
  await knex('ingredients').insert(ingredients)
  await knex('instructions').insert(instructions)
  await knex('ing_instructions').insert(ing_instructions)
} 