fun day2(lines: List<String>, red: Int, green: Int, blue: Int): Int {

    var viableGames = lines
        .stream()
        .map{ toGameRequirements(it) }
        .filter{ it.viableGame(red, green, blue)}
        .toList();

    println(viableGames);

    var sumOfViableIds = viableGames
        .stream()
        .mapToInt { it.gameId }
        .sum();

    return sumOfViableIds;
}

fun toGameRequirements(line: String): GameReq {
    var parts = line.split(": ", "; ");
    var rounds = parts.slice(1..< parts.size);
    var gameId = parts[0].replace("Game ", "").toInt();

    var highestRankMap = hashMapOf<String, Int>();
    highestRankMap["red"] = 0;
    highestRankMap["blue"] = 0;
    highestRankMap["green"] = 0;

    for (set in rounds) {
        var counts = set.split(", ");

        for(item in counts) {
            var parts = item.split(" ");
            var type = parts[1];
            var count = parts[0].toInt();

            if (!highestRankMap.containsKey(type)) {
                highestRankMap[type] = count;
            } else {
                var previous = highestRankMap[type]!!;
                if (count > previous) {
                    highestRankMap[type] = count;
                }
            }
        }
    }

    return GameReq(gameId, highestRankMap);
}

class GameReq(val gameId: Int, val requirements: HashMap<String, Int>) {
    public fun viableGame(red: Int, green: Int, blue: Int): Boolean {
        if (requirements["red"]!! <= red
            && requirements["green"]!! <= green
            && requirements["blue"]!! <= blue) {
            return true;
        }
        return false;
    }

    public override fun toString(): String {
        return this.gameId.toString() + " " + this.requirements.toString();
    }
}