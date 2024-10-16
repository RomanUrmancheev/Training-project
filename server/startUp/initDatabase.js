const professionsMock = require("../mock/professions.json");
const qualitiesMock = require("../mock/qualities.json");
const Profession = require("../models/Profession");
const Quality = require("../models/Quality");

const createInitialEntity = async (Model, data) => {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
};

module.exports = async () => {
  const professions = await Profession.find();
  if (professions.length !== professionsMock.length) {
    await createInitialEntity(Profession, professionsMock);
  }

  const qualities = await Quality.find();
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock);
  }
};
