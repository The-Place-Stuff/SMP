import { PackType } from "../scripts/pack.ts";
import { registerTemplate } from "../scripts/template.ts";

const musicDiscIds: string[] = [
    '13',
    'cat',
    'blocks',
    'chirp',
    'far',
    'mall',
    'mellohi',
    'stal',
    'strad',
    'ward',
    '11',
    'creator_music_box',
    'wait',
    'creator',
    'precipice',
    'otherside',
    'relic',
    '5',
    'pigstep',
    'tears',
    'lava_chicken',
    'bounce'
];

function createAdvancementData(): object {
    const criteria: Record<string, any> = {};
    const requirements: string[][] = [];

    for (const id of musicDiscIds) {
        const itemId = `music_disc_${id}`

        criteria[itemId] = {
            trigger: 'minecraft:item_used_on_block',
            conditions: {
                location: [
                    {
                        condition: 'minecraft:location_check',
                        predicate: {
                            block: {
                                blocks: 'minecraft:jukebox'
                            }
                        }
                    },
                    {
                        condition: 'minecraft:match_tool',
                        predicate: {
                            items: `minecraft:music_disc_${id}`
                        }
                    }
                ]
            }
        }
        requirements.push([itemId])
    }

    return {
        display: {
            icon: {
                id: 'minecraft:music_disc_cat',
                count: 1
            },
            title: {
                translate: 'advancement.the_place.full_playlist'
            },
            description: {
                translate: 'advancement.the_place.full_playlist.desc'
            },
            frame: 'challenge'
        },
        parent: 'minecraft:adventure/play_jukebox_in_meadows',
        criteria,
        requirements,
        rewards: {
            experience: 50
        }
    };
}

registerTemplate({
    content: createAdvancementData(),
    path: 'data/the_place/advancement/full_playlist.json',
    type: PackType.DATA
})