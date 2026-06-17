
export function readEnv(): Config {
    if (!Deno.env.has('DATAPACK_OUTPUT_DIR')) {
        throw 'DATAPACK_OUTPUT_DIR not found in .env'
    }
    if (!Deno.env.has('RESOURCEPACK_OUTPUT_DIR')) {
        throw 'RESOURCEPACK_OUTPUT_DIR not found in .env'
    }
    return {
        dataPackOutputDir: Deno.env.get('DATAPACK_OUTPUT_DIR') as string,
        resourcePackOutputDir: Deno.env.get('RESOURCEPACK_OUTPUT_DIR') as string
    }
}

type Config = {
    dataPackOutputDir: string,
    resourcePackOutputDir: string
}