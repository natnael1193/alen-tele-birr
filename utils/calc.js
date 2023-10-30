/**!
 *
 * Copyright(c) boyce and other contributors.
 * MIT Licensed
 *
 */

'use strict'

const STATE = {
    INIT: 0,  // initial state
    RESULT: 1,  // result status
    FIRST_UNDOT: 2,  // record the first operand without a decimal point
    FIRST_DOT: 3,   // record the first operand, and the operand has a decimal point
    SECOND_UNDOT: 4, // record the second operand without a decimal point
    SECOND_DOT: 5 // record the second operand, and the operand has a decimal point
}

let curState = STATE.INIT  // The state of the state machine
let curResult = 0   // Calculation results
let opNum1 = '0'   // operand 1
let opNum2 = ''  // operand 2
let op = ''   // operator

let displayNum = opNum1 // The value that should be displayed on the interface
let displayOp = ""  // Operators that should be displayed on the interface

/**
 * reset program state
 */
function reset() {
    curState = STATE.INIT
    curResult = 0
    opNum1 = '0'
    opNum2 = ''
    op = ''
}

/**
 * Is it zero
 */
function isZero(code) {
    return code == '0'
}

/**
 * Is it a number
 */
function isNumber(code) {
    return code >= '0' && code <= '9'
}

/**
 * Is it an operator
 */
function isOperator(code) {
    return code == '+' || code == '-'
        || code == 'x' || code == '/' || code == '%'
}

/**
 * Is it a decimal point
 */
function isDot(code) {
    return code == '.'
}

/**
 * Is it an equal sign
 */
function isEquel(code) {
    return code == '='
}

/**
 * Whether to clear
 */
function isClear(code) {
    return code == 'c'
}

/**
 * Whether to delete
 */
function isDelete(code) {
    return code == 'd'
}

/**
 * converts to a realistic operator
 */
function op2Show(code) {
    return code == '/' ? '÷' : (code == 'x' ? '×' : code)
}

function tryAppend(num, code) {
    if (num.length < 15) {
        num += code
    }
    return num
}

function tryTrunc(num) {
    let str = '' + num
    if (str.length > 15) {
        str = str.substr(0, 15)
    }
    return str
}

function tryDelete() {
    if (curState == STATE.SECOND_DOT
        || curState == STATE.SECOND_UNDOT) {
        if (opNum2.length > 0) {
            opNum2 = opNum2.substr(0, opNum2.length - 1)
        }
        if (opNum2 == '') {
            opNum2 = '0'
        }
        return
    } else {
        if (opNum1.length > 0 && opNum1 != '0') {
            opNum1 = opNum1.substr(0, opNum1.length - 1)
        }
        if (opNum1 == '') {
            opNum1 = '0'
        }
        return
    }
}

function tryCalc() {
    let n1 = parseFloat(opNum1)
    let n2 = parseFloat(opNum2)
    switch (op) {
        case '+':
            curResult = n1 + n2
            break
        case '-':
            curResult = n1 - n2
            break
        case 'x':
            curResult = n1 * n2
            break
        case '/':
            if (n2 == 0) {
                reset()
                curResult = 'NaN'
                displayOp = ''
            } else {
                curResult = n1 / n2
            }
            break
        case '%':
            if (n2 == 0) {
                reset()
                curResult = 'NaN'
                displayOp = ''
            } else {
                curResult = n1 % n2
            }
            break
    }
    curResult = tryTrunc(curResult)
}

function addOp(code) {
    switch (curState) {
        case STATE.RESULT:
        case STATE.INIT:
            if (isNumber(code) && !isZero(code)) {
                curState = STATE.FIRST_UNDOT
                opNum1 = code
            } else if (isDot(code)) {
                curState = STATE.FIRST_DOT
                opNum1 = '0.'
            } else if (isOperator(code)) {
                curState = STATE.SECOND_UNDOT
                opNum1 = '0'
                opNum2 = ''
                op = code
            }
            displayNum = opNum1
            displayOp = ''
            break
        case STATE.FIRST_UNDOT:
            displayOp = ''
            if (isNumber(code)) {
                if (!isZero(opNum1)) {
                    opNum1 = tryAppend(opNum1, code)
                } else {
                    opNum1 = code
                }
            } else if (isDot(code)) {
                curState = STATE.FIRST_DOT
                opNum1 = opNum1 == '' ? '0' : tryAppend(opNum1, '.')
            } else if (isDelete(code)) {
                tryDelete()
            } else if (isOperator(code)) {
                curState = STATE.SECOND_UNDOT
                op = code
                opNum2 = ''
                displayOp = op
            }
            displayNum = opNum1
            break
        case STATE.FIRST_DOT:
            displayOp = ''
            if (isNumber(code)) {
                opNum1 = tryAppend(opNum1, code)
            } else if (isDelete(code)) {
                tryDelete()
                if (opNum1.indexOf('.') < 0)
                    curState = STATE.FIRST_UNDOT
            } else if (isOperator(code)) {
                curState = STATE.SECOND_UNDOT
                op = code
                opNum2 = ''
                displayOp = op
            }
            displayNum = opNum1
            break
        case STATE.SECOND_UNDOT:
            if (isNumber(code)) {
                if (!isZero(opNum2)) {
                    opNum2 = tryAppend(opNum2, code)
                } else {
                    opNum2 = code
                }
                displayNum = opNum2
            } else if (isDot(code)) {
                curState = STATE.SECOND_DOT
                opNum2 = opNum2 == '' ? '0' : tryAppend(opNum2, '.')
                displayNum = opNum2
            } else if (isDelete(code)) {
                tryDelete()
                displayNum = opNum2
            } else if (isOperator(code)) {
                if (opNum2 != '') {
                    tryCalc()
                    curState = STATE.SECOND_UNDOT
                    opNum1 = curResult
                    opNum2 = ''
                    displayNum = curResult
                }
                op = code
                displayOp = op
            } else if (isEquel(code)) {
                if (opNum2 != '') {
                    tryCalc()
                    curState = STATE.RESULT
                    opNum1 = '0'
                    opNum2 = ''
                    displayNum = curResult
                }
                op = code
                displayOp = op
            }
            break
        case STATE.SECOND_DOT:
            if (isNumber(code)) {
                opNum2 = tryAppend(opNum2, code)
                displayNum = opNum2
            } else if (isDelete(code)) {
                tryDelete()
                if (opNum2.indexOf('.') < 0)
                    curState = STATE.SECOND_UNDOT
                displayNum = opNum2
            } else if (isOperator(code)) {
                if (opNum2 != '') {
                    tryCalc()
                    curState = STATE.SECOND_UNDOT
                    opNum1 = curResult
                    opNum2 = ''
                    displayNum = curResult
                }
                op = code
                displayOp = op
            } else if (isEquel(code)) {
                if (opNum2 != '') {
                    tryCalc()
                    curState = STATE.RESULT
                    opNum1 = '0'
                    opNum2 = ''
                    displayNum = curResult
                }
                op = code
                displayOp = op
            }
            break
    }
    if (isClear(code)) {
        reset()
        displayNum = opNum1
        displayOp = ''
    }
    displayOp = op2Show(displayOp)
}

reset()

module.exports = {
    reset, addOp, getVars(){
        return {curState, curResult, opNum1, opNum2, op, displayNum, displayOp}
    }
}
