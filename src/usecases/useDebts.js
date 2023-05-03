export default function () {
  function splitPayments(payments) {
    let debtList = []
    const people = Object.keys(payments)
    const valuesPaid = Object.values(payments)

    const sum = valuesPaid.reduce((acc, curr) => curr + acc)
    const mean = sum / people.length

    const sortedPeople = people.sort(
      (personA, personB) => payments[personA] - payments[personB]
    )
    const sortedValuesPaid = sortedPeople.map(
      (person) => payments[person] - mean
    )

    let i = 0
    let j = sortedPeople.length - 1
    let debt

    while (i < j) {
      debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j])
      sortedValuesPaid[i] += debt
      sortedValuesPaid[j] -= debt

      if (debt > 0) {
        debtList.push({
          userIdOrigin: sortedPeople[i],
          userIdDestination: sortedPeople[j],
          amount: debt.toFixed(2),
        })
      }

      if (sortedValuesPaid[i] === 0) {
        i++
      }

      if (sortedValuesPaid[j] === 0) {
        j--
      }
    }
    return debtList
  }

  return {
    splitPayments,
  }
}
