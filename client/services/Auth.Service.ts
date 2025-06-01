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
import { useForm } from 'react-hook-form';

export const AuthService = {
    QUERY_KEY: 'auth-service',

    RegisterCredential: async (data: RegisterCredentialProps): Promise<CredentialResponseProps> => {
        const res = await fetchClient.post(ApiRoutes.REGISTER, data);
        return res.data;
    },

    LoginCredential: async (data: BaseCredentialProps): Promise<CredentialResponseProps> => {
        const res = await fetchClient.post(ApiRoutes.LOGiN, data);
        return res.data;
    },

    useRegisterForm: () => {
        return useForm<RegisterCredentialProps>({
            defaultValues: RegisterDefaultValue,
            resolver: yupResolver(registerSchema),
        });
    },

    useLoginForm: () => {
        return useForm<BaseCredentialProps>({
            defaultValues: LoginDefaultValue,
            resolver: yupResolver(baseCredentialSchema),
        });
    },
};
