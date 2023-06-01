const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
profile: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Profile',
},
});

// Method to verify password
userSchema.methods.verifyPassword = function (password) {
  console.log('Provided password', password);
  console.log('Stored hashed password', this.password);
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
