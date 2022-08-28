'use strict'

const { connectDB, dropDB, dropCollections } = require("./setuptestdb");
const User = require("../src/models/user")

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await dropDB();
});

afterEach(async () => {
    await dropCollections();
});

describe("User Model", () => {
    it("should create a user successfully", async () => {
        let validUser = {
            name: "Diego",
        };
        const newUser = await new User(validUser);
        await newUser.save();
        expect(newUser._id).toBeDefined();
        expect(newUser.name).toBe(validUser.name);
    });

    it("should return one user", async () => {
        let validUser = {
            name: "Diego",
        };
        const newUser = await new User(validUser);
        await newUser.save();
        const user = await User.find();
        expect(user.length).toBe(1)
    });

    it("should update one user", async () => {
        let validUser = {
            name: "Diego",
        };
        const newUser = await new User(validUser);
        await newUser.save();
        const [user] = await Promise.all([User.findById(newUser._id)])
        user.name = 'new Diego'
        const updatedUser = await user.save();
        const getUser = await User.findById(newUser._id);
        expect(updatedUser.name).toBe(getUser.name)
    });

    it("should remove one user", async () => {
        let validUser = {
            name: "Diego",
            title: 'Neww Title',
            description: 'New description',

        };
        const newUser = await new User(validUser);
        await newUser.save();
        await User.deleteOne({ _id: newUser._id});
        const getAll = await User.find();
        expect(getAll.length).toBe(0)
    });
});