import {Router} from 'express'
import { login, signUp } from '../controller/user.controller'
// import Admin from './model/admin.model'

const router = Router()
router.post('/signup', signUp)
router.post('/login', login)

export default router
