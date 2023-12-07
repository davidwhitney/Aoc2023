import * as fs from 'fs';
import { describe, it, beforeEach, expect, test } from "vitest";

describe('day 5', () => {

    test('example', () => {
        const input = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
    `.trim();

        const result = solve(input);
        expect(result).toBe(35);
    });


    // it('solution', () => {
    //     const input = fs.readFileSync('./src/input.txt', 'utf-8');
    //     const result = solve(input);
    //     expect(result).toBe(218513636);
    // });

});


function solve(text: string) {
    const rawMaps = text.split('\n\n');

    const seeds = rawMaps[0].replace('seeds: ', '').split(' ').map(x => parseInt(x, 10));//?

    const maps = rawMaps.slice(1).map(x => {
        const lines = x.split('\n');
        let [name, ...map] = lines;
        name = name.replace(" map:", '');

        const values = map.map(x => x.split(' ').map(y => parseInt(y, 10)));

        return new Map(name, values);
    });

    const allConverted = seeds.map(s => maps.reduce((x, y) => y.convert(x), s)); //?
    return Math.min(...allConverted);
}

class Map {
    constructor(public name: string, public map: number[][]) {

    }

    public convert(x: number) {
        for (const item of this.map) {
            const destinationStart = item[0];
            const sourceStart = item[1];
            const sourceEnd = item[1] + item[2];

            if (x >= sourceStart && x <= sourceEnd) {
                return destinationStart + (x - sourceStart);
            }
        }
        return x;
    }
}