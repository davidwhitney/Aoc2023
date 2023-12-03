import * as fs from 'fs';
import { describe, it, beforeEach, expect, test } from "vitest";

describe('day 3', () => {

    test('example', () => {
        const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim();

        const result = solve(input);
        expect(result).toBe(4361);

        const result2 = solvePart2(input);
        expect(result2).toBe(467835);
    });


    it('solution', () => {
        const text = fs.readFileSync('./src/day3.input.txt', 'utf-8');

        const result = solve(text);
        const ratio = solvePart2(text);

        expect(result).toBe(544664);
        expect(ratio).toBe(84495585);
    });

});

function solvePart2(input: string) {
    const grid = input.split('\n').map(x => x.split(''));

    const allElements = getTokens(grid);
    const numberElements = allElements.filter(x => x instanceof NumberElement);
    const symbolElements = allElements.filter(x => x instanceof SymbolElement);
    const potentialGears = symbolElements.filter(x => x.value === '*');

    let sum = 0;
    const gears = new Map<Value, Array<Value>>();

    for (const element of potentialGears) {
        const adjacent = new Array<Value>();

        for (const other of numberElements) {
            if (element !== other && element.isAdjacent(other)) {
                adjacent.push(other);
            }
        }

        if (adjacent.length === 2) {
            gears.set(element, adjacent);
            sum += parseInt(adjacent[0].value) * parseInt(adjacent[1].value);
        }

    }

    return sum;
}

function solve(input: string) {
    const grid = input.split('\n').map(x => x.split(''));

    const allElements = getTokens(grid);
    const numberElements = allElements.filter(x => x instanceof NumberElement);
    const symbolElements = allElements.filter(x => x instanceof SymbolElement);

    let sum = 0;

    for (const element of numberElements) {
        for (const other of symbolElements) {
            if (element !== other && element.isAdjacent(other) && other instanceof SymbolElement) {
                sum += parseInt(element.value);
            }
        }
    }

    return sum;
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

        this.calculateNeighbourElementPositions();
    }

    public add(value: string) {
        this.value += value;
        this.x2 = this.x + this.value.length - 1;
        this.calculateNeighbourElementPositions();
    }

    public calculateNeighbourElementPositions() {
        const positions = [];

        for (let x = this.x; x <= this.x2; x++) {
            positions.push([x, this.y - 1]);
        }

        for (let x = this.x; x <= this.x2; x++) {
            positions.push([x, this.y2 + 1]);
        }

        for (let y = this.y; y <= this.y2; y++) {
            positions.push([this.x - 1, y]);
        }

        for (let y = this.y; y <= this.y2; y++) {
            positions.push([this.x2 + 1, y]);
        }

        positions.push([this.x - 1, this.y - 1]);
        positions.push([this.x2 + 1, this.y - 1]);
        positions.push([this.x - 1, this.y2 + 1]);
        positions.push([this.x2 + 1, this.y2 + 1]);

        this._neighbours = positions;
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

class NumberElement extends Value { }
class SymbolElement extends Value { }