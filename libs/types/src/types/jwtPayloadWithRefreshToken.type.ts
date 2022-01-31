import { JwtPayload } from './jwtPayload.type';

export type JwtPayloadWithRefreskToken = JwtPayload & { refreshToken: string };
