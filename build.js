const fs = require('fs-extra')
const createPack = require('./definitions')

build()

function build() {
    const settings = JSON.parse(fs.readFileSync('./settings.json'))

    if (typeof settings.dataOutput == 'undefined') {
        console.warn('Failed to find element dataOutput in settings.json')
    }
    else createPack(`${settings.dataOutput}/the_place_smp`, 'data')

    if (typeof settings.resourceOutput == 'undefined') {
        console.warn('Failed to find element resourceOutput in settings.json')
    }
    else createPack(`${settings.resourceOutput}/the_place_smp`, 'assets')
}