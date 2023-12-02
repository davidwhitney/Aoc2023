import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.File

class Day2Tests {
    @Test
    fun example1() {
        var lines = mutableListOf<String>();
        lines.add("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");
        lines.add("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue");
        lines.add("Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red");
        lines.add("Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red");
        lines.add("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green");

        val result = lines
            .toGameRequirementsStream()
            .viableGames(12, 13, 14)
            .sumOfIds();

        assertTrue(result == 8);
    }

    @Test
    fun test1() {
        var lines = mutableListOf<String>();
        File("C:\\dev\\davidwhitney\\Aoc2023\\day2-kotlin\\src\\test\\resources\\input.txt").forEachLine { lines.add(it); }

        val result = lines
            .toGameRequirementsStream()
            .viableGames(12, 13, 14)
            .sumOfIds();

        assertTrue(result == 2164);
    }

    @Test
    fun test2() {
        var lines = mutableListOf<String>();
        File("C:\\dev\\davidwhitney\\Aoc2023\\day2-kotlin\\src\\test\\resources\\input.txt").forEachLine { lines.add(it); }

        val sumOfPowers = lines
            .toGameRequirementsStream()
            .mapToInt{ it.power }
            .sum();

        assertTrue(sumOfPowers == 69929);
    }
}