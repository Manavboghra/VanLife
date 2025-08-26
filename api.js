export async function getVans() {
    try {
        const res = await fetch("http://localhost:5000/vans");
        if (!res.ok) {
            throw {
                message: "Failed to fetch vans",
                statusText: res.statusText,
                status: res.status,
            }
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}


export async function getVanById(id) {
    try {
        const res = await fetch(`http://localhost:5000/vans/${id}`)
        if (!res.ok) {
            const error = {
                message: `Failed to fetch van by id: ${id}`,
                statusText: res.statusText,
                status: res.status,
            }
            console.error("Error in getVanById:", error)
            throw error
        }
        const data = await res.json()
        return data
    } catch (error) {
        throw error;
    }
}

export async function loginUser(creds) {
    const res = await fetch(`http://localhost:5000/users?email=${creds.email}`);
    if (!res.ok) {
        throw {
            message: "Login failed. Please try again.",
            statusText: res.statusText,
            status: res.status
        };
    }
    const users = await res.json();

    if (users.length === 0) {
        throw {
            message: "No user with those credentials found!",
            statusText: "Not Found",
            status: 404
        };
    }

    const foundUser = users.find(user => user.password === creds.password);

    if (!foundUser) {
        throw {
            message: "No user with those credentials found!",
            statusText: "Unauthorized",
            status: 401
        };
    }

    const userToSend = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
    };
    
    return userToSend;
}
