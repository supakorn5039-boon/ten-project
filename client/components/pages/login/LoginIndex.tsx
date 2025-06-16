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
import type { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LoginPage(): JSX.Element {
    const router = useRouter();
    const { mutateAsync: login, isPending } = AuthService.useLoginCredential();
    const setUsername = useAuthStore(selectSetUsername);

    const { register, handleSubmit, formState } = AuthService.useLoginForm();

    const onSubmit = async (credentials: BaseCredentialProps) => {
        try {
            const { username, token } = await login(credentials);
            setUsername(username);
            Cookies.set('token', token, { expires: 1 });
            router.push(PathRoutes.OVERVIEW);
        } catch (error) {
            const message = (error as AxiosError<{ message: string }>).response?.data.message ?? 'Login failed!';
            ToastAlert('error', message);
        }
    };

    usePageTitle(PAGE_TITLES.LOGIN);

    return (
        <div className="p-8 rounded-lg border border-gray-300 shadow-md max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center gradient-color mb-8">FINANCE</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        register={register}
                        error={formState.errors.email}
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••••"
                        register={register}
                        error={formState.errors.password}
                    />

                    <ButtonCustom
                        type="submit"
                        isLoading={isPending}
                        label={isPending ? 'Logging in...' : 'Login'}
                        className="text-white w-full"
                    />
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        className="text-sm text-green-sub font-semibold w-fit hover:text-green-500"
                        onClick={() => router.push(PathRoutes.REGISTER)}
                    >
                        Create an account
                    </button>
                </div>
            </form>
        </div>
    );
}
