
const Note = require('../modals/note')

var admin = {
    'id' : "admin-1",
    'name' : "Admin",
    'email' : "Admin@noteslelo.com",
    'password' : "Admin@2020"
}

const getAllNotes = (req , res , next)=> {
    const notes = Note.find({})
    .then( notes =>{
    	res.send({notes})
    })
    .catch(err => console.log(err))
}

const getNotesById = async (req , res , next)=> {
    const noteId = req.params.notesId

    let note
    try{
        note =  await Note.findById(noteId)

    } catch (err) {
        console.log(err)
        return next(err)
    }
    if(!note){
        return res.status(404).json("Page Not found :)")
    }
    res.send({note})
}
const getNotesByCourse = async (req , res , next)=> {
    let note
    try{
        note =  await Note.find({course : req.params.course})
    } catch (err) {
        console.log(err)
        return next(err)
    }
    if(!note){
        return res.status(404).json("Page Not found :)")
    }
    res.send({note})
}
const getNotesBySemester = async (req , res , next)=> {
    let note
    try{
        note =  await Note.find({course : req.params.course , semester: req.params.semester})
    } catch (err) {
        console.log(err)
        return next(err)
    }
    if(!note){
        return res.status(404).json("Page Not found :)")
    }
    res.send({note})
}
const getNotesBySubject = async(req, res, next) => {
  let note
  try{
    note= await Note.find({course: req.params.course , semester : req.params.semester , subject: req.params.subject})
  } catch(err){
    console.log(err)
    return next(err)
  }
  if(!note){
    return res.status(404).json("Page Not found ")
  }
  res.send({note})
}
const getNotesByType = async(req, res, next) => {
  let note
  try{
    note= await Note.find({course: req.params.course , semester : req.params.semester , subject: req.params.subject, ctype: req.params.ctype})
  } catch(err){
    console.log(err)
    return next(err)
  }
  if(!note){
    return res.status(404).json("Page Not found ")
  }
  res.send({note})
}
const createNotes = async (req, res , next) => {
    const newNote = new Note({
      name : req.body.name,
      author : req.body.author,
      semester : req.body.semester,
      link : req.body.link,
      course : req.body.course,
      subject : req.body.subject,
      isreq : req.body.isreq,
      ctype: req.body.ctype
    })
    try{
        await newNote.save()
    } catch(err){
        console.log(err)
        return next(err)
    }
    res.status(201).json({newNote})
}

const deleteNotes = async (req , res , next)=> {
    const noteId = req.params.notesId
    let delNote
    try{
        delNote = await Note.findById(noteId)
    } catch(err) {
        console.log(err)
        return next(err)
    }
    try {
        await delNote.remove()
    } catch(err) {
        console.log(err)
        return next(err)
    }
    res.status(200).json("Deleted")
}

const getAdmins = (req , res , next)=> {
    res.json(admin)
}

const loginAdmin = (req , res , next) => {
    const {email , password} = req.body

    if(admin.email !== email){
        return res.status(401).json("Email not found")
    }
    else if(admin.password !== password){
        return res.status(401).json("Password doesn't match")
    }
    else res.json("Logged In :) ")
}

exports.getAllNotes = getAllNotes
exports.getNotesById = getNotesById
exports.createNotes = createNotes
exports.deleteNotes = deleteNotes
exports.getAdmins = getAdmins
exports.loginAdmin = loginAdmin
exports.getNotesByCourse = getNotesByCourse
exports.getNotesBySemester = getNotesBySemester
exports.getNotesBySubject = getNotesBySubject
exports.getNotesByType = getNotesByType
