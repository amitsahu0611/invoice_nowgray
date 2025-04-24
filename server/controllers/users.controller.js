/** @format */

const {hashPassword} = require("../config/config");
const jwt = require("jsonwebtoken");
const Users = require("../models/users.model");
const {Success, Error} = require("../utils/messages");
const moment = require("moment");
const {createSuccess, createError} = require("../utils/response");
const Company = require("../models/Company.model");

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

const getRoleIdFromRoleName = (role) => {
  const roleMap = {
    admin: 1,
    account: 2,
    sales: 3,
  };
  return roleMap[role] || 0; // Default to 0 if not matched
};

const createUser = async (req, res) => {
  const ObjReq = req.body;
  console.log("Creating User:", ObjReq);

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({
      where: {email: ObjReq.email, is_deleted: false},
    });

    if (existingUser) {
      return res.json(createError("User with this email already exists."));
    }

    const companyName = await Company.findOne({
      where: {company_id: ObjReq.company},
    });

    // Map form fields to DB fields
    const newUser = {
      company_id: ObjReq.company,
      full_Name: ObjReq.name,
      email: ObjReq.email,
      password: hashPassword(ObjReq.password),
      mobile: ObjReq.phone,
      companyName: companyName.company_name,
      role_id: getRoleIdFromRoleName(ObjReq.role), // We'll define this below
      is_active: ObjReq.status === "active",
      created_by: req.user?.user_id || null, // if you pass logged-in user info
    };

    // Create user
    const createdUser = await Users.create(newUser);

    return res.json(createSuccess("User created successfully", createdUser));
  } catch (error) {
    console.error("User Creation Error:", error);
    return res.json(createError(`Exception: ${error.message}`));
  }
};

const getAllStaffs = async (req, res) => {
  const {start} = req.params;
  try {
    const companies = await Company.findAll({raw: true});

    const staffs = await Users.findAll({
      where: {
        is_deleted: false,
      },
      ...(Number.isNaN(Number(start)) || start === undefined
        ? {} // If start is NaN or undefined, no offset/limit
        : {
            offset: (start - 1) * 15,
            limit: 15,
          }),
    });

    console.log("staffs", staffs);

    const staffsWithCompany = staffs.map((staff) => {
      const company = companies.find((c) => c.company_id === staff.company_id);
      return {
        ...staff.dataValues,
        company_name: company ? company.company_name : null,
      };
    });

    if (!staffsWithCompany || staffsWithCompany.length === 0) {
      return res.json(createError("No staff found"));
    }

    return res.json(
      createSuccess("Staffs fetched successfully", staffsWithCompany)
    );
  } catch (error) {
    return res.json(createError(`Exception: ${error.message}`));
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        user_id: req.params.id,
        is_deleted: false,
      },
    });

    if (!user) return res.status(404).json({message: "User not found"});

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({message: "Server error"});
  }
};

const updateUserById = async (req, res) => {
  try {
    const {id} = req.params;

    if (req.body.password) {
      req.body.password = hashPassword(req.body.password);
    }

    const [updated] = await Users.update(req.body, {
      where: {user_id: id, is_deleted: false},
    });

    if (updated === 0) {
      return res.status(404).json({message: "User not found or no changes"});
    }

    const updatedUser = await Users.findOne({where: {user_id: id}});

    res.status(200).json(createSuccess(updatedUser));
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({message: "Server error"});
  }
};

module.exports = {
  login,
  createUser,
  getAllStaffs,
  getUserById,
  updateUserById,
};
