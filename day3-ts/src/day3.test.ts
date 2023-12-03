import * as fs from 'fs';
import { describe, it, beforeEach, expect, test } from "vitest";

describe('day 3', () => {

//     test('part 1 example', () => {
//         const input = `
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
// `.trim();

//         const result = solve(input);
//         expect(result).toBe(4361);
//     });


    it('part 1 solution', () => {
        const text = fs.readFileSync('./src/day3.input.txt', 'utf-8');        

        const result = solve(text);
        expect(result).toBe(544664);
    });

    //     test('part 1 - test case 1', () => {
    //         const input = `
    // 467..114..
    // ..*.......
    // `.trim();

    //         const result = solve(input);
    //     });

});


function solve(input: string) {
    const grid = input.split('\n').map(x => x.split(''));
    const allElements = getTokens(grid);

    let sumOfIdsAdjacentToSymbols = 0;

    // calculate which tokens are adjactent to each other
    const adjacentElements = new Map<Value, Array<Value>>();
    for (const element of allElements) {
        if (element instanceof SymbolElement) {
            continue;
        }

        const onlySymbols = allElements.filter(x => x instanceof SymbolElement);

        const adjacent = new Array<Value>();

        for (const other of onlySymbols) {
            if (element !== other && element.isAdjacent(other)) {
                adjacent.push(other);

                if (other instanceof SymbolElement) {
                    sumOfIdsAdjacentToSymbols += parseInt(element.value);
                }
            }
        }

        adjacentElements.set(element, adjacent);
    }

    console.log([...adjacentElements.entries()].map(x => ({ id: x[0].value, adj: x[1].map(y => y.value) })));

    return sumOfIdsAdjacentToSymbols;

}

function getTokens(grid: string[][]) {
    const detectedElements = new Array<Value>();

    for (let y = 0; y < grid.length; y++) {
        const row = grid[y];

        let numberBuffer = null;

        for (let x = 0; x < row.length; x++) {
            const cell = row[x];

            const asInt = parseInt(cell);
            const isNumber = !isNaN(asInt);
            const isSpace = cell === ".";
            const isSymbol = !isNumber && !isSpace;

            if (isNumber) {
                if (!numberBuffer) {
                    numberBuffer = new NumberElement(x, y, cell);
                }
                else {
                    numberBuffer.add(cell);
                }
            }

            if (isSpace || isSymbol) {
                if (numberBuffer) {
                    detectedElements.push(numberBuffer);
                    numberBuffer = null;
                }

                if (isSymbol) {
                    const symbol = new SymbolElement(x, y, cell);
                    detectedElements.push(symbol);
                }
            }
        }

        if (numberBuffer) {
            detectedElements.push(numberBuffer);
        }
    }

    return detectedElements;
}


class Value {
    public x: number;
    public y: number;
    public x2: number;
    public y2: number;

    public value: string;

    private _neighbours: Array<Array<number>>;

    constructor(x: number, y: number, value: string) {
        this.x = x;
        this.y = y;
        this.value = value;

        this.x2 = x + value.length - 1;
        this.y2 = y;

        this._neighbours = this.calculateNeighbourElementPositions();
    }

    public add(value: string) {
        this.value += value;
        this.x2 = this.x + this.value.length - 1;
        this._neighbours = this.calculateNeighbourElementPositions();
    }

    public calculateNeighbourElementPositions() {
        // return the positions of the elements that are adjacent to this one
        const positions = [];

        // above
        for (let x = this.x; x <= this.x2; x++) {
            positions.push([x, this.y - 1]);
        }

        // below
        for (let x = this.x; x <= this.x2; x++) {
            positions.push([x, this.y2 + 1]);
        }

        // left
        for (let y = this.y; y <= this.y2; y++) {
            positions.push([this.x - 1, y]);
        }

        // right
        for (let y = this.y; y <= this.y2; y++) {
            positions.push([this.x2 + 1, y]);
        }

        // Diagonals
        positions.push([this.x - 1, this.y - 1]);
        positions.push([this.x2 + 1, this.y - 1]);
        positions.push([this.x - 1, this.y2 + 1]);
        positions.push([this.x2 + 1, this.y2 + 1]);

        return this._neighbours = positions;
    }

    public isAdjacent(other: Value) {
        for (const [x, y] of this._neighbours) {
            if (other.x <= x && x <= other.x2 && other.y <= y && y <= other.y2) {
                return true;
            }
        }

        return false;
    }
}

class NumberElement extends Value {
}

class SymbolElement extends Value {
}
