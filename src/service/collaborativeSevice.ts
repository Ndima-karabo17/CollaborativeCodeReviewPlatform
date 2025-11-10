import {query} from '../config/database'
import {Project, newProject} from '../types/collaboratives.types'

export const createProject = async (appData: newProject): Promise<Project[]> =>{
    const {project_name, status,reviewed} = appData
    const {rows} = await query(
        'INSERT INTO Projects (project_name, status,reviewed) VALUES ($1, $2, $3) RUTURNING *',
        [project_name, status, reviewed]);
    return rows
};

export const findAllProjects = async (): Promise<Project[]> =>{
    const {rows} = await query(
        'SELECT * FROM Projects ORDER BY project_name'
    );
    return rows;
}

export const findProjectById = async (id: number): Promise<Project | null> =>{

    const {rows} = await query('SELECT * FROM Projects WHERE id = $1',[id]);
    return rows[0] || null;
}

export const updateProject = async (id:number, appData:Project): Promise<Project |null> =>{
    const {status} = appData
    const {rows} = await query('UPDATE Projects SET status = $1 RETURNING *', [status,id]);
    return rows[0] || null;
}

export const deleteProject = async (id:number):Promise<Project | null> =>{
    const {rows} = await query('DELETE FROM Project WHERE id = $1 RETURNING *', [id]);
    return rows[0] || null;
}