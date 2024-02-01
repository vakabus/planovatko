# Plánovátko

Úplně vše je work-in-progress, včetně jména.

## Design goals

Appka se snaží dosáhnout cílu napsaných níže. Cíle jsou zde napsány v pořadí dle důležitosti, takže pokud jsou dva cíle ohledně něčeho v rozporu, vyhrává ten napsaný výše.

1. Aplikace umožňuje zaznamenat a vizualizovat kompletní plán akce.
2. Lidé z netechnického prostředí jsou schopni aplikaci efektivně používat pro zobrazování dat.
3. Aplikace je použitelná i offline a na mobilu.
4. V průběhu akce aplikace uživateli aktivně nabízí informace o stávajícím a nadcházejích programech.

5. Aplikace přímo podporuje práci s metodikou zážitkové pedagogiky.
6. Aplikace nabízí pokročilé funkce na analýzu scénáře (hlavně něco ve stylu heat mapy nad scénářem)
7. Aplikace umožňuje zaznamenávat reálný průběh akce.


## Technické provedení (WIP)

* webová appka napsaná ve TypeScriptu + Svelte, všechno client-side, server maximálně tak na hostování dat
* jeden statický JSON je data model, appka ho akorát zobrazuje / edituje
* \[možný nápad do budoucna\] použít Tailwind CSS?
* \[možný nápad do budoucna\] implementace po vzoru TiddlyWiki jako quine, tj. appka vyexportuje html soubor, který obsahuje všechna data a appku samotnou
* \[možný nápad do budoucna\] implementace umí využívat Google Drive na ukládání a načítání dat (nejlépe v kombinaci s nápadem výše)


## Datový model (WIP)

- Model reprezentuje plán akce.
- Plán akce obsahuje množinu dokumentů.
    - Dokument může mít různé formáty.
    - Speciálním formátem je HTML, kde relativní odkazy jsou vždy odkazy na jiné dokumenty.
- Plán akce obsahuje množinu definic bloků.
    - Blok může odkazovat na jiné bloky jako na své rodiče. (Umožňuje reprezentaci vztahu "Rozcvička" > "Hrajeme Mrazíka")
    - Blok odkazuje na jeden dokument jako na svůj popisek
- Plán akce obsahuje časový harmonogram.
    - Časový harmonogram je množina intervalů v čase. Každý interval odkazuje na jednu existující definici bloku.


## Jak projekt vyvíjet?

- kód se dobře píše ve VSCode
- `npm install`
- `npm run dev`

Zbytek README je pak z templaty, ze které bylo repo inicializováno.

---

# Svelte + TS + Vite

This template should help get you started developing with Svelte and TypeScript in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + TypeScript + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `allowJs` in the TS template?**

While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
