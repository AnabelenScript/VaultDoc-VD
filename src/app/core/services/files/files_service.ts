import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FileServices{
    private __apiUrl = "http://localhost:8081/files/";

    constructor(private __http: HttpClient){  }

    
}