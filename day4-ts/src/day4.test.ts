import * as fs from 'fs';
import { describe, it, beforeEach, expect, test } from "vitest";

describe('day 4', () => {

    test('example', () => {
        const input = `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`.trim();

        const result = solve(input);
        expect(result).toBe(13);
    });


    it('solution', () => {
        const input = fs.readFileSync('./src/input.txt', 'utf-8');
        const result = solve(input);
        expect(result).toBe(28538);
    });

});

type Card = { name: string, winningNumbers: number[], playerNumbers: number[], points: number };

function solve(text: string) {
    const cards: Card[] = text.split(/\r?\n/).map(card => {
        const parts = card.split(':');
        const name = parts[0].trim();
        const numberParts = parts[1].trim().split(' | ');
        const cardNumber = parseInt(name.split(' ')[1], 10);  

        const winningNumbers = toNumbers(numberParts[0]);
        const playerNumbers = toNumbers(numberParts[1]);

        const totalPlayerCardsInWinningSet = playerNumbers.filter(x => winningNumbers.includes(x)).length;
        const points = Math.floor(Math.pow(2, totalPlayerCardsInWinningSet - 1));
        
        return { name, winningNumbers, playerNumbers, points };
    });

    const sumOfPoints = cards.reduce((sum, card) => sum + card.points, 0);

    return sumOfPoints;
}

function toNumbers(parts: string) {
    return parts.split(' ').filter(x => x.trim() !== "").map(part => parseInt(part, 10));
}