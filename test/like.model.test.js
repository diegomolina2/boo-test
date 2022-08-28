'use strict'

const { connectDB, dropDB, dropCollections } = require("./setuptestdb");
const User = require("../src/models/user")
const Comment = require("../src/models/comment")
const Like = require("../src/models/like")

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await dropDB();
});

afterEach(async () => {
    await dropCollections();
});

describe("Like Model", () => {
    it("should create a comment successfully", async () => {
        let validUser = {
            name: "Diego",
        };
        const newUser = await new User(validUser);
        await newUser.save();

        let validComment = {
            creator: newUser._id,
            title: 'New title',
            description: 'New description',
            personalityType: 'zodiac'

        };
        const newComment = await new Comment(validComment)
        await newComment.save()

        let validLike = {
            userId: newUser._id,
            commentId: newComment._id
        };

        const newLike = await new Like(validLike)
        await newLike.save()

        expect(newLike._id).toBeDefined();
        expect(newLike.userId).toBe(validLike.userId);
        expect(newLike.commentId).toBe(validLike.commentId);
    });

    it("should return one comment", async () => {
        let validUser = {
            name: "Diego",
        };
        const newUser = await new User(validUser);
        await newUser.save();

        let validComment = {
            creator: newUser._id,
            title: 'New title',
            description: 'New description',
            personalityType: 'zodiac'

        };
        const newComment = await new Comment(validComment)
        await newComment.save()

        let validLike = {
            userId: newUser._id,
            commentId: newComment._id
        };

        const newLike = await new Like(validLike)
        await newLike.save()

        const like = await Like.find();
        expect(like.length).toBe(1)
    });

    it("should remove one comment", async () => {
        let validUser = {
            name: "Diego",
        };
        const newUser = await new User(validUser);
        await newUser.save();

        let validComment = {
            creator: newUser._id,
            title: 'New title',
            description: 'New description',
            personalityType: 'zodiac'

        };
        const newComment = await new Comment(validComment)
        await newComment.save()

        let validLike = {
            userId: newUser._id,
            commentId: newComment._id
        };

        const newLike = await new Like(validLike)
        await newLike.save()

        await Like.deleteOne({ _id: newLike._id});
        const getAll = await Like.find();
        expect(getAll.length).toBe(0)
    });
});