import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileCreated, FileDataReceive, FileUpdated } from "./files_model";
import { blob } from "node:stream/consumers";

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

    downloadFile(file_id: number, user_id: number) {
        this.__http.get(`${this.__apiUrl}download/${file_id}/${user_id}`, {
            responseType: 'blob',
        }).subscribe((blob: Blob) => {
            const createdURL = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = `archivo_${file_id}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(createdURL);
        });
    }

    updateFile(
        id_file: number,
        id_user: number,
        file: File | null,
        folio: string,
        id_folder: number,
        id_uploader: number,
    ): Observable<FileUpdated>{
        const formData = new FormData();
        let requestJson;
        if (file)
            formData.append("file", file);
        if (folio || id_folder || id_uploader) {
            requestJson = {
                folio: folio,
                id_folder: id_folder,
                id_uploader: id_uploader
            }
        }
        formData.append("json", JSON.stringify(requestJson))
        return this.__http.put<FileUpdated>(this.__apiUrl + id_file + "/" + id_user, formData);
    }

    deleteFile(id_file: number, id_user: number): Observable<{message: string, id: number}>{
        return this.__http.delete<{message: string, id: number}>(this.__apiUrl + id_file + "/" + id_user);
    }
}