import getUserInput from "./modules.js";
import {
    Calculator,
    convertToJson,
    saveToLocalStorage,
    getFromLocalStorage,
    isPositive,
    operateOnNumbers,
    fetchData
} from "./modules.js";

document.addEventListener("DOMContentLoaded", () => {
    const processBtn = document.getElementById("processBtn");
    const outputDiv = document.getElementById("output");

    processBtn.addEventListener("click", async () => {
        const number = getUserInput();

        if (isNaN(number)) {
            outputDiv.textContent = "Please enter a valid number.";
            return;
        }

        const isPositiveNumber = isPositive(number);

        const resultAddition = Calculator.add(5, 3);
        const resultSubtraction = Calculator.subtract(10, 7);

        const jsonData = { key: "value" };
        const jsonString = convertToJson(jsonData);

        saveToLocalStorage("savedData", jsonString);
        const retrievedData = getFromLocalStorage("savedData");

        const sum = operateOnNumbers(4, 6, (a, b) => a + b);
        const difference = operateOnNumbers(8, 3, (a, b) => a - b);

        const apiUrl = "https://jsonplaceholder.typicode.com/todos/";
        const fetchedData = await fetchData(apiUrl);

        outputDiv.textContent = `
Your Number: ${number}
Is Positive: ${isPositiveNumber ? "Yes" : "No"}

Addition (5 + 3): ${resultAddition}
Subtraction (10 - 7): ${resultSubtraction}

JSON Stored: ${jsonString}
Retrieved from LocalStorage: ${retrievedData}

Sum (4 + 6): ${sum}
Difference (8 - 3): ${difference}

Fetched Sample Data [1st item]:
ID: ${fetchedData[0].id}
Title: ${fetchedData[0].title}
Completed: ${fetchedData[0].completed ? "Yes" : "No"}
        `;
    });
});
