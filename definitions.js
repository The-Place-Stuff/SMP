const fs = require('fs-extra')

const dataPackDefinition = {
    pack: {
        description: 'Data for The Place SMP',
        pack_format: 48
    }
}
const resourcePackDefinition = {
    pack: {
        description: 'Assets for The Place SMP',
        pack_format: 34
    }
}

/**
 * @param {string} output - The output directory of the pack.
 * @param {'assets' | 'data'} type - The type of pack that should be compiled.
 */
function createPack(output, type) {
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output)
    }
    fs.writeFileSync(`${output}/pack.mcmeta`, JSON.stringify(type == 'assets' ? resourcePackDefinition : dataPackDefinition, null, 4))
    fs.removeSync(`${output}/${type}`)
    fs.copySync(`./${type}`, `${output}/${type}`, {
        overwrite: true
    })
}

module.exports = createPack