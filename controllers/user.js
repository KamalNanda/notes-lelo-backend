const User = require('../modals/user')

const signUp = async (req , res , next) => {
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
  const {name , email , password, course, college, semester, imgUrl} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email : email})
  }  catch(err){
    console.log(err)
    return next(err)
  }
  if (existingUser){
    console.log("User already existed")
    let {_id, name, email, college, course, semester, password, imgUrl} = existingUser
    return res.json({user: {_id, name, email, college, course, semester, imgUrl} , pass: password})
  }
  const newUser = new User({
    name,
    email,
    password,
    course,
    college,
    semester,
    imgUrl
  })
  try {
    await newUser.save()
  } catch(err){
    console.log(err)
    return next(err)
  }
  res.status(201).json({user: newUser , pass: password})
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
