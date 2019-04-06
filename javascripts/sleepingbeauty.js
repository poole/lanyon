/*eslint-env browser, jquery, es6*/
/*global d3*/

const toss = () => Math.random() >= 0.5

function simulate(trials = 10000) {
  let correct = 0
  let questions = 0
  let heads = 0

  function trial() {
    if (toss()) {   // toss a fair coin
      // Heads was tossed. Wake on Monday.
      // Sleeping Beauty always bet Heads was tossed;
      // ... in this case, only once.
      questions += 1
      correct += 1
      heads += 1
    } else {
      // Tails was tossed. Wake on Monday and Tuesday.
      // Sleeping Beauty always bet Heads was tossed;
      // ... in this case, it will bet both on Monday
      // and Tuesday. But it will fail!
      questions += 2
    }
  }

  for (let i = 0; i < trials; i++) trial()

  $('#output code').html(`Probability of SB being correct: ${correct/questions}\nProbability of Heads being tossed: ${heads/trials}`)
}
