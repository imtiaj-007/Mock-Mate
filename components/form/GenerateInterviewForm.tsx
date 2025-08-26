'use client'

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    Trophy,
    Brain,
    User,
    Code,
    Hash,
    LoaderCircle
} from 'lucide-react';
import { interviewTypes, levels, roles, technologies } from '@/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const interviewSchema = z.object({
    type: z.enum<string[]>(
        ['behavioral', 'technical', 'mixed'],
        "Interview type is required"
    ),
    role: z.string().min(1, "Role is required"),
    level: z.enum<string[]>(
        ['entry', 'mid', 'senior'],
        "Experience level is required"
    ),
    techstack: z.array(
        z.string()
    ).min(1, "At least one technology is required"),
    amount: z.number()
        .min(1, "Must have at least 1 question")
        .max(10, "Maximum 10 questions allowed"),
    userId: z.string().min(1, "User ID is required"),
});

type FormData = z.infer<typeof interviewSchema>;

const InterviewGenerationForm = ({ userId = "user123" }: { userId?: string }) => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const steps = [
        { title: 'Interview Type', icon: Brain },
        { title: 'Role & Level', icon: User },
        { title: 'Tech Stack', icon: Code },
        { title: 'Configuration', icon: Hash },
    ];

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        trigger,
    } = useForm<FormData>({
        resolver: zodResolver(interviewSchema),
        defaultValues: {
            type: undefined,
            role: '',
            level: undefined,
            techstack: [],
            amount: 5,
            userId: userId,
        },
        mode: 'onChange',
    });

    const watchedValues = watch();

    const nextStep = async () => {
        const fieldsToValidate = getFieldsForStep(currentStep);
        const isStepValid = await trigger(fieldsToValidate);

        if (isStepValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const getFieldsForStep = (step: number) => {
        switch (step) {
            case 0: return ['type'] as const;
            case 1: return ['role', 'level'] as const;
            case 2: return ['techstack'] as const;
            case 3: return ['amount'] as const;
            default: return [] as const;
        }
    };

    const toggleTechnology = (tech: string) => {
        const currentTechstack = watchedValues.techstack || [];
        const newTechstack = currentTechstack.includes(tech)
            ? currentTechstack.filter(t => t !== tech)
            : [...currentTechstack, tech];

        return newTechstack;
    };

    const onSubmit = async (values: FormData) => {
        setLoading(true);
        try {
            const res = await fetch("/api/interview/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...values,
                    techstack: values.techstack.join(',')
                })
            });
            toast.success("Successfully generated an interview for you.");
            const interview = await res.json();
            router.push(`/interview/${interview?.doc_ref}`);

        } catch (error) {
            console.log(error)
            toast.error("Failed to generate your interview.", {
                description: "Please try again after some times."
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full max-w-4xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        {steps.map((step, index) => {
                            const StepIcon = step.icon;
                            return (
                                <div key={index} className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${index <= currentStep
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                        : 'bg-gray-700 text-gray-400'
                                        }`}>
                                        {index < currentStep ? (
                                            <CheckCircle className="w-6 h-6" />
                                        ) : (
                                            <StepIcon className="w-6 h-6" />
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium ${index <= currentStep ? 'text-white' : 'text-gray-400'
                                        }`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Step 1: Interview Type */}
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold mb-6">Choose Interview Type</h2>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {interviewTypes.map((type) => {
                                            const TypeIcon = type.icon;
                                            return (
                                                <div
                                                    key={type.value}
                                                    className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 hover:scale-105 ${field.value === type.value
                                                        ? 'border-blue-500 bg-blue-500/10'
                                                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                                                        }`}
                                                    onClick={() => field.onChange(type.value)}
                                                >
                                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-4`}>
                                                        <TypeIcon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-2">{type.label}</h3>
                                                    <p className="text-gray-400 text-sm">{type.description}</p>
                                                    {field.value === type.value && (
                                                        <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-blue-500" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            />
                            {errors.type && (
                                <p className="text-red-400 text-sm">{errors.type.message}</p>
                            )}
                        </div>
                    )}

                    {/* Step 2: Role & Level */}
                    {currentStep === 1 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Select Role</h2>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {roles.map((role) => {
                                                const RoleIcon = role.icon;
                                                return (
                                                    <div
                                                        key={role.value}
                                                        className={`cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:scale-105 ${field.value === role.value
                                                            ? 'border-blue-500 bg-blue-500/10'
                                                            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                                                            }`}
                                                        onClick={() => field.onChange(role.value)}
                                                    >
                                                        <div className="relative flex items-center space-x-3">
                                                            <RoleIcon className="w-6 h-6 text-blue-400" />
                                                            <span className="font-medium">{role.label}</span>
                                                            {field.value === role.value && (
                                                                <CheckCircle className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                />
                                {errors.role && (
                                    <p className="text-red-400 text-sm mt-2">{errors.role.message}</p>
                                )}
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Experience Level</h2>
                                <Controller
                                    name="level"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {levels.map((level) => (
                                                <div
                                                    key={level.value}
                                                    className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 hover:scale-105 ${field.value === level.value
                                                        ? 'border-blue-500 bg-blue-500/10'
                                                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                                                        }`}
                                                    onClick={() => field.onChange(level.value)}
                                                >
                                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${level.color} flex items-center justify-center mb-4`}>
                                                        <Trophy className="w-6 h-6 text-white" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-2">{level.label}</h3>
                                                    <p className="text-gray-400 text-sm">{level.description}</p>
                                                    {field.value === level.value && (
                                                        <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-blue-500" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                />
                                {errors.level && (
                                    <p className="text-red-400 text-sm">{errors.level.message}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Tech Stack */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold mb-6">Select Technologies</h2>
                            <Controller
                                name="techstack"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-3">
                                            {technologies.map((tech) => (
                                                <button
                                                    key={tech}
                                                    type="button"
                                                    className={cn(
                                                        "px-4 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 capitalize",
                                                        field.value?.includes(tech)
                                                            ? 'bg-blue-500 border-blue-500 text-white'
                                                            : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                                                    )}
                                                    onClick={() => field.onChange(toggleTechnology(tech))}
                                                >
                                                    {tech}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            Selected: {field.value?.length || 0} technologies
                                        </p>
                                    </div>
                                )}
                            />
                            {errors.techstack && (
                                <p className="text-red-400 text-sm">{errors.techstack.message}</p>
                            )}
                        </div>
                    )}

                    {/* Step 4: Configuration */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold mb-6">Final Configuration</h2>

                            {/* Summary Card */}
                            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Interview Summary</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-400">Type:</span>
                                        <span className="ml-2 capitalize">{watchedValues.type}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Role:</span>
                                        <span className="ml-2 capitalize">{watchedValues.role?.replace('-', ' ')}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Level:</span>
                                        <span className="ml-2 capitalize">{watchedValues.level}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Technologies:</span>
                                        <span className="ml-2">{watchedValues.techstack?.length || 0} selected</span>
                                    </div>
                                </div>
                            </div>

                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-4">
                                        <label className="text-lg font-semibold">Number of Questions</label>
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={field.value}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                            />
                                            <span className="bg-gray-800 px-3 py-1 rounded-lg min-w-[3rem] text-center">
                                                {field.value}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            Recommended: 5-10 questions for a focused session
                                        </p>
                                    </div>
                                )}
                            />
                            {errors.amount && (
                                <p className="text-red-400 text-sm">{errors.amount.message}</p>
                            )}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={loading || currentStep === 0}
                            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                        </button>

                        {currentStep === steps.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleSubmit(onSubmit)}
                                disabled={loading || !isValid}
                                className="flex items-center space-x-2 px-6 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                            >
                                {!loading ? (
                                    <>
                                        <span>Generate Interview</span>
                                        <CheckCircle className="size-4" />
                                    </>
                                ) : (
                                    <>
                                        <LoaderCircle className='size-4 animate-spin' />
                                        <span>Generating...</span>
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex items-center space-x-2 px-6 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all font-medium"
                            >
                                <span>Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
        </>
    );
};

export default InterviewGenerationForm;