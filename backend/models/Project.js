const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    description: {
        type:String,
        required: true
    },
    finishDate: {
        type: Date,
        required:true,
        min: Date.now
    }
},
{
    validateBeforeSave: true,
    toJSON:{virtuals:true}
});

projectSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'project'
});

const Project = new mongoose.model('Project', projectSchema);

module.exports = Project;