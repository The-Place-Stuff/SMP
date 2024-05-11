const fs = require('fs-extra')

const dataPackDefinition = {
    pack: {
        description: 'Data for The Place SMP',
        pack_format: 43
    }
}
const resourcePackDefinition = {
    pack: {
        description: 'Assets for The Place SMP',
        pack_format: 33
    }
}
compile()

function compile() {
    const settings = JSON.parse(fs.readFileSync('./settings.json'))

    if (typeof settings.dataOutput == 'undefined') {
        console.warn('Failed to find element dataOutput in settings.json')
    }
    else compileDataPack(`${settings.dataOutput}/the_place_smp`)

    if (typeof settings.resourceOutput == 'undefined') {
        console.warn('Failed to find element resourceOutput in settings.json')
    }
    else compileResourcePack(`${settings.resourceOutput}/the_place_smp`)
}

function compileDataPack(packFolder) {
    fs.writeFileSync(`${packFolder}/pack.mcmeta`, JSON.stringify(dataPackDefinition, null, 4))
    fs.copy('./data', `${packFolder}/data`)
}

function compileResourcePack(packFolder) {
    fs.writeFileSync(`${packFolder}/pack.mcmeta`, JSON.stringify(resourcePackDefinition, null, 4))
    fs.copy('./assets', `${packFolder}/assets`)
}