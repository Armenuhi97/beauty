import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { City, Country } from "@models/country-city";
import { ServerResponse } from "@models/server-respoce";
import { Observable } from "rxjs";

@Injectable()
export class CountryService {
    constructor(private _httpClinet: HttpClient) { }
    public getCountriesList(): Observable<ServerResponse<Country[]>> {
        return this._httpClinet.get<ServerResponse<Country[]>>('utils/country/?limit=10000')
    }
    public addCountry(body: Country) {
        return this._httpClinet.post('utils/country/', body)
    }
    public changeCountry(id: number, body: Country) {
        return this._httpClinet.put(`utils/country/${id}/`, body)
    }
    public deleteCountry(id: number) {
        return this._httpClinet.delete(`utils/country/${id}/`)
    }

    public getCitiesList(countryId: number): Observable<ServerResponse<City[]>> {
        return this._httpClinet.get<ServerResponse<City[]>>(`utils/city/?limit=10000&country=${countryId}`)
    }
    public addCity(body: City) {
        return this._httpClinet.post('utils/city/', body)
    }
    public changeCity(id: number, body: City) {
        return this._httpClinet.put(`utils/city/${id}/`, body)
    }
    public deleteCity(id: number) {
        return this._httpClinet.delete(`utils/city/${id}/`)
    }
    // utils/city/?country=1
}