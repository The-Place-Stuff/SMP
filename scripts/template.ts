import { PackType } from "./pack.ts";

export type Template = {
    content: any,
    path: string
    type: PackType
}

export const REGISTERED_TEMPLATES: Template[] = []

export function registerTemplate(template: Template) {
    REGISTERED_TEMPLATES.push(template)
}

export async function runTemplates() {
    for await (const entry of Deno.readDir('templates')) {
        if (!entry.isFile || !entry.name.endsWith('.ts')) continue

        const path = `../templates/${entry.name}`

        await import(`${path}?t=${Date.now()}`)
    }
}