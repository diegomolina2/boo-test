'use strict'

const { connectDB, dropDB, dropCollections } = require("./setuptestdb");
const User = require("../src/models/user")
const Comment = require("../src/models/comment")
const Vote = require("../src/models/vote")

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await dropDB();
});

afterEach(async () => {
    await dropCollections();
});

describe("Vote Model", () => {
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

        let validVote = {
            userId: newUser._id,
            commentId: newComment._id,
            type: 'zodiac',
            value: 'taurus'
        };

        const newVote = await new Vote(validVote)
        await newVote.save()

        expect(newVote._id).toBeDefined();
        expect(newVote.userId).toBe(validVote.userId);
        expect(newVote.commentId).toBe(validVote.commentId);
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

        let validVote = {
            userId: newUser._id,
            commentId: newComment._id,
            type: 'zodiac',
            value: 'taurus'
        };

        const newVote = await new Vote(validVote)
        await newVote.save()

        const vote = await Vote.find();
        expect(vote.length).toBe(1)
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

        let validVote = {
            userId: newUser._id,
            commentId: newComment._id,
            type: 'zodiac',
            value: 'taurus'
        };

        const newVote = await new Vote(validVote)
        await newVote.save()

        await Vote.deleteOne({ _id: newVote._id});
        const getAll = await Vote.find();
        expect(getAll.length).toBe(0)
    });
});