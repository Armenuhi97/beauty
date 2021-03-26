import { IUser } from '@models/index';

export class MastersState {
    masters: IUser[];
}

export const initialState: MastersState = {
    masters: [],
};
