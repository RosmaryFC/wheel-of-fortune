const word = getRandomWord()

console.log(word)

//when user clicks start, reveals any instances of letter R,S,T,L,N,E
const INITLETTERS = ["r","s","t","l","n","e"]
const CONSTONANTS = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']
const VOWELS = ['a','e','i','o','u']

let missingLetters = word.length
let wordArr = []

//reference ul in html
const ulListWord = document.getElementById("list-word") 
const btnStart = document.getElementById("btn-start")
const form = document.getElementById('letters-form')
const btnSubmit = document.getElementById("btn-submit")


//add a list item with id as index of letter, and underscore for letter at that index
for(let i = 0; i < word.length; i++){
    // console.log(`${word[i]}`)

    //keep list of letters needed
    wordArr.push(word[i])

    const liLetter = document.createElement("li")
    liLetter.innerText = "_"
    liLetter.setAttribute("id", `letter-${i}-${word[i]}`)
    ulListWord.append(liLetter)
}


btnStart.addEventListener("click", (e) => {
    console.log("clicked start button")
    //show letter if it is in initLetters
    for(let i = 0; i < word.length; i++){
        // console.log(`${word[i]}`)
        if(INITLETTERS.includes(word[i])){
            // console.log(`init letters includes ${word[i]} `)

            //decrement usedLetters
            if(wordArr.includes(word[i])) {
                wordArr.splice(wordArr.indexOf(word[i]), 1)
            }

            //decrement number of missing letters
            missingLetters --

            //show letter
            const curLetter = document.getElementById(`letter-${i}-${word[i]}`)
            curLetter.innerText = `${word[i]}`
        }
    }
    //Once user clicks start, cannot click again - button dissapears
    btnStart.style.display = "none"
})


btnSubmit.addEventListener("click", (e) => {
    console.log("clicked btn submit")
    e.preventDefault()

    const firstConst = form['constanant-one'].value
    const secondConst = form['constanant-two'].value
    const thirdConst = form['constanant-three'].value
    const firstVowel = form['vowel-one'].value
    console.log("firstVowel", firstVowel)

    const formConstonants = {
        firstConstonant : firstConst,
        secondConstonant : secondConst,
        thirdConstonant : thirdConst,
    } 

    // const formVowel = {
    //     vowel: firstVowel
    // }
    // console.log("formVowel", formVowel[vowel])

    console.log("form-constonants", formConstonants)

    //add constanants and vowels to arr
    const letters = []

    let constonanantsAreValid = true;
    // make sure constanants are constanants and vowel is a vowel
    for(const key in formConstonants) {
        const element = formConstonants[key];
        //adding constanants to letter arr
        letters.push(element)
        if(!CONSTONANTS.includes(element)) {
            console.log("const is false")
            constonanantsAreValid = false
        }
    }
    let vowelIsValid = true;
    //adding vowel to letter arr
    letters.push(firstVowel)
    if(!VOWELS.includes(firstVowel)) {
        console.log("vowel is false", firstVowel)
        vowelIsValid = false;
    }

    if(constonanantsAreValid && vowelIsValid) {
        //check if letters are in word, and display them
         for(let i = 0; i < word.length; i++) {
            console.log("letter", `${word[i]}`)
            if(letters.includes(word[i])){
            console.log(`init letters includes ${word[i]} `)


            //decrement usedLetters
            if(wordArr.includes(word[i])) {
                wordArr.splice(wordArr.indexOf(word[i]), 1)
                missingLetters--
            }

            //show letter in word
            const curLetter = document.getElementById(`letter-${i}-${word[i]}`)
            curLetter.innerText = `${word[i]}`
            }
         }
        //tell user if they guess correct or incorrectly
        if(missingLetters !== 0) {
            window.alert("Better luck next time!")
        }else {
            window.alert("Congrats! You guessed it!")
        }

        //give option to restart game
        const pRestart = document.getElementById("p-restart")
        const btnRestart = document.getElementById("btn-restart")

        pRestart.style.display="block"
        btnRestart.style.display="block"
        btnSubmit.style.display="none"

        btnRestart.addEventListener("click", e => {
            //refresh page
            location.reload()
        })

    }else {
        //erase letters
        form['constanant-one'].value = ""
        form['constanant-two'].value = ""
        form['constanant-three'].value = ""
        form['vowel-one'].value = ""

        //display error stating that letters are incorrect
        window.alert("Either constanants were not constanats, or the vowel was not a vowel. Try again")
    }

})


