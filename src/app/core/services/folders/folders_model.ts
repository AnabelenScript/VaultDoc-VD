export interface FolderResponse {
	id: number,
	name: string,
	departamento: string,
	id_uploader: number
}

export interface FolderCreatedData {
    message: string,
    folder: FolderResponse,
    sync_status: string
}

export interface FolderData {
    id: number,
	name: string,
	departamento: string,
	id_uploader: number,
    created_at: string,
    updated_at: string
}