import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TarifService {
    constructor(private _httpClient: HttpClient) { }
    getTarif() {
        return this._httpClient.get('utils/tarif/')
    }
    public changetarifStatus(id: number) {
        return this._httpClient.get(`utils/activate-deactivate-tarif/${id}/`)
    }
    public editTarif(id: number, body) {
        return this._httpClient.put(`utils/tarif/${id}/`, body)

    }
    public addTarif(body) {
        return this._httpClient.post(`utils/tarif/`, body)

    }
}