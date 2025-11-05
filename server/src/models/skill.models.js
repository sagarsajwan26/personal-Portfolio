import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Languages', 'Frameworks', 'Other']
  },
  // categoryIcon: {
  //   type: String,
  //   default: '🔧'
  // },
  categoryColor: {
    type: String,
    default: '#424040'
  },

  proficiencyLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    max: 50,
    default:0
  },
  public_id:{
    type:String,
    required:true
  },
  description: String,
  skillIcon: String,
  skillColor: String,
  isActive: {
    type: Boolean,
    default: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

skillSchema.index({ category: 1, name: 1 })
skillSchema.index({ proficiencyLevel: 1 })
skillSchema.index({ order: 1 })
skillSchema.index({ categoryOrder: 1 })

export const Skill = mongoose.model('Skill', skillSchema)