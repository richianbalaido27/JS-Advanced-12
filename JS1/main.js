const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");

const tbl = document.getElementById("tblNumbers");

let total = 0;
let numbersArr = [];

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;
    let regex = /^[0-9]+$/;

    if (txtNumber.match(regex)) {
        const num = parseInt(txtNumber);
        numbersArr.push(num);
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a positive number");
        document.getElementById("txtNum").value = "";
        return;
    }

    iterateNumbers();
}

btn1.addEventListener("click", insertNumber);

document.getElementById("txtNum").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;

    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    btn4.style.display = "none";
});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";
    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";
    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;

    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
});

function deleteNumber(i) {
    numbersArr.splice(i, 1);
    iterateNumbers();
}

function editNumber(i) {
    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    const regex = /^[0-9]+$/;

    if (editTxt == null || editTxt === "") {
        alert("You did not input a new value!");
    } else {
        if (editTxt.match(regex)) {
            numbersArr[i] = parseInt(editTxt);
            iterateNumbers();
        } else {
            alert("You did not input a valid number!");
        }
    }
}

function iterateNumbers() {
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if (numbersArr.length > 0) {
        total = 0;

        for (let i = 0; i < numbersArr.length; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = numbersArr[i];

            td2.style.width = "70px";
            td2.style.color = numbersArr[i] % 2 === 0 ? "green" : "blue";
            td2.innerHTML = numbersArr[i] % 2 === 0 ? "EVEN" : "ODD";

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`);
            btnDelete.innerHTML = "Remove";

            btnEdit.setAttribute("onclick", `editNumber(${i})`);
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbl.appendChild(tr);

            total += numbersArr[i];
        }

        btn4.style.display = "inline";
    } else {
        total = 0;
        btn4.style.display = "none";
    }
}
