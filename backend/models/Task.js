const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    project:{type:mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required:true,
    select:false
},
    statement: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = new mongoose.model('Task', taskSchema);

module.exports = Task;