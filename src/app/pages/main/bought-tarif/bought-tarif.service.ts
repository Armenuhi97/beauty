import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class BoughtTarifService {
    constructor(private _httpClient: HttpClient) { }
}