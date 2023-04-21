const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const ingredientSchema = mongoose.Schema({
  name: {
      type: String,
      required: true,
      lowercase: true
  },
  qty: {
      type: Number,
      required: true
  },
  unit: {
      type: String,
      required: true,
      lowercase: true
  }
}, { _id: false})

const ratingSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        validate: {
            validator: v => v >= 0 && v<=5,
            message: "rating debe estar entre 0 y 5"
        }
    },
}, { _id: false})


const recipeSchema = mongoose.Schema({
    schema: {
        type: Number,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    ingredients: {
        type: [ingredientSchema],
        validate: {
            validator: v => v.length > 0,
            message: "Sin ingredientes"
        }
    },
    method: {
        type: String,
        required: true,
        lowercase: true,
    },
    rating: [ratingSchema],
    
    avgRating: Number
})


module.exports = mongoose.model('recipe', recipeSchema)

