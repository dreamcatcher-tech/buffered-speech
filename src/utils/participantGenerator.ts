import { ParticipantProps } from '../components/Participant';

export const generateParticipant = (): ParticipantProps => {
  const id = Math.random().toString(36).substring(2, 9);
  
  // Random names
  const firstNames = [
    'Alex', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Sam', 'Jamie', 
    'Avery', 'Quinn', 'Blake', 'Dakota', 'Cameron', 'Reese', 'Finley', 'Rowan',
    'Emma', 'Liam', 'Olivia', 'Noah', 'Sophia', 'Jackson', 'Ava', 'Aiden',
    'Isabella', 'Lucas', 'Mia', 'Ethan', 'Harper', 'Mason', 'Ella', 'Logan'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Chen', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore',
    'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez',
    'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright'
  ];
  
  // Random roles
  const roles = [
    'Product Manager', 'UX Designer', 'Developer', 'Project Lead', 'QA Analyst',
    'Data Scientist', 'Content Strategist', 'Marketing Manager', 'Customer Success',
    'Research Analyst', 'Engineering Manager', 'CEO', 'CTO', 'Creative Director',
    'UI Designer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer',
    'Business Analyst', 'Sales Representative', 'HR Manager', 'Financial Analyst'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const role = roles[Math.floor(Math.random() * roles.length)];
  
  // Generate a more reliable avatar using UI Avatars service
  // This creates colored avatars with the person's initials
  const avatarUrl = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&size=100&bold=true`;
  
  return {
    id,
    name: `${firstName} ${lastName}`,
    avatarUrl,
    role,
    bufferState: {
      isPaused: Math.random() > 0.7, // 30% chance to start paused
      isBuffering: Math.random() > 0.8, // 20% chance to start buffering
      bufferSize: Math.floor(Math.random() * 5) // Random initial buffer size
    }
  };
};