const { required } = require("joi")
const mongoose = require("mongoose")

const clientSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,

    },
    is_online: {
        type: String,
        default: '0'
    },

    otp: {

        type: String,

    },


    otpexpire: {
        type: Date
    },
    otpVerifiy: {
        type: Boolean,
        default: false
    },

    skills: {
        type: [String],
        default: []

    },
    location: {

        type: String,

    },
    
    isfreelencer: {
        type: Boolean,
        default: false
    },
    
    companyName: {
        type: String,

    },
    job:[{
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobmodel"
    }],

},
    { timestamps: true })

module.exports = mongoose.model("clientModel", clientSchema)