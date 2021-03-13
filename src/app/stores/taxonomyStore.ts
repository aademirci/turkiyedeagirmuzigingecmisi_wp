import { action, observable, runInAction } from "mobx"
import agent from "../api/agent"
import { IType, IBand, ICity, IMedium, IPerson } from "../models/taxonomy"
import { RootStore } from "./rootStore"

export default class TaxonomyStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable type: IType | null = null
    @observable band: IBand | null = null
    @observable person: IPerson | null = null
    @observable medium: IMedium | null = null
    @observable city: ICity | null = null
    @observable loadingTaxonomy = false

    @action getType = async (id: number) => {
        this.loadingTaxonomy = true
        try {
            const type = await agent.Types.selected(id)
            runInAction(() => {
                this.type = type
                this.loadingTaxonomy = false
            })
            return type
        } catch (error) {
            console.log(error)
        }
    }

    @action getBand = async (id: number) => {
        this.loadingTaxonomy = true
        try {
            const band = await agent.Bands.selected(id)
            runInAction(() => {
                this.band = band
                this.loadingTaxonomy = false
            })
            return band
        } catch (error) {
            console.log(error)
        }
    }

    @action getPerson = async (id: number) => {
        this.loadingTaxonomy = true
        try {
            const person = await agent.People.selected(id)
            runInAction(() => {
                this.person = person
                this.loadingTaxonomy = false
            })
            return person
        } catch (error) {
            console.log(error)
        }
    }

    @action getMedia = async (id: number) => {
        this.loadingTaxonomy = true
        try {
            const medium = await agent.Medium.selected(id)
            runInAction(() => {
                this.medium = medium
                this.loadingTaxonomy = false
            })
            return medium
        } catch (error) {
            console.log(error)
        }
    }

    @action getCity = async (id: number) => {
        this.loadingTaxonomy = true
        try {
            const city = await agent.Cities.selected(id)
            runInAction(() => {
                this.city = city
                this.loadingTaxonomy = false
            })
            return city
        } catch (error) {
            console.log(error)
        }
    }
}