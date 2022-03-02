const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB...')
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    minlength: [8, 'Phone number must be at least 8 characters long'],
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{2,3}-/.test(v)
      },
      message: 'Phone number must start with 2 or 3 digits followed by "-"'
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)