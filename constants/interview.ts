import {
    Code,
    Brain,
    Monitor,
    Database,
    Users,
    Briefcase,
    Trophy,
    Star,
    Zap
} from 'lucide-react';

export const interviewCovers: string[] = [
    "/adobe.png",
    "/amazon.png",
    "/facebook.png",
    "/hostinger.png",
    "/pinterest.png",
    "/quora.png",
    "/reddit.png",
    "/skype.png",
    "/spotify.png",
    "/telegram.png",
    "/tiktok.png",
    "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
    {
        id: "1",
        userId: "user1",
        role: "Frontend Developer",
        type: "Technical",
        techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        level: "Junior",
        questions: ["What is React?"],
        finalized: false,
        createdAt: "2024-03-15T10:00:00Z",
    },
    {
        id: "2",
        userId: "user1",
        role: "Full Stack Developer",
        type: "Mixed",
        techstack: ["Node.js", "Express", "MongoDB", "React"],
        level: "Senior",
        questions: ["What is Node.js?"],
        finalized: false,
        createdAt: "2024-03-14T15:30:00Z",
    },
];

export const interviewTypes = [
    {
        value: 'behavioral' as const,
        label: 'Behavioral',
        description: 'Focus on soft skills and past experiences',
        icon: Brain,
        color: 'from-purple-500 to-pink-500'
    },
    {
        value: 'technical' as const,
        label: 'Technical',
        description: 'Test technical knowledge and problem-solving',
        icon: Code,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        value: 'mixed' as const,
        label: 'Mixed',
        description: 'Combination of behavioral and technical',
        icon: Zap,
        color: 'from-green-500 to-emerald-500'
    },
];

export const roles = [
    { value: 'software-developer', label: 'Software Developer', icon: Monitor },
    { value: 'data-analyst', label: 'Data Analyst', icon: Database },
    { value: 'product-manager', label: 'Product Manager', icon: Briefcase },
    { value: 'hr-specialist', label: 'HR Specialist', icon: Users },
    { value: 'project-manager', label: 'Project Manager', icon: Trophy },
    { value: 'ui-ux-designer', label: 'UI/UX Designer', icon: Star },
];

export const levels = [
    {
        value: 'entry' as const,
        label: 'Entry Level',
        description: '0-2 years of experience',
        color: 'from-green-400 to-green-600'
    },
    {
        value: 'mid' as const,
        label: 'Mid Level',
        description: '2-5 years of experience',
        color: 'from-yellow-400 to-orange-500'
    },
    {
        value: 'senior' as const,
        label: 'Senior Level',
        description: '5+ years of experience',
        color: 'from-red-400 to-red-600'
    },
];