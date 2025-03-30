import express from "express"
const router=express.Router()

router.get('/register',userRegister)

export default router