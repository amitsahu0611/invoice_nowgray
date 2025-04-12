const crypto = require("crypto");
// const ActionLogs = require("../models/action_logs");

const hashPassword = (password) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

const saveActionLog = async (
  action = "",
  user_id = 0,
  firm_id = 0,
  description = null
) => {
  try {
    // const actionlog = await ActionLogs.create({
    //   action,
    //   user_id,
    //   firm_id,
    //   description,
    // });
  } catch (error) {
    console.error("Error saving action log:", error);
  }
};

module.exports = { hashPassword, saveActionLog };
