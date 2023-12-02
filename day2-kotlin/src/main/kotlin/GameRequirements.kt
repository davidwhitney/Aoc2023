import java.util.stream.Stream

class GameRequirements(val gameId: Int, private val requirements: HashMap<String, Int>) {
    val power: Int
        get() {
            return requirements["red"]!! * requirements["green"]!! * requirements["blue"]!!;
        }

    fun isViable(red: Int, green: Int, blue: Int): Boolean {
        return (requirements["red"]!! <= red
                && requirements["green"]!! <= green
                && requirements["blue"]!! <= blue);
    }

    override fun toString(): String {
        return this.gameId.toString() + " " + this.requirements.toString() + " Power: " + power.toString();
    }

    companion object {
        fun fromLine(line: String): GameRequirements {
            val parts = line.split(": ", "; ");
            val rounds = parts.slice(1..<parts.size);
            val gameId = parts[0].replace("Game ", "").toInt();

            val highestRankMap = hashMapOf<String, Int>();
            highestRankMap["red"] = 0;
            highestRankMap["blue"] = 0;
            highestRankMap["green"] = 0;

            for (set in rounds) {
                val counts = set.split(", ");

                for (item in counts) {
                    val itemParts = item.split(" ");
                    val type = itemParts[1];
                    val count = itemParts[0].toInt();

                    val previous = highestRankMap[type]!!;
                    if (count > previous) {
                        highestRankMap[type] = count;
                    }
                }
            }

            return GameRequirements(gameId, highestRankMap);
        }
    }
}

fun List<String>.toGameRequirementsStream(): Stream<GameRequirements> {
    return this.stream().map{ GameRequirements.fromLine(it) };
}

fun Stream<GameRequirements>.viableGames(red: Int, green: Int, blue: Int): Stream<GameRequirements> {
    return this.filter{ it.isViable(red, green, blue)};
}
fun Stream<GameRequirements>.sumOfIds(): Int {
    return this.mapToInt { it.gameId }.sum();
}