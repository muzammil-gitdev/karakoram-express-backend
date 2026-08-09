import crypto from "crypto";

const hashPass = crypto.createHash("sha256").update("travel123").digest("hex");

console.log(hashPass);
