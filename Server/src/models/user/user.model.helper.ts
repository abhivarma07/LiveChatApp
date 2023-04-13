import userModel, { userTypes, userUpdateTypes } from "./user.model";

const registerUser = async (user: userTypes) => {
  const db = new userModel({
    ...user,
  });

  await db.save();
  return db;
};

const isUserExist = async (email: string): Promise<boolean> => {
  const db = await userModel.findOne({
    email: email,
  });

  if (db) return true;

  return false;
};

const findUserById = async (id: string) => {
  const user = await userModel.findById(id).exec();
  return user;
};

const findUserByEmail = async (email: string) => {
  const user = await userModel
    .findOne({
      email: email,
    })
    .exec();
  return user;
};

const updateUser = async (id: string, user: userUpdateTypes) => {
  const filter = {
    _id: id,
  };

  const update = {
    ...user,
  };

  await userModel.findOneAndUpdate(filter, update);
};

export { registerUser, isUserExist, findUserById, findUserByEmail, updateUser };
