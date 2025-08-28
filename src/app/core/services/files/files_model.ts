export interface FileData {
	id: number,
	departamento: string
	nombre: string
	tamano: number
	fecha: string
	folio: string
	extension: string
	id_folder: number
	id_uploader: number
	directorio: string
}

export interface FileDataReceive {
	count: number
	data: FileData[]
	message: string
}

export interface FileCreated {
	message: string
	filename: string
	size: number
	department: string
	folio: string
}

export interface FileUpdated {
	message: string
	id: number
	department: string 
	subject: string
	new_file: string
	size: number
}