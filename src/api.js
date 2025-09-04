import { useEffect } from "react";

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

export async function getHostVans() {
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


export async function getNewVan(creds) {
  const res = await fetch("http://localhost:5000/vans", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds)
  });
  const data = await res.json();
  return data;
}



export async function getReview(params) {
  const vanRes = await fetch(`http://localhost:5000/vans/${params.id}`);
  const van = await vanRes.json();

  const updatedVan = {
    ...van,
    reviews: [
      ...(van.reviews || []),
      {
        reviewer: params.reviewer,
        date: params.date,
        stars: params.stars,
        payment: params.payment,
        comment: params.comment,
      },
    ],
  };

  const res = await fetch(`http://localhost:5000/vans/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedVan),
  });

  if (!res.ok) {
    throw new Error(`Failed to update van: ${res.status} ${res.statusText}`);
  }

  return await res.json();
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
            message: "No user with those credentials found! Please Signup",
            statusText: "Not Found",
            status: 404
        };
    }

    const foundUser = users.find(user => user.password === creds.password);

    if (!foundUser) {
        throw {
            message: "Please enter correct password!!",
            statusText: "Unauthorized",
            status: 401
        };
    }

    const userToSend = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        hostId: foundUser.hostId
    };

    return userToSend;
}
// export async function loginUser(creds) {
//     const res = await fetch(`http://localhost:5000/users?email=${creds.email}`);
//     if (!res.ok) {
//         throw {
//             message: "Login failed. Please try again.",
//             statusText: res.statusText,
//             status: res.status
//         };
//     }
//     const users = await res.json();

//     if (users.length === 0) {
//         throw {
//             message: "No user with those credentials found!",
//             statusText: "Not Found",
//             status: 404
//         };
//     }

//     const foundUser = users.find(user => user.password === creds.password);

//     if (!foundUser) {
//         throw {
//             message: "No user with those credentials found!",
//             statusText: "Unauthorized",
//             status: 401
//         };
//     }

//     const userToSend = {
//         id: foundUser.id,
//         name: foundUser.name,
//         email: foundUser.email
//     };

//     return userToSend;
// }

export async function checkUsername(username) {
    const res = await fetch(`http://localhost:5000/users`);
    const allUsers = await res.json();

    const isTaken = allUsers.some(user => user.name && user.name.toLowerCase() === username.toLowerCase());

    return isTaken;
}
export async function signupUser(creds) {
    const allUsersRes = await fetch(`http://localhost:5000/users`);
    const allUsers = await allUsersRes.json();

    const existingEmail = allUsers.find(user => user.email.toLowerCase() === creds.email.toLowerCase());
    if (existingEmail) {
        throw {
            message: "An account with this email already exists.",
            status: 409
        };
    }

    const existingUsername = allUsers.find(user => user.name && user.name.toLowerCase() === creds.name.toLowerCase());
    if (existingUsername) {
        throw {
            message: "This username is already taken.",
            status: 409
        };
    }

    const res = await fetch("http://localhost:5000/users", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
    });
    if (!res.ok) {
        throw {
            message: "Failed to create account. Please try again.",
            statusText: res.statusText,
            status: res.status
        };
    }
    const data = await res.json();
    return data;
}
