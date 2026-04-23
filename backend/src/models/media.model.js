import mongoose, {Schema} from "mongoose";

const mediaSchema = new Schema(
    {
        meetingCode: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        name: String,
        mimeType: String,
        size: Number,
        senderUsername: String,
        uploadedByUserId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }
)

const Media = mongoose.model("Media", mediaSchema);
export {Media}