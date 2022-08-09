import { writable } from "svelte/store";

const initState = false

const { subscribe, update, set } = writable(initState)

export const darkMode = () => ({ subscribe })

export const updateDarkMode = ((darkMode) => { update(() => darkMode) })

export const resetDarkMode = () => { set(initState) }
