import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IAnecdote } from "../models/anecdote";
import { IMedia } from "../models/media";
import { RootStore } from "./rootStore";

export default class AnecdoteStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable anecdoteArray: IAnecdote[] = []
    @observable anecdote: IAnecdote | null = null
    @observable attachedMedia: IMedia[] = []
    @observable loadingInitial = false

    @action loadAnecdote = async (slug: string) => {
        this.loadingInitial = true
        try {
            const anecdote = await agent.Anecdotes.selected(slug)
            runInAction(() => {
                this.anecdote = anecdote
                this.loadingInitial = false
            })
            return anecdote
        } catch (error) {
            console.log(error)
        }
    }

    @action loadAnecdotes = async (page: number) => {
        this.loadingInitial = true
        try {
            const anecdotesHeaders = await agent.AnecdotesHeaders.list()
            const maxPages = anecdotesHeaders['x-wp-totalpages']
            
            if (page <= maxPages) {
                const anecdotes = await agent.Anecdotes.list(page)
                runInAction(() => {
                    anecdotes.forEach((anecdote, i) => {
                        this.anecdoteArray[i] = anecdote
                    })
                    this.loadingInitial = false
                })
            } else {
                runInAction(() => {
                    this.loadingInitial = false
                })
            }
            return maxPages
        } catch (error) {
            console.log(error)
            this.loadingInitial = false
        }
    }

    @action loadAnecdotesByYear = async (page:number, year: number) => {
        this.loadingInitial = true
        try {
            const anecdotesHeaders = await agent.AnecdotesHeaders.listByYear(year)
            const maxPages = anecdotesHeaders['x-wp-totalpages']

            if (page <= maxPages) {
                const anecdotes = await agent.Anecdotes.listByYear(page, year)
                runInAction(() => {
                    this.anecdoteArray = []
                    anecdotes.forEach((anecdote, i) => {
                        this.anecdoteArray[i] = anecdote
                    })
                    this.loadingInitial = false
                })
            } else {
                runInAction(() => {
                    this.loadingInitial = false
                })
            }
            return {anecdoteArray: this.anecdoteArray, maxPages}
        } catch (error) {
            console.log(error)
            this.loadingInitial = false
        }
    }

    @action getYears = async () => {
        this.loadingInitial = true
        try {
            const years = await agent.Anecdotes.getYears()
            return years
        } catch (error) {
            console.log(error)
        }
    }

    @action getAttached = async (id: number) => {
        this.loadingInitial = true
        try {
            const attachedMedia = await agent.Anecdotes.getAttached(id)
            runInAction(() => {
                this.attachedMedia = attachedMedia.reverse()
            })
            this.loadingInitial = false
        } catch (error) {
            console.log(error)
        }
    }
}