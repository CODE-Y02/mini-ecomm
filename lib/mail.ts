import nodemailer from "nodemailer";

const token = process.env.MAILTRAP_TOKEN || "";

if (!token) {
  console.warn("MAILTRAP_TOKEN is not set in environment variables");
}

const transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: token,
  },
});

export const sendEmail = async ({
  to,
  subject,
  message: html,
}: {
  to: string;
  subject: string;
  message: string;
}) => {
  try {
    if (!process.env.EMAIL) {
      throw new Error(
        "Sender email (EMAIL) is not configured in environment variables"
      );
    }

    await transport.sendMail({
      from: {
        address: "hello@demomailtrap.co",
        name: "Mini Ecomm",
      },
      to,
      subject,
      html,
    });

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};
