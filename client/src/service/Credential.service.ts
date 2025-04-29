import { CredentialDefaultValue, CredentialResolver } from '@/app/dto/Credential.DTO';
import type { CredentialProps } from '@/app/types/Credentials';
import { ApiRoutes } from '@/constant/ApiRoutes';
import axiosInstance from '@/utils/axios';
import { useForm } from 'react-hook-form';

export const CredentialService = {
  QUERY_KEY: 'credentials',

  LoginCredential: async (data: CredentialProps): Promise<CredentialProps> => {
    const res = await axiosInstance.post(`${ApiRoutes.LOGiN}`, data);
    return res.data;
  },

  useCredentialForm: (initialFormData: CredentialProps = CredentialDefaultValue) => {
    const formMethod = useForm<CredentialProps>({
      defaultValues: initialFormData,
      resolver: CredentialResolver,
    });
    return formMethod;
  },
};
