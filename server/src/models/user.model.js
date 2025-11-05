import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import  jwt from 'jsonwebtoken'

const socialLinksSchema = new mongoose.Schema({
  linkedin: String,
  github: String,
  twitter: String,
  instagram: String,
 
  facebook:String
})

const contactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String
})

const workExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Agency Work', 'Freelance Work', 'Full-time', 'Part-time', 'Contract'],
    required: true
  },
  startDate: Date,
  endDate: Date,
  isCurrent: {
    type: Boolean,
    default: false
  },
  description: String
})

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select:false
    // minlength: 6
  },
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  profileImage: {
    type: String,
    default: ''

  },
  bio: String,
  title: {
    type: String,
    default: 'Full Stack Developer'
  },
  aboutMe: String,
  contactInfo: contactInfoSchema,
  socialLinks: socialLinksSchema,
  workExperience: [workExperienceSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date
}, {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`
}

userSchema.methods.generateToken = function() {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
}
userSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'createdBy'
})

userSchema.virtual('skills', {
  ref: 'Skill',
  localField: '_id', 
  foreignField: 'createdBy'
})

userSchema.index({ role: 1 })

export const User = mongoose.model('User', userSchema)