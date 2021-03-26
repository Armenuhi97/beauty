import { IUser } from '@models/index';

export interface ILoginRequest {
    role_code: string;
    username: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    user: IUser;
}
