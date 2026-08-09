import crypto from "crypto";
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const hashedPass = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    if (
      !(hashedPass === process.env.PASSWORD) ||
      !(email === process.env.EMAIL)
    ) {
      throw new Error("Incorrect Credentials");
    }
    res.status(200).json({
      success: true,
      message: "User Logged in Successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}
