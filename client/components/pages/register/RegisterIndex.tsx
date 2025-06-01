'use client';

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import ButtonCustom from '@/components/Ui/button/ButtonCustom';
import InputField from '@/components/Ui/Input/InputField';
import { ToastAlert } from '@/components/Ui/Toast/Toast';
import { PAGE_TITLES } from '@/constants/pageTitle';
import { PathRoutes } from '@/constants/PathRoutes';
import type { RegisterCredentialProps } from '@/dto/Credential.DTO';
import { usePageTitle } from '@/hooks/usePageTitle';
import { AuthService } from '@/services/Auth.Service';

export default function RegisterPage(): React.ReactElement {
    const router = useRouter();
    const useFormMethods = AuthService.useRegisterForm;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useFormMethods();

    const registerMutation = useMutation({
        mutationFn: AuthService.RegisterCredential,
        onSuccess: () => {
            router.push(PathRoutes.LOGIN);
            ToastAlert('success', 'Register Success!');
        },

        onError: (error: AxiosError<{ message: string }>) => {
            const message = error.response?.data.message ?? 'Register Failed!';
            ToastAlert('error', message);
        },
    });

    const onSubmit = (data: RegisterCredentialProps) => registerMutation.mutateAsync(data);

    usePageTitle(PAGE_TITLES.REGISTER);

    return (
        <div className="p-8 rounded-lg border border-gray-300 shadow-md max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center gradient-color mb-4">FINANCE</h1>
            <p className="text-lg font-semibold text-center mb-6">Create an account</p>

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
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    error={errors.username}
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
                    onClick={handleSubmit(onSubmit)}
                    isLoading={registerMutation.isPending}
                    label={registerMutation.isPending ? 'Registering...' : 'Register'}
                    className="text-white w-full"
                />
            </div>

            <div className="mt-6 flex justify-center items-center space-x-1 text-sm">
                <span>Already have an account?</span>
                <button
                    type="button"
                    onClick={() => router.push(PathRoutes.LOGIN)}
                    className="text-green-sub font-semibold hover:text-green-500"
                >
                    Sign in here
                </button>
            </div>
        </div>
    );
}
