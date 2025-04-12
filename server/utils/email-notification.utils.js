/** @format */

const nodemailer = require("nodemailer");

const sendMailForCaseAssign = async (
  recipientEmail,
  fileNo,
  clientName,
  clientType,
  assignedDate
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.11squaresolutions.com",
      port: 465,
      secure: true,
      auth: {
        user: "loms-law@11squaresolutions.com",
        pass: "lomslaw2024",
      },
    });

    const htmlTemplate = `
        <h2>Law Office Management System (LOMS)</h2>
        <p><b>File No:</b> [FileNo]</p>
        <p><b>Client Name:</b> [ClientName]</p>
        <p><b>Client Type:</b> [ClientType]</p>
        <p><b>Assigned Date:</b> [AssignedDate]</p>
        <br>
        <p>Law Office Management System (LOMS)</p>
      `;

    const htmlContent = htmlTemplate
      .replace("[FileNo]", fileNo)
      .replace("[ClientName]", clientName)
      .replace("[ClientType]", clientType)
      .replace("[AssignedDate]", assignedDate);

    const mailOptions = {
      from: "'LOMS Admin' <loms-law@11squaresolutions.com>",
      to: recipientEmail,
      subject: "Case Assigned",
      html: htmlContent,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendMailForTaskAssign = async (
  recipientEmail,
  fileNo,
  clientName,
  clientType,
  dueDate,
  description
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.loms-law.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@loms-law.com",
        pass: "loms123456@@",
      },
    });

    const htmlTemplate = `
      <h2>Law Office Management System (LOMS)</h2>
      <p><b>File No:</b> ${fileNo}</p>
      <p><b>Client Name:</b> ${clientName}</p>
      <p><b>Client Type:</b> ${clientType}</p>
      <p><b>Due Date:</b> ${dueDate}</p>
      <p><b>Description:</b> ${description}</p>
      <br>
      <p>Law Office Management System (LOMS)</p>
    `;

    const mailOptions = {
      from: '"LOMS Admin" <noreply@loms-law.com>',
      to: recipientEmail,
      subject: "Task Assigned",
      html: htmlTemplate,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {sendMailForCaseAssign, sendMailForTaskAssign};
