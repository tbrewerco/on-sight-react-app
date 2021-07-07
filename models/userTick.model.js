// // dependencies
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // schema
// const userTickSchema = new Schema({
//     comment: String,
//     quality_rating: {type: Number, min: 1, max: 5},
//     difficulty_grade: {type: Number, min: 1, max: 30}, // YDS???
//     route: [{
//         type: Schema.Types.ObjectId,
//         ref: "Route"
//     }],
//     createdBy: [{ 
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }],
// },
//     { timestamps: true }
// );

// // export model
// const UserTick = mongoose.model("UserTick", userTickSchema);

// module.exports = UserTick;