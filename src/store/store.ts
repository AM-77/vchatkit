import { writable } from "svelte/store";

const initState = {
  name: '',
  url: ''
}

const { subscribe, update, set } = writable(initState)

export const store = () => ({ subscribe, set })

export const updateStore = (store) => update((oldStore) => ({ ...oldStore, ...store }))

export const resetStore = () => set(initState)
