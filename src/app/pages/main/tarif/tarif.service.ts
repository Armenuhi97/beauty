import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TarifService {
    constructor(private _httpClient: HttpClient) { }
    getTarif() {
        return this._httpClient.get('utils/tarif/')
    }
}