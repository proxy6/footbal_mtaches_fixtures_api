import {Request, Response} from 'express'
import Team from '../model/team.model'
export const addTeam = async(req: Request, res: Response)=>{
    let {name, short_name, stadium, userId} = req.body
    //write validation
    try{
        const team = await Team.create({
            name: name,
            short_name: short_name,
            stadium: stadium,
            created_by: userId
        })
        res.status(201).json({message: "Team Created"})
    }catch(e){
        res.status(500).json({message: "Error Creating Teams"})
    }
}

export const viewAllTeams = async (req: Request, res: Response)=>{
    try{
        let team = await Team.find({})
        if(!team) res.status(404).json({message: "No Record found"})
        res.status(201).json({message: "Records Fetched", data:team})
    }catch(e){
        res.status(500).json({message: "Error Finding Teams"})
    }
}
export const viewSingleTeam = async (req: Request, res: Response)=>{
    let teamId = req.params.teamId
    try{
        let team = await Team.findOne({_id: teamId})
        if(!team) res.status(404).json({message: "No Record found"})
        res.status(201).json({message: "Record Fetched", data:team})
    }catch(e){
        res.status(500).json({message: "Error Finding Team"})
    }
}
export const editTeam = async (req: Request, res: Response)=>{
    let {name, short_name, stadium} = req.body
    let teamId = req.params.teamId
    try{
        let team = await Team.updateOne({_id: teamId}, {name, short_name, stadium})
        if(team.matchedCount == 0){
         res.status(404).json({message: "No Record found"})
        }else{
        res.status(201).json({message: "Record Edited"})
        }
    }catch(e){
        res.status(500).json({message: "Error Updating Team"})
    }
}
export const deleteTeam = async (req: Request, res: Response)=>{
    let teamId = req.params.teamId
    try{
        let team = await Team.deleteOne({_id: teamId})
        if(team.deletedCount == 0){
            res.status(404).json({message: "No Record found"})
        }else{ 
        res.status(201).json({message: "Record Deleted"})
        }
    }catch(e){
        res.status(500).json({message: "Error Deleting Team"})
    }
}