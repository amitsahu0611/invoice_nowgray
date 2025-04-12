/** @format */

const {hashPassword} = require("../config/config");
const jwt = require("jsonwebtoken");
const Users = require("../models/users.model");
const {Success, Error} = require("../utils/messages");
const moment = require("moment");
const {createSuccess, createError} = require("../utils/response");

const login = async (req, res) => {
  const ObjReq = req.body;

  try {
    const existingUser = await Users.findOne({
      where: {email: ObjReq.email, is_active: true, is_deleted: false},
    });

    if (!existingUser) {
      return res.json(createError(Error.NoRecordFound));
    }

    const hashedPassword = hashPassword(ObjReq.password);

    if (hashedPassword !== existingUser.password) {
      return res.json(createError(Error.WrongCredentials));
    }
    const {password, ...userWithoutPassword} = existingUser.dataValues;
    await existingUser.update({
      Last_Login: moment().tz("UTC").format(),
    });

    const token = jwt.sign(
      {id: existingUser.id, email: existingUser.email},
      process.env.JWTKEY
    );

    res.json(
      createSuccess("Login Success", {
        user: userWithoutPassword,
        authToken: token,
      })
    );
  } catch (error) {
    return res.json(createError(`Exception : ${error.message}`));
  }
};

module.exports = {
  login,
};
