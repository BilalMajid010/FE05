import { API_URL } from "../config/config.js";

async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
        return null;
    }

    return await response.json();
}

export async function getEmployees() {
    const response = await fetch(`${API_URL}/users`);
    return await handleResponse(response);
}

export async function getEmployeeById(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return await handleResponse(response);
}

export async function createEmployee(employee) {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });

    return await handleResponse(response);
}

export async function updateEmployee(id, employee) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });

    return await handleResponse(response);
}

export async function deleteEmployee(id) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE"
    });

    return await handleResponse(response);
}