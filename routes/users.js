const express=require('express')
const user = require('../models/user')
const router = express.Router()


// GET :  RETURN ALL USERS 

router.get('/',async (req, res) => {
try{
const users=await user.find()
res.json(users)
}
catch (err){
res.status(500).json({message: err.message})
}
})

// POST :  ADD A NEW USER TO THE DATABASE 
router.post('/',async (req, res) => {
   const nuser= new user({
       name:req.body.name,
   }) 

try {
    const newUser = await nuser.save()
    res.status(201)
.json(newUser) 
}
catch (err) {
    res.status(400).json({message: err.message})
}})

// PUT : EDIT A USER BY ID  
router.patch('/:id',  async (req, res) => {
    try{
        getUser(req.params.id).then((res)=>{
                res.name=req.body.name
                res.save()
                
        })
        res.json({message: 'updated'})
    }
   
catch(err){
    res.status(400).json({message: err.message})
}
})

// DELETE : REMOVE A USER BY ID 
router.delete('/:id', async (req, res) => {
        try{
        // await getUser(req.params.id).remove()
        getUser(req.params.id).then((res)=>{
                console.log(res)
                res.remove()
        })
        res.json({message: 'deleted'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//middleware
async function getUser (id) {
    let user1
    try {
         user1= await user.findById(id)
        if (user1 === null){
            return user1

        }
    }
    catch(err){
        return "error"

    }
    
    return user1
}



module.exports = router