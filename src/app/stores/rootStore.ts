import { configure } from "mobx";
import { createContext } from "react";
import AnecdoteStore from "./anecdoteStore";
import CommonStore from "./commonStore";

configure({ enforceActions: 'always' })

export class RootStore {
    anecdoteStore: AnecdoteStore
    commonStore: CommonStore

    constructor() {
        this.anecdoteStore = new AnecdoteStore(this)
        this.commonStore = new CommonStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore())