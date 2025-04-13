// Module 1: User Input handling
export default function getUserInput() {
    const value = document.getElementById("numberInput").value;
    return parseInt(value);
};

// Module 2: Classes
export class Calculator {
    static add = (a, b) => a + b;
    static subtract = (a, b) => a - b;
}

// Module 3: JSON
export const convertToJson = (data) => JSON.stringify(data);

// Module 4: Web Storage
export const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getFromLocalStorage = (key) => localStorage.getItem(key);

// Module 5: Ternary Operator
export const isPositive = (number) => (number > 0) ? true : false;

// Module 6: Higher Order Functions
export const operateOnNumbers = (a, b, operation) => operation(a, b);

// Module 7: Fetch API (Async/Await)
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
