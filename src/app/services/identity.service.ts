import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable()
export class IdentityService extends DataService
{
    constructor(http: HttpClient)
    {
        super('/api/identities', http);
    }

}
