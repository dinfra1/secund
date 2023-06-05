const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users =  await User.findAll()
    return res.json(users)
});

const create = catchError(async (req, res) => {
    const users = req.body
    const createUser = await User.create(users)
    return res.status(201).json(createUser)
  })

const oneUser = catchError(async (req, res)=>{
    const { id } = req.params
    const oneUser = await User.findByPk(id)
    if(!oneUser) return res.status(404).json({message : "This user not exist"}) 
    return res.json(oneUser)
})

const remove = catchError(async (req, res)=>{
    const {id} = req.params
    const removeUser = await User.destroy({where :{id}})
    if(!removeUser) return res.status(404).json({message : "User not found"}) 
    return res.sendStatus(204)
})
const Update = catchError(async (req, res)=>{
    const userBody =  req.body
    const {id} = req.params
    const userUpdate = await User.update(userBody,{where: {id}, returning: true})
    if (userUpdate[0] === 0) return res.status(404).json({ message: "User not found" })
    return res.json(userUpdate)
})

module.exports = {
    getAll, 
    create,
    oneUser,
    remove, 
    Update
}