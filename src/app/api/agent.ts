import axios, { AxiosResponse } from "axios";
import { IAnecdote, IYears } from "../models/anecdote";
import { IMedia } from "../models/media";

axios.defaults.baseURL = "https://tamg.aademirci.com/wp-json/wp/v2/"

const responseBody = (response: AxiosResponse) => response.data
const responseHeader = (response: AxiosResponse) => response.headers

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    getHeaders: (url: string) => axios.get(url).then(responseHeader)
}

const Anecdotes = {
    list: (page: number): Promise<IAnecdote[]> => requests.get(`/olay?page=${page}`),
    listByYear: (page: number, year: number): Promise<IAnecdote[]> => requests.get(`/olay?page=${page}&before=${year}-12-31T23:59:59&after=${year}-01-01T00:00:00&order=asc`),
    selected: (slug: string) => requests.get(`/olay?slug=${slug}`),
    getAttached: (id: number): Promise<IMedia[]> => requests.get(`/media?parent=${id}&per_page=100`),
    getYears: (): Promise<IYears[]> => requests.get('/olay/archives')
}

const AnecdotesHeaders = {
    list: () => requests.getHeaders('/olay'),
    listByYear: (year: number) => requests.getHeaders(`/olay?&before=${year}-12-31T23:59:59&after=${year}-01-01T00:00:00&order=asc`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { Anecdotes, AnecdotesHeaders }