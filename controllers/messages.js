const Message = require('../modals/messages')

const createMessage = async (req,res, next) => {

    const {name, email, message} = req.body
    const newMessage = new Message({
        name, 
        email,
        message,
        sentDate: new Date()
    })
    try {
        await newMessage.save()
    } catch(err){
        console.log(err)
        return next(err)
    }
    res.status(201).json({message:"Message sent", data: newMessage})

}
const getMessages = async (req,res,next) => {
    let messages = []

    try {
        messages = await Message.find({})
    }
    catch (err){
        console.log(err)
        return next(er)
    }
    if(!messages){
        return res.status(404).json("Message not found")
    }
    res.send({messages})
}
exports.createMessage = createMessage
exports.getMessages = getMessages
