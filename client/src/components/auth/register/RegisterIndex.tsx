'use client';

import { useRouter } from 'next/navigation';
import RegisterForm from './RegisterForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CredentialService } from '@/service/Credential.service';
import Cookies from 'js-cookie';
import { ToastAlert } from '@/components/Ui/Toast/Toast';
import type { AxiosError } from 'axios';
import type { CredentialProps } from '@/types/Credentials';

export default function RegisterIndex() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const formMethods = CredentialService.useCredentialForm();

  const RegisMutation = useMutation({
    mutationFn: CredentialService.RegisterCredential,
    onSuccess: (data) => {
      const { token } = data;

      Cookies.set('token', token!, { expires: 1 });

      queryClient.invalidateQueries({ queryKey: [CredentialService.QUERY_KEY] });
      router.push('/');
      ToastAlert('success', 'Register Success!');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const msg = error.response?.data.message ?? 'Register Fail!!';
      ToastAlert('error', msg);
    },
  });

  const handleSubmit = (data: CredentialProps) => {
    RegisMutation.mutate(data);
  };

  return <RegisterForm loading={RegisMutation.isPending} formMethods={formMethods} onSubmit={handleSubmit} />;
}
