export function searchEmployees(employees, searchTerm) {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
        return employees;
    }

    return employees.filter((employee) => {
        return (
            employee.name.toLowerCase().includes(search) ||
            employee.email.toLowerCase().includes(search) ||
            employee.phone.toLowerCase().includes(search)
        );
    });
}

export function filterEmployees(employees, company) {
    if (company === "All") {
        return employees;
    }

    return employees.filter((employee) => {
        return employee.company.name === company;
    });
}

export function sortEmployees(employees, sortOption) {
    const sortedEmployees = [...employees];

    switch (sortOption) {
        case "name-asc":
            return sortedEmployees.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

        case "name-desc":
            return sortedEmployees.sort((a, b) =>
                b.name.localeCompare(a.name)
            );

        case "id-asc":
            return sortedEmployees.sort((a, b) => a.id - b.id);

        case "id-desc":
            return sortedEmployees.sort((a, b) => b.id - a.id);

        default:
            return sortedEmployees;
    }
}

export function getCompanies(employees) {
    return [
        ...new Set(
            employees.map((employee) => employee.company.name)
        )
    ].sort();
}