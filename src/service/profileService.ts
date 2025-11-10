import {query} from '../config/database'
import bcrypt from 'bcryptjs'
import { Profile } from '../types/profile.types'

export const findProfileByEmail = async (email:string): Promise<Profile|null> =>{
    const {rows} = await query('SELECT * FROM Profile WHERE email =$1',[email]);
    return rows[0] || null;
};

export const CreateProfile = async (email:string, pictureDispl:string): Promise<Profile> =>{
    const salt = await bcrypt.genSalt(10);
    const pictureDisplay = await bcrypt.hash(pictureDispl,salt);

    const {rows} = await query('INSERT INTO  (email, pictureDisplay) VALUES ($1,$2) RETURNING id, email', [email, pictureDisplay])
    return rows[0];
};