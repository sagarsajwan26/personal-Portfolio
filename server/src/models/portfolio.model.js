import mongoose from 'mongoose'

const aboutImagesSchema= new mongoose.Schema({
     url: String,
    public_id: String,
})

const quoteImagesSchema= new mongoose.Schema({
   url: String,
    public_id: String,
})


const portfolioSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  logo:{
     url: String,
    public_id: String,

  },
  
  subtitle: {
    type: String,
    default: 'Illustrator and Designer'
  },
  aboutMe:{
    type:String,
    default:"I am a digital nomad currently based in Hong Kong. I've been working in graphic design for the past ten years. It was only in the past three that I decided to focus full-time on illustrating."
  },
  aboutImages: [aboutImagesSchema],
  skillandExpertiesImage:{
    url: String,
    public_id: String,
    

  },
  
  // quote: {
  //   type: String,
  //   default: 'I Was Created to create'
  // },
  quoteImages: [quoteImagesSchema],
  
  
  // metaTitle: String,
  // metaDescription: String,
  // keywords: [String],
  
  // theme: {
  //   type: String,
  //   enum: ['light', 'dark', 'auto'],
  //   default: 'light'
  // },
  // isPublic: {
  //   type: Boolean,
  //   default: true
  // },
  // customDomain: String,
  
 
  
}, {
  timestamps: true
})

portfolioSchema.virtual('user', {
  ref: 'User',
  localField: 'owner',
  foreignField: '_id',
  justOne: true
})

portfolioSchema.virtual('projects', {
  ref: 'Project',
  localField: 'owner',
  foreignField: 'createdBy'
})

portfolioSchema.virtual('skills', {
  ref: 'Skill',
  localField: 'owner',
  foreignField: 'createdBy'
})


portfolioSchema.index({ isPublic: 1 })
portfolioSchema.index({ customDomain: 1 })

export const Portfolio = mongoose.model('Portfolio', portfolioSchema)