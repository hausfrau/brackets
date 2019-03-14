module.exports = function check(str, bracketsConfig) {
    const opensConfigBrackets = [];
    const closeConfigBrackets = [];
    const opensBracketsStack = [];
    const associativeObject = {};
    let result = true;

    const checkString = function (str, bracketsConfig) {
        const parseBracketsConfig = function () {
            bracketsConfig.forEach(function (array) {
                opensConfigBrackets.push(array[0]);
                associativeObject[array[1]] = array[0]; // {close: open}
                closeConfigBrackets.push(array[1]);
            });
        };

        parseBracketsConfig();

        str.split('').forEach(function (character) {
            switch (true) {
                case !opensConfigBrackets.includes(character) && !closeConfigBrackets.includes(character):
                    result = false;
                    break;
                case opensBracketsStack.length === 0 && opensConfigBrackets.includes(character):
                    opensBracketsStack.push(character);
                    break;
                case closeConfigBrackets.includes(character) && opensConfigBrackets.includes(character) && (opensBracketsStack[opensBracketsStack.length - 1] !== character):
                    opensBracketsStack.push(character);
                    break;
                case opensConfigBrackets.includes(character) && !closeConfigBrackets.includes(character):
                    opensBracketsStack.push(character);
                    break;
                case closeConfigBrackets.includes(character) && opensBracketsStack.pop() !== associativeObject[character]:
                    result = false;
                    break;
            }
        });

        if (opensBracketsStack.length > 0) {
            return false;
        }

        return result;
    };

    return checkString(str, bracketsConfig);
}
