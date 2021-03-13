import { action, observable } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
    rootStore: RootStore

    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @observable appLoaded = false

    @action setAppLoaded = () => {
        this.appLoaded = true
    }
}