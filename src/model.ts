export type Model2 = {
    title: string
    blocks: {
        [name: string]: Block
    }
    schedule: ScheduleInterval[]
    documents: {
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

type TimeDef = {
    startHour: number
    durationHours: number
} | {
    endHour: number
    durationHours: number
} | {
    startHour: number
    endHour: number
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
        time: b1.time ?? b2.time,
        children: b1.children ?? b2.children,
        title: b1.title ?? b2.title
    }
}


const SECONDS_IN_A_DAY = 24 * 3600
export function getScheduleForDay(model: Model2, day: number): ScheduleInterval[] {
    let startTime = day * SECONDS_IN_A_DAY
    let endTime = (day + 1) * SECONDS_IN_A_DAY

    return model.schedule.filter(p => p.end > startTime && p.start < endTime).map(p => ({
        ...p,
        start: Math.max(0, p.start - startTime),
        end: Math.min(SECONDS_IN_A_DAY - 1, p.end - startTime),
    }))
}