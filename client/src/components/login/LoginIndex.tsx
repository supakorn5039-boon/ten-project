import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import LoginForm from './LoginForm';
import { CredentialService } from '@/service/Credential.service';
import { CredentialProps } from '@/app/types/Credentials';
import Cookies from 'js-cookie';
import { ToastAlert } from '../Ui/Toast/Toast';

export default function LoginIndex() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const formMethods = CredentialService.useCredentialForm();

  const LoginMutation = useMutation({
    mutationFn: CredentialService.LoginCredential,
    onSuccess: (data) => {
      const { token } = data;

      Cookies.set('token', token!, { expires: 2 });

      queryClient.invalidateQueries({ queryKey: [CredentialService.QUERY_KEY] });
      router.push('/');
      ToastAlert('success', 'Login Success!');
    },
    onError: () => {
      ToastAlert('error', 'Login Failed!');
    },
  });

  const handleSubmit = (data: CredentialProps) => {
    LoginMutation.mutate(data);
  };

  return <LoginForm formMethods={formMethods} onSubmit={handleSubmit} />;
}
