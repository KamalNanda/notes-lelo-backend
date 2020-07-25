const express= require('express')
const controllers = require('../controllers/note')
const router = express.Router()



router.get('/api' , (req , res , next)=> {
    res.json("Notes Lelo!!!")
})
router.get('/api/notes', controllers.getAllNotes)
router.get('/api/notes/:notesId' , controllers.getNotesById )
router.post('/api/notes' , controllers.createNotes)
router.delete('/api/notes/:notesId' , controllers.deleteNotes)
router.get('/api/admin' , controllers.getAdmins)
router.post('/api/admin/login' , controllers.loginAdmin)
module.exports = router