const User = require('../modals/user')

var admin = {
    'id' : "admin-1",
    'name' : "Admin",
    'email' : "admin@noteslelo.com",
    'password' : "Admin@2020"
}

const loginAdmin = (req , res , next) => {
    const {email , password} = req.body

    if(admin.email !== email){
        return res.status(401).json("Email not found")
    }
    else if(admin.password !== password){
        return res.status(401).json("Password doesn't match")
    }
    else res.json({message: "login" , email: email, name: admin.name, token: "K95990NJ17057MN98613KM95606J"})
}

const signUp = async (req , res , next) => {
    console.log(req.body)
  const {name , email , password, course, college,gender, semester} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email : email})
  }  catch(err){
    console.log(err)
    return next(err)
  }
  if (existingUser){
    console.log("User already existed")
    const err = new Error('User already existed')
    let error ='User already existed'
    next(err)
    return res.json({error})
  }
  const newUser = new User({
    name,
    email,
    password,
    course,
    college,
    gender,
    semester
  })
  try {
    await newUser.save()
  } catch(err){
    console.log(err)
    return next(err)
  }
  res.status(201).json({newUser})
}

const login = async (req, res, next) => {
  const {email , password} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email : email})
  }  catch(err){
    console.log(err)
    return next(err)
  }

  if(!existingUser || existingUser.password !== password){
    const err = new Error("User not found with the given credentials ")
    const error = "User not found with the given credentials "
    next(err)
    return res.json({error})
  }
  res.json({message: "Logged In" , user : existingUser})
}

const socialRegister = async(req, res, next) => {
  const {email , name, password} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email : email})
  }catch(err){
    console.log(err)
    return next(err)
  }
  if(!existingUser){
    console.log("User Not Found")
    return res.json({user : "false"})
  }
  return res.json({user: existingUser , pass: existingUser.password})
}

const socialLogin = async(req, res, next) => {
  const {name , email , password, course, college, semester} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email : email})
  }  catch(err){
    console.log(err)
    return next(err)
  }
  if (existingUser){
    console.log("User already existed")
    return res.json({user: existingUser , pass: password})
  }
  const newUser = new User({
    name,
    email,
    password,
    course,
    college,
    semester
  })
  try {
    await newUser.save()
  } catch(err){
    console.log(err)
    return next(err)
  }
  res.status(201).json({newUser})
}

const getUsers = async (rq, res, next) => {
  let users
  try{
    users = await User.find({} , '-password')
  } catch (error){
    const err= "Fetching User Failed! Try Later "
    next (error)
    return res.json({err})
  }
  res.json({users})
}
exports.login = login
exports.signUp = signUp
exports.getUsers = getUsers
exports.socialLogin= socialLogin
exports.socialRegister = socialRegister
exports.loginAdmin = loginAdmin
