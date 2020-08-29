const express= require('express')
const controllers = require('../controllers/note')
const userControllers = require('../controllers/user')
const router = express.Router()


router.get('/' , (req , res , next)=> {
    res.json("Notes Lelo!!!")
})
router.get('/api' , (req , res , next)=> {
    res.json("Notes Lelo!!!")
})
router.get('/api/notes', controllers.getAllNotes)
router.get('/api/notes/:notesId' , controllers.getNotesById )
router.post('/api/notes' , controllers.createNotes)
router.delete('/api/notes/:notesId' , controllers.deleteNotes)
router.post('/api/signup' , userControllers.signUp)
router.post('/api/login' , userControllers.login)
router.get('/api/users', userControllers.getUsers)
router.post('/api/socialLogin' , userControllers.socialLogin)
router.post('/api/socialRegister' , userControllers.socialRegister)
router.get('/api/notes/:course', controllers.getNotesByCourse)
router.get('/api/notes/:course/:semester' , controllers.getNotesBySemester)
router.get('/api/notes/:course/:semester/:subject', controllers.getNotesBySubject)
router.get('/api/notes/:course/:semester/:subject/:type', controllers.getNotesByType)
module.exports = router
