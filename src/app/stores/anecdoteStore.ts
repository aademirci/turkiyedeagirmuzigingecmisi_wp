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
    @observable media: IMedia | null = null
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

    @action loadAnecdotes = async () => {
        this.loadingInitial = true
        try {
            const anecdotes = await agent.Anecdotes.list()
            runInAction(() => {
                anecdotes.forEach((anecdote, i) => {
                    this.anecdoteArray[i] = anecdote
                })
                this.loadingInitial = false
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action loadAnecdotesByYear = async (year: number) => {
        this.loadingInitial = true
        try {
            const anecdotes = await agent.Anecdotes.listByYear(year)
            runInAction(() => {
                this.anecdoteArray = []
                anecdotes.forEach((anecdote, i) => {
                    this.anecdoteArray[i] = anecdote
                })
                this.loadingInitial = false
            })
            return this.anecdoteArray
        } catch (error) {
            console.log(error)
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

    @action getFeaturedImage = async (id: number) => {
        this.loadingInitial = true
        try {
            const media = await agent.Media.selected(id)
            runInAction(() => {
                this.media = media
                this.loadingInitial = false
            })
            return media
        } catch (error) {
            console.log(error)
        }
    }

    @action getAttachedImages = async (id: number) => {
        this.loadingInitial = true
        try {
            const attachedMedia = await agent.Anecdotes.getMedia(id)
            runInAction(() => {
                this.attachedMedia = []
                attachedMedia.forEach((media, i) => {
                    this.attachedMedia[i] = media
                })
                this.loadingInitial = false
            })
            return this.attachedMedia
        } catch (error) {
            console.log(error)
        }
    }
}