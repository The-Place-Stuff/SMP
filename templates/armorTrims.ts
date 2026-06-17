import { PackType } from '../scripts/pack.ts';
import { registerTemplate } from '../scripts/template.ts';

const data: Record<string, string> = {
    sentry: 'minecraft:cobblestone',
    vex: 'minecraft:cobblestone',
    wild: 'minecraft:mossy_cobblestone',
    coast: 'minecraft:cobblestone',
    dune: 'minecraft:sandstone',
    wayfinder: 'minecraft:terracotta',
    raiser: 'minecraft:terracotta',
    shaper: 'minecraft:terracotta',
    host: 'minecraft:terracotta',
    ward: 'minecraft:cobbled_deepslate',
    silence: 'minecraft:cobbled_deepslate',
    tide: 'minecraft:prismarine',
    snout: 'minecraft:blackstone',
    rib: 'minecraft:netherrack',
    eye: 'minecraft:end_stone',
    spire: 'minecraft:purpur_block',
    flow: 'minecraft:breeze_rod',
    bolt: 'minecraft:copper_ingot'
};

function createRecipeData(id: string, duplicateMaterial: string) {
    return {
        type: 'minecraft:crafting_shaped',
        category: 'misc',
        key: {
            C: duplicateMaterial,
            S: `minecraft:${id}_armor_trim_smithing_template`
        },
        pattern: ['CCC', 'CSC', 'CCC'],
        result: {
            count: 2,
            id: `minecraft:${id}_armor_trim_smithing_template`
        }
    };
}

for (const [id, repairMaterial] of Object.entries(data)) {
    registerTemplate({
        content: createRecipeData(id, repairMaterial),
        path: `data/minecraft/recipe/${id}_armor_trim_smithing_template.json`,
        type: PackType.DATA
    })
} 
