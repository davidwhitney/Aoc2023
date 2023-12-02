fun day2(lines: List<String>, red: Int, green: Int, blue: Int): Int {
    return lines
        .stream()
        .map { GameReq.fromLine(it) }
        .filter { it.isViable(red, green, blue) }
        .mapToInt { it.gameId }
        .sum();
}

class GameReq(val gameId: Int, private val requirements: HashMap<String, Int>) {
    fun isViable(red: Int, green: Int, blue: Int): Boolean {
        return (requirements["red"]!! <= red
                && requirements["green"]!! <= green
                && requirements["blue"]!! <= blue);
    }

    override fun toString(): String {
        return this.gameId.toString() + " " + this.requirements.toString();
    }

    companion object {
        fun fromLine(line: String): GameReq {
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

            return GameReq(gameId, highestRankMap);
        }
    }
}