import ButtonCustom from '@/components/Ui/button/ButtonCustom';
import InputField from '@/components/Ui/Input/InputField';
import type { GoalProps } from '@/dto/Goal.DTO';
import { OverviewService } from '@/services/Overview.Service';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function GoalsForms() {
    const formMethods = OverviewService.useGoalForm;
    const querClint = useQueryClient();

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = formMethods();

    const onSubmit = async (data: GoalProps) => {};

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <InputField
                        register={register}
                        label="Target Amounts"
                        name="target"
                        type="number"
                        placeholder="20,000 ฿"
                        error={errors.target}
                    />
                    <InputField
                        register={register}
                        label="Presents Amounts"
                        name="presents"
                        type="number"
                        placeholder="Write a presents amounts here..."
                        error={errors.presents}
                    />
                    <ButtonCustom
                        type="submit"
                        // isLoading={isPending}
                        // label={isPending ? 'Logging in...' : 'Login'}
                        className="text-white w-full"
                    />
                </div>
            </form>
        </div>
    );
}
