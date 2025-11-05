import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    default:""
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  // status: {
  //   type: String,
  //   enum: ['new', 'read', 'replied', 'archived'],
  //   default: 'new'
  // },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  // repliedAt: Date,
  ipAddress: String,
  // userAgent: String
}, {
  timestamps: true
})

contactSchema.index({ status: 1 })
contactSchema.index({ createdAt: -1 })
contactSchema.index({ email: 1 })

export const Contact = mongoose.model('Contact', contactSchema)