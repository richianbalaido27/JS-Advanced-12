const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const tblRecords = document.getElementById("tblRecords");
const status = document.getElementById("status");

let arrRecords = [];
const labels = ["First Name", "Middle Name", "Last Name", "Age", "Actions"];

function getInputs() {
    return [
        document.getElementById("fname"),
        document.getElementById("mname"),
        document.getElementById("lname"),
        document.getElementById("age")
    ];
}

function clearInputs() {
    getInputs().forEach(input => input.value = "");
    btnInsertUpdate.value = "insert";
    btnInsertUpdate.textContent = "Insert";
}

function validateInputs(inputs) {
    return inputs.every(input => input.value.trim() !== "");
}

function updateStatus() {
    status.style.display = arrRecords.length === 0 ? "block" : "none";
    status.textContent = arrRecords.length === 0 ? "No Records..." : "";
}

function renderRecords() {
    tblRecords.innerHTML = "";

    updateStatus();

    if (arrRecords.length > 0) {
        // Table Header
        const headerRow = document.createElement("tr");
        labels.forEach(label => {
            const th = document.createElement("th");
            th.textContent = label;
            headerRow.appendChild(th);
        });
        tblRecords.appendChild(headerRow);

        // Table Rows
        arrRecords.forEach((record, index) => {
            const row = document.createElement("tr");

            Object.values(record).forEach(value => {
                const td = document.createElement("td");
                td.textContent = value;
                row.appendChild(td);
            });

            const actionsTd = document.createElement("td");
            const btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.onclick = () => loadForEdit(index);

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Delete";
            btnDelete.onclick = () => deleteRecord(index);

            actionsTd.appendChild(btnEdit);
            actionsTd.appendChild(btnDelete);
            row.appendChild(actionsTd);

            tblRecords.appendChild(row);
        });
    }
}

function insertOrUpdateRecord() {
    const inputs = getInputs();

    if (!validateInputs(inputs)) {
        alert("Please complete all fields.");
        return;
    }

    const newRecord = {
        fname: inputs[0].value.trim(),
        mname: inputs[1].value.trim(),
        lname: inputs[2].value.trim(),
        age: inputs[3].value.trim()
    };

    if (btnInsertUpdate.value === "insert") {
        arrRecords.push(newRecord);
    } else {
        const index = parseInt(btnInsertUpdate.value);
        arrRecords[index] = newRecord;
    }

    clearInputs();
    renderRecords();
}

function deleteRecord(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        arrRecords.splice(index, 1);
        renderRecords();
    }
}

function loadForEdit(index) {
    const inputs = getInputs();
    const record = arrRecords[index];

    inputs[0].value = record.fname;
    inputs[1].value = record.mname;
    inputs[2].value = record.lname;
    inputs[3].value = record.age;

    btnInsertUpdate.value = index;
    btnInsertUpdate.textContent = "Update";
}

btnInsertUpdate.addEventListener("click", insertOrUpdateRecord);
btnClear.addEventListener("click", clearInputs);
btnClearItems.addEventListener("click", () => {
    arrRecords = [];
    clearInputs();
    renderRecords();
});

// Initialize
renderRecords();
