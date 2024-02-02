export type Model2 = {
    title: string
    blocks: {
        [name: string]: Block
    }
    schedule: ScheduleInterval[]
    documents: {
        /**
         * The id is a human readable ID. Probably visible only in the editor.
         */
        [id: string]: Document
    }
}

export type ScheduleInterval = {
    start: number
    end: number
    block: string
}

export type Document = {
    type: "markdown" | "image" | "html"
    data: string
}

export type Block = {
    title?: string
    extends?: string[]
}

export function getBlock(model: Model2, blockName: string): Block {
    if (model.blocks[blockName] === undefined) alert(`block "${blockName}" is not defined but referenced`)

    return resolveInheritance(model.blocks[blockName], model)
}

function resolveInheritance(block: Block, model: Model2): Block {
    let result = block
    let resolutionQueue = [...(block.extends ?? [])]

    while (resolutionQueue.length > 0) {
        let current = model.blocks[resolutionQueue[0]]

        // update the resolution queue
        resolutionQueue = [...(current.extends ?? []), ...resolutionQueue.slice(1)]

        // merge the block
        result = merge(result, current)
    }

    return result
}

function merge(b1: Block, b2: Block): Block {
    return {
        extends: b1.extends ?? b2.extends,
        title: b1.title ?? b2.title
    }
}


export const SECONDS_IN_A_DAY = 24 * 3600
export function getScheduleForDay(model: Model2, day: number): [number, ScheduleInterval][] {
    let startTime = day * SECONDS_IN_A_DAY
    let endTime = (day + 1) * SECONDS_IN_A_DAY

    /* filter out intervals valid within a day */
    let result: [number, ScheduleInterval][] = []
    for (let entry of model.schedule.entries()) {
        let int = entry[1]
        if (int.end > startTime && int.start < endTime) {
            result.push(entry)
        }
    }
    return result
}


export function secondsToClock(seconds: number): string {
    let days = Math.floor(seconds / SECONDS_IN_A_DAY)
    seconds = seconds % SECONDS_IN_A_DAY
    let hours = Math.floor(seconds / 3600);
    let hoursStr = hours.toString().padStart(2, "0");
    let minutes = Math.round((seconds % 3600) / 60);
    let minutesStr = minutes.toString().padStart(2, "0");
    if (hours < 0 || minutes < 0) return "_";
    return `day ${days+1} @ ${hoursStr}:${minutesStr}`;
}

export function parseTime(time: string): number {
    console.log(time)
    let [day, clock] = time.split("@")
    let ts = (Number.parseInt(day.trim().substring(4)) - 1) * SECONDS_IN_A_DAY

    let [hours, minutes] = clock.split(":")
    ts += Number.parseInt(hours.trim()) * 3600
    ts += Number.parseInt(minutes.trim()) * 60
    return ts
}

export function getAllSuperblocks(model: Model2, me: string): Set<string> {
    let res: Set<string> = new Set()
    let worklist = [me]
    while (worklist.length > 0) {
        let current = worklist.pop()!
        res.add(current)
        for (let e of model.blocks[current].extends ?? []) {
            worklist.push(e)
        }
    }
    return res
}