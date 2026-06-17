import { copy, exists } from '@std/fs'
import { REGISTERED_TEMPLATES } from "./template.ts";

export class Pack {
    private readonly projectName: string
    private readonly type: PackType
    private readonly outputDir: string

    public constructor(projectName: string, type: PackType, outputDir: string) {
        this.projectName = projectName
        this.type = type
        this.outputDir = outputDir
    }

    public async compile() {
        console.log(`Started compiling ${this.projectName}_${this.type}...`)

        await this.removePacks()
        await this.compileFiles()
        await this.compileTemplates()

        console.log(`Finished compiling ${this.projectName}_${this.type}.`)
    }

    private async removePacks() {
        const outputPath = `${this.outputDir}/${this.projectName}_${this.type}`
        const outputExists = await exists(outputPath, { isDirectory: true })

        if (outputExists) {
            console.log(`Removing ${this.projectName}_${this.type}...`)
            
            await Deno.remove(outputPath, {
                recursive: true
            })

            console.log(`Removed ${this.projectName}_${this.type}.`)
        }
    }

    private async compileFiles() {
        const inputPath = `packs/${this.type}`
        const outputPath = `${this.outputDir}/${this.projectName}_${this.type}`

        console.log(`Moving files over...`)
        
        await copy(inputPath, outputPath, {
            overwrite: true
        })

        console.log(`Finished moving files.`)
    }

    private async compileTemplates() {
        const outputPath = `${this.outputDir}/${this.projectName}_${this.type}`
        const templates = REGISTERED_TEMPLATES.filter(temp => temp.type === this.type)

        console.log('Running templates...')

        for (const template of templates) {
            const dir = template.path.replace(/\/[a-zA-Z_]+[.][a-zA-Z]+/, '')

            

            await Deno.mkdir(`${outputPath}/${dir}`, {
                recursive: true
            })

            const data = JSON.stringify(template.content)

            await Deno.writeTextFile(`${outputPath}/${template.path}`, data)
        }

        console.log('Finished running templates.')
    }
}

export enum PackType {
    DATA = 'dp',
    RESOURCE = 'rp'
}