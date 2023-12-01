import day1 from "./day1";
import { describe, it, beforeEach, expect } from "vitest";
import * as fs from "fs";

describe('day1', () => {

    // it('part 1 example', () => {
    //     var input = [
    //         "1abc2",
    //         "pqr3stu8vwx",
    //         "a1b2c3d4e5f",
    //         "treb7uchet"
    //     ];

    //     const result = day1(input);
    //     expect(result).toBe(142)
    // });

    // it('part 1 solution', () => {
    //     const text = fs.readFileSync('./src/day1.input.txt', 'utf-8');
    //     const input = text.split('\n');            

    //     const result = day1(input);
    //     expect(result).toBe(54388);
    // });

    it('part 2 test', () => {
        var input = [
            "two1nine",
            "eightwothree",
            "abcone2threexyz",
            "xtwone3four",
            "4nineeightseven2",
            "zoneight234",
            "7pqrstsixteen"
        ];

        const result = day1(input, true);
        expect(result).toBe(281);
    });

    it('part 2 edge cases', () => {
        var input = ["eighthree"];
        const result = day1(input, true);
        expect(result).toBe(83);
    });

    it('part 2 edge cases 2', () => {
        var input = ["sevenine"];
        const result = day1(input, true);
        expect(result).toBe(79);
    });

    // it('part 2 solution', () => {
    //     const text = fs.readFileSync('./src/day1.input.txt', 'utf-8');
    //     const input = text.split('\n');            

    //     const result = day1(input, true);

    //     expect(result).toBe(-1);
    // });

});

