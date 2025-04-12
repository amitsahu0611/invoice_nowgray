const Lookups = require("../models/lookups.model");
const FileConfig = require("../models/file_number_configuration");
const { createSuccess, createError } = require("./response");

async function fileNumber(branchName, client_type,res) {
  if (!branchName) {
    return;
  }
  const currentYear = new Date().getFullYear();
  try {
    const prefixData = await FileConfig.findOne({
      where: { is_deleted: false },
      order: [["running_no_prifix", "DESC"]],
    });
    if (!prefixData) {
     
      return res.json(createError("No prefix data found!"));
    }
    const firmName = prefixData.firm_prifix;


    const fileType = client_type;
    let runningNumber = parseInt(prefixData.running_no_prifix) || 0;
    const finalRunningNumber = runningNumber + 1;
   

    const generateFileNumber = `${firmName}/${branchName}/${fileType}/${finalRunningNumber}/${currentYear}`;

    // Update the table with the new running number
    await FileConfig.create({
      firm_prifix: firmName,
      branch_prifix: branchName,
      type_prifix: fileType,
      running_no_prifix: finalRunningNumber.toString(),
      client_id: prefixData.client_id,
      grouping_code: prefixData.grouping_code,
      is_active: true,
      is_deleted: false,
    });

    return generateFileNumber;
  } catch (error) {
    console.error("Error fetching or updating prefix data:", error.message);
    return;
  }
}

module.exports = fileNumber;
