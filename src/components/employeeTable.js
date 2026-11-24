export function renderEmployees(employees) {
    const employeeTable = document.querySelector("#employeeTable");

    employeeTable.replaceChildren();

    employees.forEach((employee) => {
        const row = document.createElement("tr");

        const values = [
            employee.id,
            employee.name,
            employee.email,
            employee.phone,
            employee.company.name
        ];

        values.forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        actionCell.className = "action-cell";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "btn btn-edit";
        editButton.dataset.action = "edit";
        editButton.dataset.id = employee.id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-delete";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = employee.id;

        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);

        employeeTable.appendChild(row);
    });
}