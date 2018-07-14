import { IdentityInterface } from './identity-interface';

export class IdentityRequest implements IdentityInterface
{
    uid: number;
    name: string;
    email: string;
    password: string;
}
