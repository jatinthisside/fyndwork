enum UserRole {
    STUDENT = 'student',
    COMPANY = 'company',
    ADMIN = 'admin',
}

interface signupData {
    name:String,
    email:String,
    role: UserRole,
    about?:String,
    city?:String,
    state?:String,
    country?:String,
    pincode?:Number,
    street?:String,
    password?:String, // Optional for OAuth users
    profile_photo?:String,
}

interface loginData {
    email: String,
    password: String,
}

export { signupData, loginData };