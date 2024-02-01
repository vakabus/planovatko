import {writable, type Writable} from "svelte/store"

export const BLOCK_HIGHLIGHTED: Writable<string | null> = writable(null)
export const BLOCK_FOCUSED: Writable<string | null> = writable(null)