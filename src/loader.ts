import type {Model2} from "./model"

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


/* temporary solution for sharing the same test data between multiple devices */
const url = "https://getpantry.cloud/apiv1/pantry/7cfa6df3-5056-4b53-a0a1-40e7cc526b3e/basket/newBasket65"

export async function loadFromCloud(): Promise<Model2> {
    let data = await fetch(url)
    return await data.json()
}

export async function saveToCloud(model: Model2) {
    console.log(JSON.stringify(model))
    await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(model),
        mode: "cors"
    })
}