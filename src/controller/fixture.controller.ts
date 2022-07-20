import {Request, Response} from 'express'
import crypto from 'crypto'
import {v4 as uuidv4} from 'uuid'
import Fixture from '../model/fixtures.model'
import FixtureLink from '../model/fixture_link.model'

export const createFixture = async(req: Request, res: Response)=>{
    let {home_team, away_team, season, userId, matchtime} = req.body
    let id = uuidv4()
    let link = `https://${req.headers.host}${req.baseUrl}/${id}`
    try{
        let fixture = new Fixture({
            home_team:home_team,
            away_team: away_team,
            season: season,
            created_by: userId,
            matchtime: matchtime
        })
        console.log(fixture._id)
        await fixture.save()
         //  Convert Fixture_,id Id (ObjectId) to a string
         const fixtureId = fixture._id.toHexString();
        let fixture_link = new FixtureLink({
            fixture: fixtureId,
            link: link,
            created_by: userId
        })
        console.log(fixture_link)
        await fixture_link.save()
        res.status(201).json({message: "fixture created", data:{unque_link: fixture_link.link}})
    }catch(e){
        res.status(500).json({message: "Error Creating Fixture"})
    }

}
export const viewFixtureByUniqueLink = async(req: Request, res: Response)=>{
    let uniqueLink = req.params.uniqueLink
    console.log(req.params)
    // try{
    //     let fixture = await FixtureLink.findOne({})
    // }catch(e){
    //     res.status(500).json({message: "Error Fetching Fixture"})
    // }
}
export const getAllFixtures = async(req: Request, res: Response)=>{
    try{
        let fixtures = await Fixture.find()
        if(!fixtures) res.status(404).json({message: "No Record Found"})
        res.status(201).json({message: "Records Fetched", data: fixtures})
    }catch(e){
        res.status(500).json({message: "Error Fetching Records"})
    }
}
export const getSingleFixture = async(req: Request, res: Response)=>{
    let fixtureId =  req.params.fixtureId
    try{
        let fixture = await Fixture.findOne({_id: fixtureId})
        if(!fixture) res.status(404).json({message: "No Record Found"})
        res.status(201).json({message: "Record Fetched", data: fixture})
    }catch(e){
        res.status(500).json({message: "Error Fetching Record"})
    }
}

export const editFixture = async(req: Request, res: Response)=>{
    let {home_team, away_team, home_team_score, away_team_score, season, matchtime, created_by} =  req.body
    let fixtureId =  req.params.fixtureId
    try{
        let fixture = await Fixture.updateOne({_id: fixtureId}, {
            home_team,
            away_team,
            home_team_score,
            away_team_score, 
            season, 
            matchtime, 
            created_by
        })
        if(fixture.matchedCount == 0) return res.status(404).json({message: "No Record Found"})
        return res.status(201).json({message: "Record Edited"})
    }catch(e){
        res.status(500).json({message: "Error Editing Record"})
    }
}
export const deleteFixture = async(req: Request, res: Response)=>{
    let fixtureId =  req.params.fixtureId
    try{
        let fixture = await Fixture.deleteOne({_id: fixtureId})
        if(fixture.deletedCount == 0) return res.status(404).json({message: "No Record Found"})
        return res.status(201).json({message: "Record Deleted"})
    }catch(e){
        res.status(500).json({message: "Error Deleting Record"})
    }
}
export const pendingFixture = async(req: Request, res: Response)=>{
    //get current data and search db by matchtime
    let {id} = req.body
    let date = Date.now()
    console.log(date)
    let fixture = await Fixture.findOne({_id: id})
    console.log(fixture?.matchtime)
    res.send('done')

    // try{
    //     let date = Date.now()
    //     console.log(date)
    //     let fixture = await Fixture.find()
    //     if(!fixture) return res.status(404).json({message: "No Record Found"})
    //     fixture.forEach(data=>{
    //         if(data.matchtime < date){
    //             console.log(data.id)
    //         }
    //     })
    //     return res.status(201).json({message: "Records Fetched", data: fixture})
    // }catch(e){
    //     res.status(500).json({message: "Error Fetching Record"})
    // }
}
