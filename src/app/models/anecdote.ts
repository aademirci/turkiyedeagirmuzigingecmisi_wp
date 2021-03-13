export interface IAnecdote {
    id: number
    date: string
    slug: string
    title: ITitle
    content: IContent
    featured_media: number
    'olay-tipleri': Array<number>
    gruplar: Array<number>
    kisiler: Array<number>
    ortamlar: Array<number>
    sehirler: Array<number>
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