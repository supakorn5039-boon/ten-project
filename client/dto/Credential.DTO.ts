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
    email: 'email9683@example.com',
    password: 'pass-9683',
};

export const RegisterDefaultValue: RegisterCredentialProps = {
    username: '',
    email: '',
    password: '',
};
