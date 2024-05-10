const fs = require('fs')
const fse = require('fs-extra')

const dataPackDefinition = {
    pack: {
        description: 'Data for The Place SMP',
        pack_format: 43
    }
}
const resourcePackDefinition = {
    pack: {
        description: 'Assets for The Place SMP',
        pack_format: 32
    }
}
compile()

function compile() {
    const settings = JSON.parse(fs.readFileSync('./settings.json'))

    if (typeof settings.dataOutput == 'undefined') {
        console.warn('Failed to find settings.json')
    }
    compileDataPack(`${settings.dataOutput}/the_place_smp`)
}

function compileDataPack(packFolder) {
    fs.writeFileSync(`${packFolder}/pack.mcmeta`, JSON.stringify(dataPackDefinition, null, 4))
    fse.copy('./data', `${packFolder}/data`)
}