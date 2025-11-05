import mongoose from 'mongoose'

const screenshotSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  public_id:{
    type:String,
    required:true
  }
})

const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  features: [{
    type: String,
    required: true
  }],
  repositoryUrl: {
    type: String,
    required: true
  },
  liveDemoUrl: {
    type: String,
    default:''
  },
  role: {
    type: String,
    required: true
  },
  teamSize: {
    type: Number,
    required: true,
    min: 1
  },
  duration: {
    type: String,
    required: true
  },
  challenges: [{
    type: String,
    required: true
  }],
  lessonsLearned: [{
    type: String,
    required: true
  }],
  screenshots: [screenshotSchema],
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

projectSchema.index({ projectTitle: 1 })
projectSchema.index({ technologies: 1 })
projectSchema.index({ createdAt: -1 })

export const Project = mongoose.model('Project', projectSchema)