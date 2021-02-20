// types
import { IUser } from '../types';
import { UserRole } from '../types/enums';

export const BasicUser: IUser = {
    userId: 1,
    name: 'Basic Frank',
    role: UserRole.Basic,
};

export const PremiumUser: IUser = {
    userId: 2,
    name: 'Premium Paula',
    role: UserRole.Premium,
};
