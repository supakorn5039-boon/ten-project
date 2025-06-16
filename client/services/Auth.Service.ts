import { ToastAlert } from '@/components/Ui/Toast/Toast';
import { ApiRoutes } from '@/constants/ApiRoutes';

import {
    baseCredentialSchema,
    LoginDefaultValue,
    RegisterDefaultValue,
    registerSchema,
    type BaseCredentialProps,
    type RegisterCredentialProps,
} from '@/dto/Credential.DTO';

import type { CredentialResponseProps } from '@/types/credential';
import fetchClient from '@/utils/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export const AuthService = {
    QUERY_KEY: 'auth-service',

    useRegisterCredential: () => {
        return useMutation<CredentialResponseProps, unknown, RegisterCredentialProps>({
            mutationKey: ['register'],
            mutationFn: async (credential) => {
                const { data } = await fetchClient.post(ApiRoutes.REGISTER, credential);
                return data;
            },
        });
    },

    useLoginCredential: () => {
        return useMutation<CredentialResponseProps, unknown, BaseCredentialProps>({
            mutationKey: ['login'],
            mutationFn: async (credential) => {
                const { data } = await fetchClient.post(ApiRoutes.LOGiN, credential);
                return data;
            },

            onSuccess: () => {
                ToastAlert('success', 'Login Success!');
            },
        });
    },

    useRegisterForm: () => {
        return useForm<RegisterCredentialProps>({
            defaultValues: RegisterDefaultValue,
            resolver: yupResolver(registerSchema),
            mode: 'onChange',
        });
    },

    useLoginForm: () => {
        return useForm<BaseCredentialProps>({
            defaultValues: LoginDefaultValue,
            resolver: yupResolver(baseCredentialSchema),
            mode: 'onChange',
        });
    },
};
