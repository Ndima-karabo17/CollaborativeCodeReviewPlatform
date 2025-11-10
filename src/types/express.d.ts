import { Profile } from "./profile.types"; 

declare global {
    namespace Express {
        export interface Request{
            profile?:Profile;
        }
    }
}