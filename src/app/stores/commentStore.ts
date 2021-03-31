import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IComment } from "../models/comment";
import { RootStore } from "./rootStore";

export default class CommentStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable commentArray: IComment[] = []
    @observable loadingInitial = false

    @action loadComments = async (id: number) => {
        this.loadingInitial = true
        try {
            const comments = await agent.Comments.list(id)
            runInAction(() => {
                this.commentArray = comments.reverse()
                this.loadingInitial = false
            })
            return this.commentArray
        } catch (error) {
            console.log(error)
            this.loadingInitial = false
        }
    }
}