<?php

$input = trim("
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
");

$result = solve($input);
$result2 = solvePart2($input);

echo "Result: " . $result . "\n";
echo "Ratio: " . $result2 . "\n";

assert($result == 4361, "Expected result to be 4361, got " . $result);
assert($result2 == 467835, "Expected result2 to be 467835, got " . $result2);

// Code

function solve($input) {
    $grid = explode("\n", $input);
    array_walk($grid, function(&$row) { $row = str_split($row); });

    $allElements = getTokens($grid);
    $numberElements = array_filter($allElements, function($x) { return $x instanceof NumberElement; });
    $symbolElements = array_filter($allElements, function($x) { return $x instanceof SymbolElement; });

    $sum = 0;

    foreach ($numberElements as $element) {
        foreach ($symbolElements as $other) {
            if ($element !== $other && $element->isAdjacent($other) && $other instanceof SymbolElement) {
                $sum += intval($element->value);
            }
        }
    }

    return $sum;
}

function solvePart2($input) {
    $grid = explode("\n", $input);
    array_walk($grid, function(&$row) { $row = str_split($row); });

    $allElements = getTokens($grid);
    $numberElements = array_filter($allElements, function($x) { return $x instanceof NumberElement; });
    $symbolElements = array_filter($allElements, function($x) { return $x instanceof SymbolElement; });
    $potentialGears = array_filter($symbolElements, function($x) { return $x->value === '*'; });

    $sum = 0;

    foreach ($potentialGears as $element) {
        $adjacent = [];

        foreach ($numberElements as $other) {
            if ($element !== $other && $element->isAdjacent($other)) {
                array_push($adjacent, $other);
            }
        }

        if (count($adjacent) === 2) {
            $sum += intval($adjacent[0]->value) * intval($adjacent[1]->value);
        }
    }

    return $sum;
}

function getTokens($grid) {
    $detectedElements = array();
    for ($y = 0; $y < count($grid); $y++) {
        $row = $grid[$y];
        $numberBuffer = null;

        for ($x = 0; $x < count($row); $x++) {
            $cell = $row[$x];

            if (is_numeric($cell)) {
                if ($numberBuffer === null) {
                    $numberBuffer = new NumberElement($x, $y, $cell);
                } else {
                    $numberBuffer->add($cell);
                }
            }

            if ($cell === '.' || !is_numeric($cell)) {
                if ($numberBuffer !== null) {
                    array_push($detectedElements, $numberBuffer);
                    $numberBuffer = null;
                }

                if (!is_numeric($cell) && $cell !== '.') {
                    $symbol = new SymbolElement($x, $y, $cell);
                    array_push($detectedElements, $symbol);
                }
            }
        }

        if ($numberBuffer !== null) {
            array_push($detectedElements, $numberBuffer);
        }
    }

    return $detectedElements;
}

class Value {
    public $x;
    public $y;
    public $x2;
    public $y2;
    public $value;
    private $_neighbours;

    public function __construct($x, $y, $value) {
        $this->x = $x;
        $this->y = $y;
        $this->value = $value;

        $this->x2 = $x + strlen($value) - 1;
        $this->y2 = $y;

        $this->calculateNeighbourElementPositions();
    }

    public function add($value) {
        $this->value .= $value;
        $this->x2 = $this->x + strlen($this->value) - 1;
        $this->calculateNeighbourElementPositions();
    }

    public function calculateNeighbourElementPositions() {
        $positions = array();
    
        for ($x = $this->x; $x <= $this->x2; $x++) {
            array_push($positions, array($x, $this->y - 1));
        }
    
        for ($x = $this->x; $x <= $this->x2; $x++) {
            array_push($positions, array($x, $this->y2 + 1));
        }
    
        for ($y = $this->y; $y <= $this->y2; $y++) {
            array_push($positions, array($this->x - 1, $y));
        }
    
        for ($y = $this->y; $y <= $this->y2; $y++) {
            array_push($positions, array($this->x2 + 1, $y));
        }
    
        array_push($positions, array($this->x - 1, $this->y - 1));
        array_push($positions, array($this->x2 + 1, $this->y - 1));
        array_push($positions, array($this->x - 1, $this->y2 + 1));
        array_push($positions, array($this->x2 + 1, $this->y2 + 1));
    
        $this->_neighbours = $positions;
    }
    

    public function isAdjacent($other) {
        foreach ($this->_neighbours as $neighbour) {
            list($x, $y) = $neighbour;
            if ($other->x <= $x && $x <= $other->x2 && $other->y <= $y && $y <= $other->y2) {
                return true;
            }
        }
        return false;
    }
    
}

class NumberElement extends Value {}
class SymbolElement extends Value {}

?>
