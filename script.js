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

    let numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
    let operatorsArr = ["+", "-", "*", "/"]
    
    // 当数字键按下
    for (let i = 0; i < keyNumbers.length; i++) {
        keyNumbers[i].addEventListener("click", function (e) {
            input(e.target.textContent)
        })
    }

    // 当按下运算符号
    for (let i = 0; i < keyOperators.length; i++) {
        keyOperators[i].addEventListener("click", function (e) {
            operatorProcess(e.target.textContent)
            if (operators.length >= 2 && operators.length % 2 === 0) {
                operatorAsEqual(e.target.textContent)
            }
        })
    }

    // 按下=按键时
    keyEqual.addEventListener("click", (e) => {
        equalPreProcess(e.target.textContent)
        calcWithTempNum(e.target.textContent)
    })

    // 按下c按键时
    keyClear.addEventListener("click", () => {
        init()
    })

    // 物理键盘事件监听
    document.addEventListener("keypress", (e) => {
        console.log(e.key);
        if (numbersArr.indexOf(e.key) !== -1) {
            // 按下数字键
            input(e.key)
        } else if (operatorsArr.indexOf(e.key) !== -1) {
            // 按下加减乘除按键
            operatorProcess(e.key)
            if (operators.length >= 2 && operators.length % 2 === 0) {
                operatorAsEqual(e.key)
            }
        } else if (e.key === "=" || e.key === "Enter") {
            equalPreProcess("=");
            calcWithTempNum("=");
        } else if (e.key === "c") {
            // 按下物理键盘上的c按键时
            init()
        }
    })

    // 函数

    // 初始化函数
    function init() {
        currentInput = ""
        numbers = []
        operators = []
        result = 0
        inputBar.innerText = result
        tempNum = ""
        tempOperator = ""
        console.log("--> calculator init")
    }

    // 基础加减乘除运算函数
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

    function operatorProcess(operator) {
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

    function operatorAsEqual(oper) {
        if (oper === "×" || oper === "÷" || oper === "*" || oper === "/") {
            if (operators[0] === "+" || operators[0] === "−") {
                tempNum = numbers[0];
                tempOperator = operators[0];
                numbers.shift();
                operators.shift();
                return;
            } else {
                result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
                inputBar.innerText = result
                numbers.push(result)
                operators.push(oper)
                return
            }
        } else if (oper === "+" || oper === "−" || oper === "-") {
            calcWithTempNum(oper)
        }
    }

    function calcWithTempNum(oper) {
        if (tempNum !== "") {
            console.log("The First Way")
            result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
            result = calc(tempOperator, tempNum, result)
            inputBar.innerText = result
            numbers.push(result)
            operators.push(oper)
            tempNum = ""
            tempOperator = ""
            return
        } else if (tempNum === "") {
            console.log("The Second Way")
            result = calc(operators.at(-2), numbers.at(-2), numbers.at(-1))
            inputBar.innerText = result
            numbers.push(result)
            operators.push(oper)
            return
        }
    }

    function equalPreProcess(equalKey) {
        if (operators[operators.length - 1] === "=" || operators.length === 0) {
            return
        }
        if (currentInput === "") {
            return
        }
        numbers.push(+currentInput)
        operators.push(equalKey)
        currentInput = ""
    }
}