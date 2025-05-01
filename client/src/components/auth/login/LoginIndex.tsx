import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AxiosError } from 'axios';
import LoginForm from './LoginForm';
import { CredentialService } from '@/service/Credential.service';
import { CredentialProps } from '@/types/Credentials';
import Cookies from 'js-cookie';
import { ToastAlert } from '../../Ui/Toast/Toast';

export default function LoginIndex() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const formMethods = CredentialService.useCredentialForm();

  const LoginMutation = useMutation({
    mutationFn: CredentialService.LoginCredential,
    onSuccess: (data) => {
      const { token } = data;

      Cookies.set('token', token!, { expires: 1 });

      queryClient.invalidateQueries({ queryKey: [CredentialService.QUERY_KEY] });
      router.push('/');
      ToastAlert('success', 'Login Success!');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error.response?.data.message ?? 'Login Fail!!';
      ToastAlert('error', msg);
    },
  });

  const handleSubmit = (data: CredentialProps) => {
    LoginMutation.mutate(data);
  };

  return <LoginForm loading={LoginMutation.isPending} formMethods={formMethods} onSubmit={handleSubmit} />;
}
