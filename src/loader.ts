import type {Model} from "./model"

export function loadTestData2(): Model {
    return {
        title: "Souskurz",
        blocks: {
            "praktikalie": {
                title: "Nějaké praktikálie"
            },
            "rozcvicka": {
                title: "Rozcvička",
                extends: ["jidlo", "praktikalie"]
            },
            "hra": {
                title: "Nějaká hra"
            },
            "sifrovacka": {
                title: "Krutá šifrovacka",
                extends: ["hra"]
            },
            "hra-krizove-situace": {
                title: "Hra s tématem krizové situace",
                extends: ["hra"]
            },
            "hra-zodpovednost": {
                title: "Hra s tématem zodpovědnost",
                extends: ["hra"],
            },
            "jidlo": {
                title: "Jídlo",
                extends: ["praktikalie"]
            },
            "vecere": {
                title: "Večeře",
                extends: ["jidlo"]
            },
            "obed": {
                title: "Oběd",
                extends: ["jidlo"]
            },
            "snidane": {
                title: "Snídaně",
                extends: ["jidlo"]
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

export async function loadFromCloud(): Promise<Model> {
    let data = await fetch(url)
    return await data.json()
}

export async function saveToCloud(model: Model) {
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