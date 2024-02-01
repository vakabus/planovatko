import type {Model2} from "./model"

export function loadTestData(): Model {
    return {
        rootBlock: "root",
        blocks: {
            "root": {
                children: ["first", "second"],
                title: "Root",
                time: {
                    startHour: 0,
                    endHour: 10
                }
            },
            "first": {
                title: "First child",
                children: [],
                time: {
                    startHour: 1,
                    endHour: 2
                }
            },
            "second": {
                title: "Second child",
                children: [],
                time: {
                    startHour: 3,
                    endHour: 4
                }
            }
        }
    }
}

export function loadTestData2(): Model2 {
    return {
        title: "Souskurz",
        blocks: {
            "sifrovacka": {
                title: "Krutá šifrovacka"
            },
            "rozcvicka": {
                title: "Rozcvička"
            },
            "hra": {
                title: "Akční bullshit"
            }
        },
        documents: {},
        schedule: [{
            start: 600,
            end: 4000,
            block: "rozcvicka"
        },
        {
            start: 3600*12,
            end: 3600*17,
            block: "hra"
        },
        {
            start: 3600*23,
            end: 3600*32,
            block: "sifrovacka"
        },
        {
            start: 3600*38,
            end: 3600*39,
            block: "rozcvicka"
        }]
    }
}