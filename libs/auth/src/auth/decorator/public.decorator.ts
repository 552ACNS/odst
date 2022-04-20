import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/** Bypasses requiring JWT in auth header */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
