import { ITitle } from "./anecdote";

export interface IMedia {
    id: number
    link: string
    title: ITitle
    description: IDescription
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
    width: number
    source_url: string
}

export interface IDescription {
    rendered: string
}