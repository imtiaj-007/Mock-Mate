import InterviewGenerationForm from "@/components/form/GenerateInterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const InterviewGenerationPage = async () => {
    const user = await getCurrentUser();

    return (
        <>
            <div className="space-y-2">
                <h3>Create Your Interview</h3>
                <p>Customize your mock interview experience</p>
            </div>
            <InterviewGenerationForm
                userId={user?.id}
            />
        </>
    );
};

export default InterviewGenerationPage;