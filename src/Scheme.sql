CREATE TABLE Profile(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    picturedispl(100) NOT NULL
);
CREATE TYPE TrackSubmissionStatus AS ENUM(
    'Pending',
    'In_review',
    'Approved',
    'Changes_requested'
);
CREATE TABLE Projects (
    id SERIAL PRIMARY KEY,
    projectName VARCHAR(255) NOT NULL,
    status TrackSubmissionStatus NOT NULL DEFAULT 'Pending',
    reviewed BOOLEAN NOT NULL,
    feedbackDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    comment VARCHAR(255) NOT NULL,
    commentDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE
);

