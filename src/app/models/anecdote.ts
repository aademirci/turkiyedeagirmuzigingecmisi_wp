import { IBand, ICity, IMedium, IPerson, IType } from "./taxonomy"

export interface IAnecdote {
    id: number
    date: string
    slug: string
    title: ITitle
    content: IContent
    featured_media: number
    next_five: string[]
    'olaydaki_olay-tipleri': IType[]
    olaydaki_gruplar: IBand[]
    olaydaki_kisiler: IPerson[]
    olaydaki_ortamlar: IMedium[]
    olaydaki_sehirler: ICity[]
}

export interface ITitle {
    rendered: string
}

export interface IContent {
    rendered: string
}

export interface IYears {
    year: string
    posts: string
}