export const checkIfNum = (num) => {
    let convertedNum = Number(num);
    if (isNaN(convertedNum)) {
        return false;
    }
    else {
        return true;
    }
}