import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Resolver } from 'react-hook-form';

const CredentialSchema = z.object({
  username: z.string().min(1, 'กรุณากรอก Username'),
  password: z.string().min(1, 'กรุณากรอก Password'),
});

export type CredentialSchemaProps = z.infer<typeof CredentialSchema>;

export const CredentialDefaultValue: CredentialSchemaProps = {
  username: '',
  password: '',
};

export const CredentialResolver: Resolver<CredentialSchemaProps> = zodResolver(CredentialSchema);
