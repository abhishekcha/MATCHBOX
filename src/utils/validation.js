const validator=require("validator");
const validateSignUpData = (req) => {
    const { firstName,lastName, emailId, password } = req.body;
    if (!firstName || !lastName || !emailId || !password) {
        return { valid: false, message: "Missing required fields" };
    } 
    else if(!validator.isEmail(emailId)){
        return { valid: false, message: "Invalid email format" };
    }
    else if(!validator.isStrongPassword(password)){
        return { valid: false, message: "Password must be strong (min 8 chars, include uppercase, lowercase, number, and symbol)" };
    }

};
module.exports = { 
    validateSignUpData 
};