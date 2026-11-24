const employeeForm = document.querySelector("#employeeForm");

const employeeId = document.querySelector("#employeeId");
const employeeName = document.querySelector("#employeeName");
const employeeEmail = document.querySelector("#employeeEmail");
const employeePhone = document.querySelector("#employeePhone");
const employeeCompany = document.querySelector("#employeeCompany");
const employeeWebsite = document.querySelector("#employeeWebsite");

const formSection = document.querySelector("#formSection");
const formTitle = document.querySelector("#formTitle");
const formError = document.querySelector("#formError");
const submitBtn = document.querySelector("#submitBtn");

export function openEmployeeForm(employee = null) {
    employeeForm.reset();
    formError.textContent = "";

    formSection.classList.remove("hidden");

    if (employee) {
        employeeId.value = employee.id;
        employeeName.value = employee.name;
        employeeEmail.value = employee.email;
        employeePhone.value = employee.phone;
        employeeCompany.value = employee.company.name;
        employeeWebsite.value = employee.website || "";

        formTitle.textContent = "Edit Employee";
        submitBtn.textContent = "Update Employee";
    } else {
        employeeId.value = "";
        formTitle.textContent = "Add New Employee";
        submitBtn.textContent = "Save Employee";
    }

    formSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

export function closeEmployeeForm() {
    employeeForm.reset();
    employeeId.value = "";
    formError.textContent = "";
    formSection.classList.add("hidden");
}

export function getEmployeeFormData() {
    return {
        id: employeeId.value,
        name: employeeName.value.trim(),
        email: employeeEmail.value.trim(),
        phone: employeePhone.value.trim(),
        website: employeeWebsite.value.trim(),
        company: {
            name: employeeCompany.value.trim()
        }
    };
}

export function displayFormError(message) {
    formError.textContent = message;
}

export function setFormLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading
        ? "Saving..."
        : employeeId.value
            ? "Update Employee"
            : "Save Employee";
}