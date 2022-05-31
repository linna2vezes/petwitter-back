import { validateRequest } from "../middleware/auth.js";
import * as tweetController from "../controllers/tweet-controller.js";


export default {
    createTweet: {
        method: "POST",
        url: "/tweet",
        preHandler: [validateRequest],
        handler: tweetController.createTweet,
    },
    getAllTweets: {
        method: "GET",
        url: "/tweet",
        preHandler: [validateRequest],
        handler: tweetController.getAllTweets,
    },
    getUserTweet: {
        method: "GET",
        url: "/tweet/:id",
        preHandler: [validateRequest],
        handler: tweetController.getUserTweet,
    },
    
    deleteTweet: {
        method: "DELETE",
        url: "/tweet/:id",
        preHandler: [validateRequest],
        handler: tweetController.deleteTweet,
    },
};