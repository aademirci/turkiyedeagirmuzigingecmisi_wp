import axios, { AxiosResponse } from "axios";
import { IAnecdote, IYears } from "../models/anecdote";
import { IMedia } from "../models/media";
import { IBand } from "../models/taxonomy";

axios.defaults.baseURL = "https://tamg.aademirci.com/wp-json/wp/v2/"

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => axios.get(url, { cancelToken: source.token }).then(responseBody)
}

const Anecdotes = {
    list: (): Promise<IAnecdote[]> => requests.get('/olay'),
    listByYear: (year: number): Promise<IAnecdote[]> => requests.get(`/olay?before=${year}-12-31T23:59:59&after=${year}-01-01T00:00:00&order=asc`),
    selected: (slug: string) => requests.get(`/olay?slug=${slug}`),
    getMedia: (id: number): Promise<IMedia[]> => requests.get(`/media?parent=${id}`),
    getYears: (): Promise<IYears[]> => requests.get('/olay/archives')
}

const Media = {
    selected: (id: number) => requests.get(`/media/${id}`)
}

const Types = {
    selected: (id: number) => requests.get(`/olay-tipleri/${id}`)
}

const Bands = {
    list: (): Promise<IBand[]> => requests.get('/gruplar'),
    selected: (id: number) => requests.get(`/gruplar/${id}`) 
}

const People = {
    selected: (id: number) => requests.get(`/kisiler/${id}`)
}

const Medium = {
    selected: (id: number) => requests.get(`/ortamlar/${id}`)
}

const Cities = {
    selected: (id: number) => requests.get(`/sehirler/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { Anecdotes, Media, Types, Bands, People, Medium, Cities }