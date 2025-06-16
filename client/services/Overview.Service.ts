import { ApiRoutes } from '@/constants/ApiRoutes';
import { GoalDefaultValue, GoalProps, GoalScema } from '@/dto/Goal.DTO';
import fetchClient from '@/utils/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export const OverviewService = {
    QUERY_KEY: 'overview-service',

    useUpdateGoal: () => {
        return useMutation<GoalProps, unknown>({
            mutationKey: ['goal'],
            mutationFn: async (goal) => {
                const { data } = await fetchClient.post(ApiRoutes.GOAL, goal);
                return data;
            },
        });
    },

    useGoalForm: () => {
        return useForm<GoalProps>({
            defaultValues: GoalDefaultValue,
            resolver: yupResolver(GoalScema),
            mode: 'onChange',
        });
    },
};
