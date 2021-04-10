export interface IAnecdote {
    id: number
    date: string
    slug: string
    title: { rendered: string }
    content: { rendered: string }
    featured_media: number
    next_five: string[]
    'olaydaki_olay-tipleri': ITaxonomy[]
    olaydaki_gruplar: ITaxonomy[]
    olaydaki_kisiler: ITaxonomy[]
    olaydaki_ortamlar: ITaxonomy[]
    olaydaki_sehirler: ITaxonomy[]
}

export interface IYears {
    year: string
    posts: string
}

export interface ITaxonomy {
    term_id: number
    name: string
}