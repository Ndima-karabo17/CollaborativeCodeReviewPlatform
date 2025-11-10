export type TrackSubmissionStatus = 'Pending' | 'In_review' | 'Approved' | 'Changes_requested'

export interface Project {
   id: number;
   project_name:string;
   status:TrackSubmissionStatus;
   reviewed:boolean;
   feedback_date: Date
};

export type newProject = Omit<Project, 'id' | 'feedback_date'>
export type feedbackReview = Pick<Project, 'reviewed'>