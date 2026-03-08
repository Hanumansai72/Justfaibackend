const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    scope: { type: [String], default: [] },
    budget: {
        min: { type: Number },
        max: { type: Number },
        total: { type: Number, required: true }
    },
    status: {
        type: String,
        enum: ['DRAFT', 'OPEN', 'HIRED', 'IN_PROGRESS', 'COMPLETED', 'DISPUTED'],
        default: 'DRAFT'
    },
    milestones: [MilestoneSchema],
    escrow: {
        totalLocked: { type: Number, default: 0 },
        totalReleased: { type: Number, default: 0 }
    },
    aiAssistance: {
        descriptionDraftedByAI: { type: Boolean, default: false },
        milestonesSuggestedByAI: { type: Boolean, default: false }
    },
    hiredFreelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
