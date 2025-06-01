import * as yup from 'yup';

export const baseCredentialSchema = yup.object({
    email: yup.string().email('Email ไม่ถูกต้อง').required('กรุณากรอก Email'),
    password: yup.string().required('กรุณากรอก Password'),
});

export const registerSchema = baseCredentialSchema.shape({
    username: yup.string().required('กรุณากรอก Username'),
});

export type BaseCredentialProps = yup.InferType<typeof baseCredentialSchema>;
export type RegisterCredentialProps = yup.InferType<typeof registerSchema>;

export const LoginDefaultValue: BaseCredentialProps = {
    email: 'test@gmail.com',
    password: 'test',
};

export const RegisterDefaultValue: RegisterCredentialProps = {
    username: '',
    email: '',
    password: '',
};
