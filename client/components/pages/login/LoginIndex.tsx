'use client';

import ButtonCustom from '@/components/Ui/button/ButtonCustom';
import InputField from '@/components/Ui/Input/InputField';
import { ToastAlert } from '@/components/Ui/Toast/Toast';
import { PAGE_TITLES } from '@/constants/pageTitle';
import { PathRoutes } from '@/constants/PathRoutes';
import type { BaseCredentialProps } from '@/dto/Credential.DTO';
import { usePageTitle } from '@/hooks/usePageTitle';
import { AuthService } from '@/services/Auth.Service';
import { selectSetUsername, useAuthStore } from '@/store/useAuthStore';
import type { CredentialResponseProps } from '@/types/credential';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LoginIndex(): React.ReactElement {
    const formMethods = AuthService.useLoginForm;
    const querClint = useQueryClient();
    const setUsername = useAuthStore(selectSetUsername);

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = formMethods();

    const LoginMutation = useMutation({
        mutationFn: AuthService.LoginCredential,
        onSuccess: ({ username, token }: CredentialResponseProps) => {
            Cookies.set('token', token, { expires: 1 });
            setUsername(username);
            querClint.invalidateQueries({ queryKey: [AuthService.QUERY_KEY] });
            ToastAlert('success', 'Login Success!');
            router.push(PathRoutes.OVERVIEW);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const msg = error.response?.data.message ?? 'Login Failed!!';
            ToastAlert('error', msg);
        },
    });

    const onSubmit = (data: BaseCredentialProps) => LoginMutation.mutateAsync(data);

    usePageTitle(PAGE_TITLES.LOGIN);

    return (
        <div className="p-8 rounded-lg border border-gray-300 shadow-md">
            <h1 className="text-3xl font-bold text-center gradient-color mb-8">FINANCE</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <InputField
                        register={register}
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        error={errors.email}
                    />

                    <InputField
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••••"
                        error={errors.password}
                    />

                    <ButtonCustom
                        type="submit"
                        isLoading={LoginMutation.isPending}
                        label={LoginMutation.isPending ? 'Logining...' : 'Login'}
                        className="text-white w-full"
                    />
                </div>

                <div className="mt-[1.5rem] flex justify-center">
                    <button
                        type="button"
                        className="text-base text-green-sub font-semibold w-fit hover:text-green-500"
                        onClick={() => router.push(PathRoutes.REGISTER)}
                    >
                        Create an account
                    </button>
                </div>
            </form>
        </div>
    );
}
