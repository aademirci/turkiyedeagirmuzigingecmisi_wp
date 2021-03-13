import { configure } from "mobx";
import { createContext } from "react";
import AnecdoteStore from "./anecdoteStore";
import CommonStore from "./commonStore";
import TaxonomyStore from "./taxonomyStore";

configure({ enforceActions: 'always' })

export class RootStore {
    anecdoteStore: AnecdoteStore
    taxonomyStore: TaxonomyStore
    commonStore: CommonStore

    constructor() {
        this.anecdoteStore = new AnecdoteStore(this)
        this.taxonomyStore = new TaxonomyStore(this)
        this.commonStore = new CommonStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore())