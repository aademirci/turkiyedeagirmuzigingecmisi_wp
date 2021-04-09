import { action, observable, runInAction } from "mobx"
import agent from "../api/agent"
import { IAnecdote } from "../models/anecdote"
import { IMedia } from "../models/media"
import { RootStore } from "./rootStore"

export default class AnecdoteStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable anecdoteArray: IAnecdote[] = []
    @observable nextFive: IAnecdote[] = []
    @observable anecdote: IAnecdote | undefined = undefined
    @observable attachedMedia: IMedia[] = []
    @observable loadingInitial = false

    @action loadAnecdote = async (slug: string) => {
        this.loadingInitial = true
        try {
            const anecdote = await agent.Anecdotes.selected(slug)
            runInAction(() => {
                this.anecdote = anecdote[0]
                this.loadingInitial = false
            })
            return this.anecdote
        } catch (error) {
            console.log(error)
        }
    }

    @action loadNextAnecdotes = async (slugs: string[]) => {
        this.loadingInitial = true
        try {
            this.nextFive = []
            for (const slug of slugs) {
                const anecdote = await agent.Anecdotes.selected(slug)
                
                this.nextFive = [...this.nextFive, anecdote[0]]
            }
            this.loadingInitial = false
        } catch (error) {
            console.log(error)
        }
    }

    @action loadAnecdotes = async (page: number, year: number, order: string) => {
        this.loadingInitial = true
        try {
            const anecdotesHeaders = year === 0 ? await agent.AnecdotesHeaders.list() : await agent.AnecdotesHeaders.listByYear(year)
            const maxPages = anecdotesHeaders['x-wp-totalpages']
            
            if (page <= maxPages) {
                const anecdotes = year === 0 ? await agent.Anecdotes.list(page, order) : await agent.Anecdotes.listByYear(page, year, order)
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