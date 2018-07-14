import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService
{
    constructor(
        private url: string,
        private http: HttpClient
    ) { }

    list(params = {})
    {
        return this.http.get(this.url, { params: params });
    }

    get(id, params = {})
    {
        return this.http.get(this.url + '/' + id, { params: params });
    }

    create(resource)
    {
        return this.http.post(this.url, resource);
    }

    update(id, resource)
    {
        return this.http.put(this.url + '/' + id, resource);
    }

    patch(id, resource)
    {
        return this.http.patch(this.url + '/' + id, resource);
    }

    delete(id)
    {
        return this.http.delete(this.url + '/' + id)
            .toPromise();
    }
}
