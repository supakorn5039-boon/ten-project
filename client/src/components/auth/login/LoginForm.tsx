import { FaUser, FaLock } from 'react-icons/fa';
import InputField from '@/components/Ui/Input/InputField';
import type { CredentialProps } from '@/types/Credentials';
import type { UseFormReturn } from 'react-hook-form';
import ButtonCustom from '../../Ui/button/ButtonCustom';
import Link from 'next/link';

type LoginFormProps = {
  formMethods: UseFormReturn<CredentialProps, undefined>;
  onSubmit: (data: CredentialProps) => void;
  loading?: boolean;
};

const LoginForm = ({ formMethods, onSubmit, loading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form className="space-y-6 p-8 bg-white rounded-xl shadow-lg max-w-sm w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <InputField
          register={register('username')}
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username"
          icon={<FaUser />}
          error={errors.username}
        />

        <InputField
          register={register('password')}
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          icon={<FaLock />}
          error={errors.password}
        />

        <ButtonCustom
          isLoading={loading}
          type="submit"
          label={loading ? 'กำลังบันทึก...' : 'เข้าสู่ระบบ'}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition ease-in-out duration-300 cursor-pointer"
        />

        <p className="text-center text-sm text-gray-600 mt-4">
          ยังไม่มีบัญชี?{' '}
          <Link href="/register" className="text-blue-500 hover:underline font-medium">
            ลงทะเบียน
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
