import { IdentityInterface } from './identity-interface';

export class IdentityResponse implements IdentityInterface
{
    uid: number;
    name: string;
    email: string;
}
