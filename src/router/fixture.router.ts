import {Router} from 'express'
import { pendingFixture, createFixture, deleteFixture, editFixture, getAllFixtures, getSingleFixture, viewFixtureByUniqueLink } from '../controller/fixture.controller'

const router = Router();
router.post('/', createFixture)

router.get('/', getAllFixtures)
router.get('/:fixtureId', getSingleFixture)
router.patch('/edit/:fixtureId', editFixture)
router.delete('/delete/:fixtureId', deleteFixture)
router.get('/pending', pendingFixture)
router.get('/pending')
router.get('/unique/:uniqueLink', viewFixtureByUniqueLink)


export default router
