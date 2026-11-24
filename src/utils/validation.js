export function validateEmployee(employee) {
    if (!employee.name) {
        return "Employee name is required.";
    }

    if (employee.name.length < 3) {
        return "Employee name must contain at least 3 characters.";
    }

    if (!employee.email) {
        return "Email address is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(employee.email)) {
        return "Please enter a valid email address.";
    }

    if (!employee.phone) {
        return "Phone number is required.";
    }

    if (!employee.company.name) {
        return "Company name is required.";
    }

    return null;
}