import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class BoughtTarifService {
    constructor(private _httpClient: HttpClient) { }
    public getBoughtTarifs(offset: number, sort?: string) {

        let url = `userdetails/master-tarif-subscribtion/?offset=${offset}`;
        if (sort) {
            url += `&ordering=${sort}expire_date`
        }
        return this._httpClient.get(url)
    }
}