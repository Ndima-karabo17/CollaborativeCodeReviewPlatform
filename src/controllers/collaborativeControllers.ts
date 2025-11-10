import { Request, Response } from "express";
import * as projectService from '../service/collaborativeSevice'

export const addProject = async (req: Request, res:Response) =>{
    try {
        const newProject = await projectService.createProject(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({message: 'Error in creating project'})
    }
};

export const getAllProjects = async (req:Request, res: Response) =>{
   try {
     const projects = await projectService.findAllProjects;
    res.status(200).json({projects})
    
   } catch (error) {
    res.status(500).json({message: 'Error retrieving projects'});
   }
};

export const getProjectById = async (req: Request, res:Response) =>{
    try {
        const id = parseInt(req.params.id);
        const project = await projectService.findProjectById(id);
        if(!project){
            return res.status(404).json({message:'Project not found'});
        }
        return res.status(200).json({project});
    } catch (error) {
        res.status(500).json({message: 'Error retrieving project'});
    }
;}

export const updateProjectById = async (req:Request, res: Response) =>{
    try {
        const id = parseInt(req.params.id);
        const updateProject = await projectService.updateProject(id, req.body);
        if(!updateProject){
            return res.status(404).json({message: 'Project not found'});
        }
        res.status(200).json({updateProject})
    } catch (error) {
        res.status(500).json({message: 'Error updating project'});
    }
};

export const deleteProjectById = async (req:Request, res:Response) =>{
    try {
        const id = parseInt(req.params.id);
        const deleteProject = await projectService.deleteProject(id);
        if(!deleteProject){
            return res.status(404).json({message: 'Project not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Error deleting projects'});
    }
};