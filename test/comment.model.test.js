'use strict'

const { connectDB, dropDB, dropCollections } = require("./setuptestdb");
const User = require("../src/models/user")
const Comment = require("../src/models/comment")

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await dropDB();
});

afterEach(async () => {
    await dropCollections();
});

describe("Comment Model", () => {
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
        expect(newComment._id).toBeDefined();
        expect(newComment.creator).toBe(validComment.creator);
        expect(newComment.title).toBe(validComment.title);
        expect(newComment.description).toBe(validComment.description);
        expect(newComment.personalityType).toBe(validComment.personalityType);
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
        const comment = await Comment.find();
        expect(comment.length).toBe(1)
    });

    it("should update one comment", async () => {
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

        const [comment] = await Promise.all([Comment.findById(newComment._id)])
        comment.title = 'title updated';
        comment.description = 'description updated';
        const updatedComment = await comment.save();
        const getComment = await Comment.findById(comment._id);
        expect(updatedComment.title).toBe(getComment.title)
        expect(updatedComment.description).toBe(getComment.description)
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

        await Comment.deleteOne({ _id: newComment._id});
        const getAll = await Comment.find();
        expect(getAll.length).toBe(0)
    });
});