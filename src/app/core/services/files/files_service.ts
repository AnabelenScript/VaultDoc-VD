import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileCreated, FileData, FileDataReceive } from "./files_model";

@Injectable({ providedIn: "root" })
export class FileServices{
    private __apiUrl = "http://localhost:8081/files/";

    constructor(private __http: HttpClient){  }

    uploadFile(
        file: File, 
        folio: string, 
        id_folder: number, 
        id_uploader: number
    ): Observable<FileCreated>{
        const formData = new FormData();
        formData.append("file", file);
        let requestJson = {
            folio: folio,
            id_folder: id_folder,
            id_uploader: id_uploader
        }
        formData.append("json", JSON.stringify(requestJson))
        return this.__http.post<FileCreated>(this.__apiUrl, formData)
    }

    getFilesByFolder(folder_id: number): Observable<FileDataReceive>{
        return this.__http.get<FileDataReceive>(this.__apiUrl + "folder/" + folder_id);
    }
}