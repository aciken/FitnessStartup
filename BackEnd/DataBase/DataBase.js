const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Fitness')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

// Define your schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  verify:{
      type: Number,
      default: 0
  },
  google:{
    type: Boolean,
    default: false
  },
  googleId:{
    type: String,
    default: ''
  },
  step:{
      type: Number,
      default: 1
  },
  setup:{
      type: Object
  },
  changing:{
    type: Object,
    default:{
      diet: '', 
      meals: '',
      fast: '',
      exercise1: '',
      exercise1Times: '',
      exercise2: '',
      exercise2Times: '',
      exercise3: '',
      exercise3Times: '',
      sleep: '',
      bed: '',
      varies: '',
      calories: '',
    }
  },
  posts: {
    type: Array,
    default: []
  },
  likedPosts: {
    type: Array,
    default: []
  }
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;