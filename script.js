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
        // console.log(e.key)
        if (numbersArr.indexOf(e.key) !== -1) {
            inputHandler(e.key) // 按下数字键
        } else if (operatorsArr.indexOf(e.key) !== -1) {
            operatorHandler(e.key) // 按下运算符
            if (operators.length >= 2 && operators.length % 2 === 0) {
                operatorToCalc(e.key)
            }
        } else if (e.key === "=" || e.key === "Enter") {
            equalHandler(e.key) // 按下等于号或enter键
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
        if (operators.at(-1) === "=" || operators.at(-1) === "Enter") {
            init() // 当通过=号计算出结果后，输入数字立即重新启动
        }
        if (currentInput === "" && input === "0") {
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
        if (currentInput === "" || operators.at(-1) === "=" || operators.at(-1) === "Enter" || operators.length === 0) {
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
            return x - y
        } else if (operator === "×" || operator === "*") {
            return x * y
        } else if (operator === "÷" || operator === "/") {
            return x / y
        }
    }

    const toggleBtn = document.getElementById("toggle")
    const box = document.getElementById("box")

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark")
        toggleSymbol()
    })

    const mediaQueryList = matchMedia("(prefers-color-scheme: dark)")

    if (mediaQueryList.matches) {
        document.body.className = "dark"
        toggleSymbol()
    }

    mediaQueryList.addEventListener("change", (e) => {
        document.body.className = mediaQueryList.matches ? "dark" : ""
        toggleSymbol()
    })

    function toggleSymbol() {
        if (document.body.className === "dark") {
            box.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M11.3807 2.01904C9.91573 3.38786 9 5.33708 9 7.50018C9 11.6423 12.3579 15.0002 16.5 15.0002C18.6631 15.0002 20.6123 14.0844 21.9811 12.6195C21.6613 17.8539 17.3149 22.0002 12 22.0002C6.47715 22.0002 2 17.523 2 12.0002C2 6.68532 6.14629 2.33888 11.3807 2.01904Z\" fill=\"rgba(255,255,255,1)\"></path></svg>"
        } else {
            box.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z\"></path></svg>"
        }
    }
}