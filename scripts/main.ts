import { debounce } from "@std/async/debounce";
import { readEnv } from "./config.ts";
import { Pack, PackType } from "./pack.ts";
import { runTemplates } from "./template.ts";

const config = readEnv()
const fileWatcher = Deno.watchFs([
    './packs',
    './templates'
])

const packs = [
    new Pack('the_place', PackType.DATA, config.dataPackOutputDir),
    new Pack('the_place', PackType.RESOURCE, config.resourcePackOutputDir)
]

async function compile() {
    await runTemplates();

    for (const pack of packs) {
        await pack.compile()
    }
}

await compile()

const debouncedCompile = debounce(async (event) => {
    console.log(`[%s] %s`, event.kind, event.paths[0])
    await compile()
}, 200)

for await (const event of fileWatcher) {
    debouncedCompile(event)
}