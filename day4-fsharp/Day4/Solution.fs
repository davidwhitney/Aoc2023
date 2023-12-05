module Day4

type Card = {
    Name: string
    Number: int
    WinningNumbers: int[]
    PlayerNumbers: int[]
    Points: int
    NumberOfWins: int
    ExtraCardIds: int list
}

let toNumbers (parts: string) = parts.Split(' ') |> Array.filter (fun x -> x.Trim() <> "") |> Array.map int

let totalCards (cards: Card array) =
    let cardsInstancesCount = cards |> Array.map (fun _ -> 1)
    let mutable totalSum = 0

    for card in cards do
        let cardId = card.Number - 1
        totalSum <- totalSum + cardsInstancesCount.[cardId]

        for index in cardId + 1 .. min (cardId + card.NumberOfWins) (cards.Length - 1) do
            cardsInstancesCount.[index] <- cardsInstancesCount.[index] + cardsInstancesCount.[cardId]

    totalSum

let solve (text: string) =
    let cards = 
        text.Split([|'\r'; '\n'|], System.StringSplitOptions.RemoveEmptyEntries)
        |> Array.map (fun card ->
            let parts = card.Split(':')
            let name = parts.[0].Trim()
            let numberParts = parts.[1].Trim().Split('|')
            let number = int(name.Replace("Card", "").Trim())
            let winningNumbers = toNumbers(numberParts.[0])
            let playerNumbers = toNumbers(numberParts.[1])

            let numberOfWins = playerNumbers |> Array.filter (fun x -> Array.contains x winningNumbers) |> Array.length
            let points = int(2.0 ** float(numberOfWins - 1))

            let extraCardIds = [for i in 1 .. numberOfWins -> number + i]

            { 
                Name = name; 
                Number = number; 
                WinningNumbers = winningNumbers; 
                PlayerNumbers = playerNumbers; 
                Points = points; 
                NumberOfWins = numberOfWins; 
                ExtraCardIds = extraCardIds 
            }
        )

    let totalCards = totalCards(cards)
    let sumOfPoints = cards |> Array.sumBy (fun card -> card.Points)    
    (sumOfPoints, totalCards)
