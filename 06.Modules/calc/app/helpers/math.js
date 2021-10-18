export function calc(str) {
    const noSqrt = str.replace("&radic;", "~");
    return parseStrToTree(str);
}
  
const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    X: (a, b) => a * b,
    "/": (a, b) => (1.0 * a) / b,
    "%": (a, b) => a % b,
    "~": (_, b) => Math.sqrt(b),
};
  
function cleanStr(str) {
    const trimed = str.trim();
    let striped = trimed;
    while (striped[0] === "(" && striped[striped.length - 1] === ")") {
      striped = striped.slice(1, striped.length - 1); // removes wrapping () if any
    }
    return striped;
}
  
function parseStrToTree(str) {
    const striped = cleanStr(str);
    const opGroups = [
        ["+", "-"],
        ["X", "/"],
        ["%", "~"], // ~ for sqrt
    ];
  
    for (const opGroup of opGroups) {
        let bracketCount = 0;
        for (let i = 0; i < striped.length; i++) {
            const char = striped[i];
            if (char === "(") bracketCount++;
            else if (char === ")") bracketCount--;
            else if (opGroup.includes(char) && bracketCount === 0) {
                const [left, right] = callLeftRight(striped, i);
                return operators[char](left, right);
            }
        }
    }
    return parseFloat(striped);
}
  
function callLeftRight(str, index) {
    const leftStr = str.slice(0, index);
    const rightStr = str.slice(index + 1);
    const leftTree = parseStrToTree(leftStr);
    const rightTree = parseStrToTree(rightStr);
    return [leftTree, rightTree];
}
