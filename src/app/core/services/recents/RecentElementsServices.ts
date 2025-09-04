import { Injectable } from "@angular/core";
import { RecentQueue } from "./Queue";
import { FolderData } from "../folders/folders_model";
import { FileData } from "../files/files_model";

@Injectable({ providedIn: "root" })
export class RecentElementsServices {
    recentFolders: RecentQueue<FolderData> = new RecentQueue<FolderData>(4, (a, b) => a.id === b.id);
    recentFiles: RecentQueue<FileData> = new RecentQueue<FileData>(10, (a, b) => a.id === b.id);

    constructor(){  }

    setToLocalStorage(){
        localStorage.setItem("recent_folders", JSON.stringify(this.recentFolders.getQueue()));
        localStorage.setItem("recent_files", JSON.stringify(this.recentFiles.getQueue()));
    }

    getFromLocalStorage(){
        const folders = localStorage.getItem("recent_folders");
        const files = localStorage.getItem("recent_files");

        if (folders)
            this.recentFolders.setQueue(JSON.parse(folders));
        if (files)
            this.recentFiles.setQueue(JSON.parse(files));
    }

    getRecentFolders(): FolderData[]{
        this.getFromLocalStorage();
        return this.recentFolders.getQueue();
    }
    
    getRecentFiles(): FileData[]{
        this.getFromLocalStorage();
        return this.recentFiles.getQueue();
    }

    setRecentFolder(data: FolderData){
        this.getFromLocalStorage();
        this.recentFolders.enQueue(data);
        this.setToLocalStorage();
    }

    setRecentFile(data: FileData){
        this.getFromLocalStorage();
        this.recentFiles.enQueue(data);
        this.setToLocalStorage();
    }
}