export function clearNumericInput(inputValue){
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    return inputValue.split("").filter((char, id) => numbers.includes(char) && (char !== "." || id === inputValue.indexOf(char))).join("");
}