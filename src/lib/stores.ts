import {writable, type Writable} from "svelte/store"
import type { Model2 } from "../model"

export const BLOCK_HIGHLIGHTED: Writable<string | null> = writable(null)
export const BLOCK_FOCUSED: Writable<string | null> = writable(null)
export const MODEL: Writable<Model2 | null> = writable(null)