'use strict'

const { connectDB, dropDB, dropCollections } = require("./setuptestdb");
const Profile = require("../src/models/profile")

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await dropDB();
});

afterEach(async () => {
    await dropCollections();
});

describe("Profile Model", () => {
    it("should create a profile successfully", async () => {
        let validProfile = {
            name: "Diego",
        };
        const newProfile = await new Profile(validProfile);
        await newProfile.save();
        expect(newProfile._id).toBeDefined();
        expect(newProfile.name).toBe(validProfile.name);
    });

    it("should return one profile", async () => {
        let validProfile = {
            name: "Diego",
        };
        const newProfile = await new Profile(validProfile);
        await newProfile.save();
        const profile = await Profile.find();
        expect(profile.length).toBe(1)
    });

    it("should update one profile", async () => {
        let validProfile = {
            name: "Diego",
        };
        const newProfile = await new Profile(validProfile);
        await newProfile.save();
        const [profile] = await Promise.all([Profile.findById(newProfile._id)])
        profile.name = 'new Diego'
        const updatedProfile = await profile.save();
        const getProfile = await Profile.findById(newProfile._id);
        expect(updatedProfile.name).toBe(getProfile.name)
    });

    it("should remove one profile", async () => {
        let validProfile = {
            name: "Diego",
        };
        const newProfile = await new Profile(validProfile);
        await newProfile.save();
        await Profile.deleteOne({ _id: newProfile._id});
        const getAll = await Profile.find();
        expect(getAll.length).toBe(0)
    });
});