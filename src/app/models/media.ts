export interface IMedia {
    id: number
    link: string
    media_details: IMediaDetails
}

export interface IMediaDetails {
    sizes: ISizes
}

export interface ISizes {
    thumbnail: ISize
    medium: ISize
    full: ISize
}

export interface ISize {
    source_url: string
}