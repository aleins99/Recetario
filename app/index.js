const express = require('express');
const app = express();
const moongose = require('mongoose');
moongose.connect('mongodb://poli:password@mongo_ppy:27017/miapp?authSource=admin')
.then(() => console.log('conectado a Mongo'))
.catch((error) => console.error(error))


//Middleware
app.use(express.json())

//Schemas
const userSchema = require('./models/user')
const recipeSchema = require('./models/recipe')
// Routes

app.post('/new_recipe', (req,res) => {
    const recipe = recipeSchema(req.body)
    recipe.save()
    .then((data) => res.json(data))
    .catch((error) => res.send(error))
})

app.put('/rate', (req,res) => {
    const { recipeId, userId , rating } = req.body
    recipeSchema
    .updateOne(
        { _id: recipeId },
        [
            { $set: { ratings: {$concatArrays: [{$ifNull: ['$ratings', []]}, [{ userId: userId, rating: rating}]]}} },
            {$set: {avgRating: {$trunc: [{$avg:['$ratings.rating']},0]}}}
        ]
    )
    .then((data) => res.json(data))
    .catch((error) => {
        console.log(error)
        res.send("error")
    })
})

app.get('/recipesbyingredient', (req, res) => {
    const {ingredients}  = req.body
    const myIngredients = ingredients.map(ing => ing.name.toLowerCase())
    recipeSchema.find({"ingredients.name": {$in: myIngredients}})
    .then((recipes) => {
    const filteredRecipes = recipes.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.name.toLowerCase());
      return recipeIngredients.every((ingredient) => {
        return ingredient === 'agua' || ingredient === 'hielo' || myIngredients.includes(ingredient);
      });
    });
    res.send(filteredRecipes);
  })
  .catch((err) => {
    res.send("error")
    });
})

app.get('/recipes', (req,res) => {
    console.log("entra?");
    const { userId } = req.body
    recipeSchema.find()
    .then((data) => res.json(data))
    .catch((err) => res.send("error"))
})

app.post('/new_user', (req,res) => {
  const user = userSchema(req.body);
  user.save()
  .then((data) => res.json(data))
  .catch((error) => res.send(error))
})

app.listen(3000, () => console.log("Esperando en puerto 3000..."))

