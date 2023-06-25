window.onload = function () {
    const inputBar = document.getElementById("input")
    const keyNumbers = [...document.getElementsByClassName("number")]
    const keyOperators = [...document.getElementsByClassName("operator")]
    const keyClear = document.querySelector(".clear")
    const keyEqual = document.querySelector(".equal")

    let currentInput
    let numbers
    let operators
    let result
    let tempNum
    let tempOperator

    let numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
    let operatorsArr = ["+", "-", "*", "/"]

    init()

    document.addEventListener("click", (e) => {
        if (keyNumbers.indexOf(e.target) !== -1) {
            inputHandler(e.target.innerText) // 点击数字
        } else if (keyOperators.indexOf(e.target) !== -1) {
            operatorHandler(e.target.textContent) // 点击运算符
            if (operators.length >= 2 && operators.length % 2 === 0) {
                operatorToCalc(e.target.textContent)
            }
        } else if (e.target === keyEqual) {
            equalHandler(e.target.textContent) // 点击等于号
        } else if (e.target === keyClear) {
            init() // 点击清空按钮
        }
    })

    document.addEventListener("keypress", (e) => {
        console.log(e.key)
        if (numbersArr.indexOf(e.key) !== -1) {
            inputHandler(e.key) // 按下数字键
        } else if (operatorsArr.indexOf(e.key) !== -1) {
            operatorHandler(e.key) // 按下运算符
            if (operators.length >= 2 && operators.length % 2 === 0) {
                operatorToCalc(e.key)
            }
        } else if (e.key === "=" || e.key === "Enter") {
            equalHandler("=") // 按下等于号或enter键
        } else if (e.key === "c") {
            init() // 按下物理键盘上的c按键
        }
    })

    // 初始化函数
    function init() {
        currentInput = ""
        numbers = []
        operators = []
        result = 0
        inputBar.innerText = result
        tempNum = ""
        tempOperator = ""
        console.log("calculator init")
    }

    // 处理数字输入的函数
    function inputHandler(input) {
        if (operators.at(-1) === "=") {
            init() // 当通过=号计算出结果后，输入数字立即重新启动
        }
        if (currentInput === "0" && input === "0") {
            return // 阻止连续输入两个00做为数字的开头
        }
        if (currentInput.includes(".") && input === ".") {
            return // 阻止在数字中输入两个小数点
        }
        if (currentInput === "" && input === ".") {
            currentInput += "0"
        }
        currentInput += input
        inputBar.innerText = currentInput
    }

    // 处理运算符输入的函数
    function operatorHandler(operator) {
        if (currentInput === "") {
            if (operators.length === 0) {
                return
            } else {
                operators.splice(-1, 1, operator)
                return
            }
        }
        numbers.push(+currentInput)
        operators.push(operator)
        currentInput = ""
    }

    // 通过运算符来获得计算结果的函数
    function operatorToCalc(operator) {
        if (operator === "×" || operator === "÷" || operator === "*" || operator === "/") {
            if (operators[0] === "+" || operators[0] === "−") {
                tempNum = numbers[0]
                tempOperator = operators[0]
                numbers.shift()
                operators.shift()
            } else {
                result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
                inputBar.innerText = result
                numbers.push(result)
                operators.push(operator)
            }
        } else if (operator === "+" || operator === "−" || operator === "-") {
            getResult(operator)
        }
    }

    // 处理等于号的函数
    function equalHandler(equalKey) {
        if (operators[operators.length - 1] === "=" || operators.length === 0) {
            return
        }
        if (currentInput === "") {
            return
        }
        numbers.push(+currentInput)
        operators.push(equalKey)
        currentInput = ""
        getResult(equalKey)
    }

    // 处理tempNum的函数
    function getResult(operator) {
        result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
        if (tempNum) {
            result = calc(tempOperator, tempNum, result)
            tempNum = ""
            tempOperator = ""
        }
        inputBar.innerText = result
        numbers.push(result)
        operators.push(operator)
    }

    // 基础加减乘除运算函数
    function calc(operator, x, y) {
        if (operator === "+") {
            return x + y
        } else if (operator === "−" || operator === "-") {
            return x - y //
        } else if (operator === "×" || operator === "*") {
            return x * y
        } else if (operator === "÷" || operator === "/") {
            return x / y
        }
    }
}