window.onload = function () {
    const inputBar = document.getElementById("input");
    const keyNumbers = document.querySelectorAll(".number")
    const keyOperators = document.querySelectorAll(".operator")
    const keyClear = document.querySelector(".clear");
    const keyEqual = document.querySelector(".equal");

    let currentInput
    let numbers
    let operators
    let result
    let tempNum
    let tempOperator

    init()

    let numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let operatorsArr = ["+", "-", "*", "/"]
    
    // 处理输入的函数
    function input(input) {
        if (operators.at(-1) === "=") {
            init()
        }
        if (currentInput === "0" && input === "0") {
            return
        }
        if (currentInput.includes(".") && input === ".") {
            return
        }
        currentInput += input
        inputBar.innerText = currentInput
    }

    // when key numbers pressed
    for (let i = 0; i < keyNumbers.length; i++) {
        keyNumbers[i].addEventListener("click", function (e) {
            input(e.target.textContent)
        })
    }

    function operatorProcess(operator) {
        if (currentInput === "") {
            if (operators.length === 0) {
                return
            } else {
                operators.pop()
                operators.push(e.target.textContent)
                return
            }
        }
        numbers.push(+currentInput)
        operators.push(operator)
        currentInput = ""
    }

    // when operators pressed
    for (let i = 0; i < keyOperators.length; i++) {
        keyOperators[i].addEventListener("click", function (e) {
            if (currentInput === "") {
                if (operators.length === 0) {
                    return
                } else {
                    operators.pop()
                    operators.push(e.target.textContent)
                    return
                }
            }
            numbers.push(+currentInput)
            operators.push(e.target.innerText)
            currentInput = ""
            if (operators.length >= 2 && operators.length % 2 === 0) {
                if (e.target.innerText === "×" || e.target.innerText === "÷") {
                    if (operators[0] === "+" || operators[0] === "−") {
                        tempNum = numbers[0]
                        tempOperator = operators[0]
                        numbers.shift()
                        operators.shift()
                        console.log(numbers, operators);
                        return
                    } else {
                        result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
                        inputBar.innerText = result
                        numbers.push(result)
                        operators.push(e.target.innerText)
                        return
                    }
                    
                } else if (e.target.innerText === "+" || e.target.innerText === "−") {
                    if (tempNum !== "") {
                        console.log("路径一")
                        result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
                        result = calc(tempOperator, tempNum, result)
                        inputBar.innerText = result
                        numbers.push(result)
                        operators.push(e.target.innerText)
                        tempNum = ""
                        tempOperator = ""
                        return
                    } else if (tempNum === "") {
                        console.log("路径二")
                        result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
                        inputBar.innerText = result
                        numbers.push(result)
                        operators.push(e.target.innerText)
                        return
                    }
                }
                /* result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
                inputBar.innerText = result
                numbers.push(result)
                operators.push(e.target.innerText) */
            }
        })
    }

    // when key equal pressed
    keyEqual.addEventListener("click", (e) => {
        if (operators[operators.length - 1] === "=" || operators.length === 0) {
            return
        }
        if (currentInput === "") {
            return
        }
        numbers.push(+currentInput)
        operators.push(e.target.innerText)
        currentInput = ""
        if (tempNum !== "") {
            console.log("路径一")
            result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
            result = calc(tempOperator, tempNum, result)
            inputBar.innerText = result
            numbers.push(result)
            operators.push(e.target.innerText)
            tempNum = ""
            tempOperator = ""
            return
        } else if (tempNum === "") {
            console.log("路径二")
            result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
            inputBar.innerText = result
            numbers.push(result)
            operators.push(e.target.innerText)
            return
        }
    })

    /* keyEqual.addEventListener("click", (e) => {
        if (operators[operators.length - 1] === "=" || operators.length === 0) {
            return
        }
        if (currentInput === "") {
            return
        }
        numbers.push(+currentInput)
        operators.push(e.target.innerText)
        currentInput = ""
        result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
        inputBar.innerText = result
        currentInput = result
    }) */

    // when key clear pressed
    keyClear.addEventListener("click", () => {
        init()
    })

    // clear with keyboard
    document.addEventListener("keypress", (e) => {
        if (e.key === "c") {
            init()
        }
    })

    // function calculate
    function calc(operator, x, y) {
        console.log(operator, x, y)
        if (operator === "+") {
            return x + y // 加法
        } else if (operator === "−" || operator === "-") {
            return x - y // 减法
        } else if (operator === "×" || operator === "*") {
            return x * y // 乘法
        } else if (operator === "÷" || operator === "/") {
            return x / y // 除法
        }
    }

    // 初始化函数
    function init() {
        currentInput = ""
        numbers = []
        operators = []
        result = 0
        inputBar.innerText = result
        console.log("--> calculator init")
        tempNum = ""
        tempOperator = ""
    }

    // keyboard event listener
    document.addEventListener("keypress", (e) => {
        if (numbersArr.indexOf(e.key) !== -1) {
            input(e.key)
        } else if (e.key === "=" || e.key === "Enter") {
            if (operators[operators.length - 1] === "=" || operators.length === 0) {
                return
            }
            if (currentInput === "") {
                return
            }
            numbers.push(+currentInput)
            operators.push("=")
            currentInput = ""
            result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
            inputBar.innerText = result
            currentInput = result
        } else if (operatorsArr.indexOf(e.key) !== -1) {
            if (currentInput === "") {
                if (operators.length === 0) {
                    return
                } else {
                    operators.pop()
                    operators.push(e.key)
                    return
                }
            }
            numbers.push(+currentInput)
            operators.push(e.key)
            currentInput = ""
            if (operators.length >= 2 && operators.length % 2 === 0) {
                result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
                inputBar.innerText = result
                numbers.push(result)
                operators.push(e.key)
            }
        }
    })
}