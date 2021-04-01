import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class UplopadFileService{
    constructor(
        private httpClient: HttpClient,
      ) { }
    
      public uploadFile(file): Observable<{ url: string }> {
        const formData = new FormData();
        formData.append('file_url', file);
        return this.httpClient.post<{ url: string }>(`files/files/`, formData);
      }
}