import mongoose from 'mongoose';

const userCareerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  careerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true
  },
  progress: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Ensure unique combination of userId and careerId
userCareerSchema.index({ userId: 1, careerId: 1 }, { unique: true });

export default mongoose.model('UserCareer', userCareerSchema);