import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FolderCreatedData, FolderData, FolderResponse } from "./folders_model";

@Injectable({ providedIn: "root" })
export class FolderServices {
    private __apiUrl = 'http://localhost:8081/folders/';

    constructor(private __http: HttpClient) { }

    getFolders(departament: string): Observable<{folders: FolderData[]}>{
        return this.__http.get<{folders: FolderData[]}>(this.__apiUrl + departament);
    }

    getFoldersByName(name: string): Observable<{folders: FolderData[]}>{
        return this.__http.get<{folders: FolderData[]}>(this.__apiUrl + "n/" + name);
    }

    createFolder(folder: FolderData): Observable<FolderCreatedData>{
        return this.__http.post<FolderCreatedData>(this.__apiUrl, folder)
    }
}