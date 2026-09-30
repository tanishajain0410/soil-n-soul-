import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    default: '',
  },
  service: {
    type: String,
    trim: true,
    default: 'General Inquiry',
  },
  dates: {
    type: String,
    trim: true,
    default: '',
  },
  guests: {
    type: String,
    trim: true,
    default: '',
  },
  origin: {
    type: String,
    trim: true,
    default: '',
  },
  interests: {
    type: String,
    trim: true,
    default: '',
  },
  message: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved', 'archived'],
    default: 'new',
  },
  source: {
    type: String,
    trim: true,
    default: 'website',
  },
  notes: {
    type: String,
    trim: true,
    default: '',
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

// Index for quick queries
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ status: 1 });

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
