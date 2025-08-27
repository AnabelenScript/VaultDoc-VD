import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileData, FileDataReceive } from "./files_model";

@Injectable({ providedIn: "root" })
export class FileServices{
    private __apiUrl = "http://localhost:8081/files/";

    constructor(private __http: HttpClient){  }

    getFilesByFolder(folder_id: number): Observable<FileDataReceive>{
        return this.__http.get<FileDataReceive>(this.__apiUrl + "folder/" + folder_id);
    }
}