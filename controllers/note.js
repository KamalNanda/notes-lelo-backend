
const Note = require('../modals/note')

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

const updateNotes = async (req, res, next) => {
  let updateNote;
  try{
      updateNote = await Note.findById(req.params.notesId)
  } catch(err) {
      console.log(err)
      return next(err)
  }
  updateNote.name = req.body.name
  updateNote.author = req.body.author
  updateNote.subject = req.body.subject
  updateNote.isreq = req.body.isreq
  updateNote.semester = req.body.semester
  updateNote.course = req.body.course
  updateNote.ctype = req.body.ctype
  updateNote.link = req.body.link
  try{
    await updateNote.save()
  } catch(err){
    console.log(err)
    return next(err)
  }
  res.status(200).json({updateNote})
}
exports.getAllNotes = getAllNotes
exports.getNotesById = getNotesById
exports.createNotes = createNotes
exports.deleteNotes = deleteNotes
exports.getNotesByCourse = getNotesByCourse
exports.getNotesBySemester = getNotesBySemester
exports.getNotesBySubject = getNotesBySubject
exports.getNotesByType = getNotesByType
exports.updateNotes = updateNotes
