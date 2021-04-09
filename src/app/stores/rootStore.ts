import { configure } from "mobx";
import { createContext } from "react"
import AnecdoteStore from "./anecdoteStore"
import CommentStore from "./commentStore"
import CommonStore from "./commonStore"

configure({ enforceActions: 'always' })

export class RootStore {
    anecdoteStore: AnecdoteStore
    commonStore: CommonStore
    commentStore: CommentStore

    constructor() {
        this.anecdoteStore = new AnecdoteStore(this)
        this.commonStore = new CommonStore(this)
        this.commentStore = new CommentStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore())