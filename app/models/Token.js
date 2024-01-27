import mongoose from 'mongoose';

const Token = new mongoose.Schema({
    tokenId: {
        type: String,
    },
    userId: {
        type: String,
    }

});
export default mongoose.model('Token', Token);
