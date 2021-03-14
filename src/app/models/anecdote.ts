import { IBand, ICity, IMedium, IPerson, IType } from "./taxonomy";

export interface IAnecdote {
    id: number
    date: string
    slug: string
    title: ITitle
    content: IContent
    featured_media: number
    'olay-tipleri': IType[]
    gruplar: IBand[]
    kisiler: IPerson[]
    ortamlar: IMedium[]
    sehirler: ICity[]
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