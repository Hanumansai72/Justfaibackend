const mongoose = require('mongoose');
const MilestoneSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['PENDING', 'FUNDED', 'SUBMITTED', 'REVISION_REQUESTED', 'APPROVED', 'RELEASED'],
        default: 'PENDING'
    },
    dueDate: { type: Date },
    aiQualityScore: { type: Number, min: 0, max: 100 },
    deliverables: [{
        fileName: { type: String },
        fileUrl: { type: String },
        uploadDate: { type: Date },
        aiScanStatus: { type: String, enum: ['CLEAN', 'ISSUES_FOUND', 'PENDING'] }
    }]
});
module.exports = mongoose.model('Milestone', MilestoneSchema);
