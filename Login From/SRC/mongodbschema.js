const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Timestamp: { type: Date, default: Date.now },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roll: { type: Number, required: true },
    section: { type: String, required: true },
    branch: { type: String, required: true },
    phone: { type: Number, required: true }, 
    localAddress: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    fatherPhoneNo: { type: Number, required: true },
    motherPhoneNo: { type: Number, required: true }, 
    fatherMailId: { type: String, required: true },
    motherMailId: { type: String, required: true },
    parentAddress: { type: String, required: true },
    date: { type: Date, required: true }, 
    class10Percentage: { type: Number, required: true },
    class12Percentage: { type: Number, required: true },
    MENTORING: { type: String, required: true },
    information: { type: Boolean, required: true },
    image: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

