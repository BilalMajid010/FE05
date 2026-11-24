import "./style.css";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "./api/employeeAPI.js";

import { renderEmployees } from "./components/employeeTable.js";

import {
    openEmployeeForm,
    closeEmployeeForm,
    getEmployeeFormData,
    displayFormError,
    setFormLoading
} from "./components/employeeForm.js";

import { renderPagination } from "./components/pagination.js";

import { validateEmployee } from "./utils/validation.js";

import {
    searchEmployees,
    filterEmployees,
    sortEmployees,
    getCompanies
} from "./utils/employeeUtils.js";

let employees = [];
let currentPage = 1;

const employeesPerPage = 5;

const employeeTable = document.querySelector("#employeeTable");
const searchInput = document.querySelector("#searchInput");
const companyFilter = document.querySelector("#companyFilter");
const sortSelect = document.querySelector("#sortSelect");

const loadingMessage = document.querySelector("#loadingMessage");
const errorMessage = document.querySelector("#errorMessage");
const emptyMessage = document.querySelector("#emptyMessage");
const tableWrapper = document.querySelector("#tableWrapper");

const employeeForm = document.querySelector("#employeeForm");

const addEmployeeBtn = document.querySelector("#addEmployeeBtn");
const closeFormBtn = document.querySelector("#closeFormBtn");
const cancelFormBtn = document.querySelector("#cancelFormBtn");

const totalEmployees = document.querySelector("#totalEmployees");
const totalCompanies = document.querySelector("#totalCompanies");
const showingEmployees = document.querySelector("#showingEmployees");
const recordCount = document.querySelector("#recordCount");

function setLoading(isLoading) {
    loadingMessage.classList.toggle("hidden", !isLoading);
    tableWrapper.classList.toggle("hidden", isLoading);

    if (isLoading) {
        emptyMessage.classList.add("hidden");
        errorMessage.classList.add("hidden");
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function hideError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
}

function updateStatistics() {
    totalEmployees.textContent = employees.length;

    totalCompanies.textContent = getCompanies(employees).length;
}

function updateCompanyFilter() {
    const selectedCompany = companyFilter.value;
    const companies = getCompanies(employees);

    companyFilter.replaceChildren();

    const allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All Companies";

    companyFilter.appendChild(allOption);

    companies.forEach((company) => {
        const option = document.createElement("option");

        option.value = company;
        option.textContent = company;

        companyFilter.appendChild(option);
    });

    if (companies.includes(selectedCompany)) {
        companyFilter.value = selectedCompany;
    }
}

function getFilteredEmployees() {
    let result = searchEmployees(
        employees,
        searchInput.value
    );

    result = filterEmployees(
        result,
        companyFilter.value
    );

    result = sortEmployees(
        result,
        sortSelect.value
    );

    return result;
}

function renderApplication() {
    const filteredEmployees = getFilteredEmployees();

    const totalPages = Math.ceil(
        filteredEmployees.length / employeesPerPage
    );

    if (totalPages > 0 && currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * employeesPerPage;

    const currentEmployees = filteredEmployees.slice(
        startIndex,
        startIndex + employeesPerPage
    );

    renderEmployees(currentEmployees);

    renderPagination(
        filteredEmployees.length,
        currentPage,
        employeesPerPage,
        (page) => {
            currentPage = page;
            renderApplication();
        }
    );

    updateStatistics();

    showingEmployees.textContent = currentEmployees.length;

    recordCount.textContent =
        `${filteredEmployees.length} records`;

    const isEmpty = filteredEmployees.length === 0;

    emptyMessage.classList.toggle("hidden", !isEmpty);
    tableWrapper.classList.toggle("hidden", isEmpty);
}

async function loadEmployees() {
    setLoading(true);
    hideError();

    try {
        employees = await getEmployees();

        updateCompanyFilter();
        renderApplication();
    } catch (error) {
        showError(
            "Unable to load employees. Please check your connection and try again."
        );

        console.error(error);
    } finally {
        setLoading(false);
    }
}

async function handleEmployeeSubmit(event) {
    event.preventDefault();

    hideError();

    const employee = getEmployeeFormData();

    const validationError = validateEmployee(employee);

    if (validationError) {
        displayFormError(validationError);
        return;
    }

    setFormLoading(true);

    try {
        if (employee.id) {
            const id = Number(employee.id);

            const updatedEmployee = await updateEmployee(
                id,
                {
                    name: employee.name,
                    email: employee.email,
                    phone: employee.phone,
                    website: employee.website,
                    company: employee.company
                }
            );

            employees = employees.map((existingEmployee) =>
                existingEmployee.id === id
                    ? { ...existingEmployee, ...updatedEmployee }
                    : existingEmployee
            );

            alert("Employee updated successfully.");
        } else {
            const newEmployee = await createEmployee({
                name: employee.name,
                email: employee.email,
                phone: employee.phone,
                website: employee.website,
                company: employee.company
            });

            employees = [
                ...employees,
                {
                    ...employee,
                    ...newEmployee,
                    company: employee.company
                }
            ];

            alert("Employee added successfully.");
        }

        closeEmployeeForm();
        updateCompanyFilter();
        currentPage = 1;
        renderApplication();
    } catch (error) {
        displayFormError(
            "Unable to save employee. Please try again."
        );

        console.error(error);
    } finally {
        setFormLoading(false);
    }
}

async function handleEmployeeActions(event) {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);

    const employee = employees.find(
        (item) => item.id === id
    );

    if (!employee) {
        return;
    }

    const action = button.dataset.action;

    if (action === "edit") {
        openEmployeeForm(employee);
        return;
    }

    if (action === "delete") {
        const confirmed = confirm(
            `Are you sure you want to delete ${employee.name}?`
        );

        if (!confirmed) {
            return;
        }

        button.disabled = true;
        hideError();

        try {
            await deleteEmployee(id);

            employees = employees.filter(
                (item) => item.id !== id
            );

            updateCompanyFilter();
            renderApplication();

            alert("Employee deleted successfully.");
        } catch (error) {
            showError(
                "Unable to delete employee. Please try again."
            );

            console.error(error);
            button.disabled = false;
        }
    }
}

addEmployeeBtn.addEventListener("click", () => {
    openEmployeeForm();
});

closeFormBtn.addEventListener("click", closeEmployeeForm);

cancelFormBtn.addEventListener("click", closeEmployeeForm);

employeeForm.addEventListener(
    "submit",
    handleEmployeeSubmit
);

employeeTable.addEventListener(
    "click",
    handleEmployeeActions
);

searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderApplication();
});

companyFilter.addEventListener("change", () => {
    currentPage = 1;
    renderApplication();
});

sortSelect.addEventListener("change", () => {
    currentPage = 1;
    renderApplication();
});

loadEmployees();