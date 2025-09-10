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

export async function getHostVans(hostId) {
  try {
    const res = await fetch(`http://localhost:5000/vans?hostId=${hostId}`);
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
  const resUsers = await fetch(`http://localhost:5000/users?email=${creds.email}`);
  const resHosts = await fetch(`http://localhost:5000/hosts?email=${creds.email}`);

  if (!resUsers.ok || !resHosts.ok) {
    throw {
      message: "Login failed. Please try again.",
      statusText: (!resUsers.ok ? resUsers.statusText : resHosts.statusText),
      status: (!resUsers.ok ? resUsers.status : resHosts.status)
    };
  }

  const users = await resUsers.json();
  const hosts = await resHosts.json();

  if (users.length === 0 && hosts.length === 0) {
    throw {
      message: "No user with those credentials found! Please Signup",
      statusText: "Not Found",
      status: 404
    };
  }

  const foundUser =
    users.find(user => user.password === creds.password) ||
    hosts.find(host => host.password === creds.password);

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
  const resUser = await fetch(`http://localhost:5000/users`);
  const allUsers = await resUser.json();

  const resHost = await fetch(`http://localhost:5000/hosts`);
  const allHosts = await resHost.json();

  const isTaken =
    allUsers.some(
      user => user.name && user.name.toLowerCase() === username.toLowerCase()
    ) ||
    allHosts.some(
      host => host.name && host.name.toLowerCase() === username.toLowerCase()
    );

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


export async function signupHost(creds) {
  const allHostsRes = await fetch(`http://localhost:5000/hosts`);
  const allHosts = await allHostsRes.json();

  const existingEmail = allHosts.find(
    host => host.email.toLowerCase() === creds.email.toLowerCase()
  );
  if (existingEmail) {
    throw {
      message: "An account with this email already exists.",
      status: 409
    };
  }

  const existingUsername = allHosts.find(
    host => host.name && host.name.toLowerCase() === creds.name.toLowerCase()
  );
  if (existingUsername) {
    throw {
      message: "This username is already taken.",
      status: 409
    };
  }

  const res = await fetch("http://localhost:5000/hosts", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  });

  if (!res.ok) {
    throw {
      message: "Failed to create host account. Please try again.",
      statusText: res.statusText,
      status: res.status
    };
  }

  const data = await res.json();
  return data;
}

export async function getHost() {
  try {
    const res = await fetch("http://localhost:5000/hosts");
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


export async function updateVan(params) {
  const vanRes = await fetch(`http://localhost:5000/vans/${params.id}`);
  if (!vanRes.ok) {
    throw new Error(`Van not found: ${vanRes.status} ${vanRes.statusText}`);
  }
  const van = await vanRes.json();

  const updatedVan = {
    ...van,
    name: params.name,
    price: params.price,
    description: params.description,
    imageUrl: params.imageUrl,
    type: params.type,
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


export async function deleteVan(params) {
  try {
    const res = await fetch(`http://localhost:5000/vans/${params}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw {
        message: "Failed to remove from cart",
        statusText: res.statusText,
        status: res.status,
      };
    }

    return true;
  } catch (error) {
    throw error;
  }
}


export async function getCart(userId) {
  try {
    const res = await fetch(`http://localhost:5000/cart?userId=${userId}`);
    if (!res.ok) {
      throw {
        message: "Failed to fetch cart",
        statusText: res.statusText,
        status: res.status,
      };
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}




export async function addToCart(userId, van) {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const formattedTomorrow = new Intl.DateTimeFormat("en-CA").format(tomorrow);
  const formattedDayAfterTomorrow = new Intl.DateTimeFormat("en-CA").format(dayAfterTomorrow);
  console.log(van)

  try {
    const newCartItem = {
      userId,
      hostId: van.hostId,
      vanId: van.id,
      name: van.name,
      price: van.price,
      imageUrl: van.imageUrl,
      type: van.type,
      daysCount: 1,
      daysId: { start: formattedTomorrow, end: formattedDayAfterTomorrow },
    };

    const res = await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCartItem),
    });

    if (!res.ok) {
      throw {
        message: "Failed to add to cart",
        statusText: res.statusText,
        status: res.status,
      };
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function updateCartItem(cartItemId, updates) {
  // upupdates
  try {
    const res = await fetch(`http://localhost:5000/cart/${cartItemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      throw {
        message: "Failed to update cart item",
        statusText: res.statusText,
        status: res.status,
      };
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

// Remove item from cart
export async function removeFromCart(cartItemId) {
  try {
    const res = await fetch(`http://localhost:5000/cart/${cartItemId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw {
        message: "Failed to remove from cart",
        statusText: res.statusText,
        status: res.status,
      };
    }

    return true;
  } catch (error) {
    throw error;
  }
}

// Clear cart for a user
export async function clearCart(userId) {
  try {
    const res = await fetch(`http://localhost:5000/cart?userId=${userId}`);
    const items = await res.json();

    await Promise.all(
      items.map((item) =>
        fetch(`http://localhost:5000/cart/${item.id}`, { method: "DELETE" })
      )
    );

    return true;
  } catch (error) {
    throw error;
  }
}

export async function hostBooking(orderId, vans) {
  try {
    const orderData = {
      orderId: orderId,
      [`items`]: vans.map((van) => {
        const subTotal = van.price * (van.daysCount || 1);
        const tax = (subTotal * 12) / 100;
        const income = (subTotal + tax).toFixed(2);

        const startDate = new Date(van.daysId.start);
        const endDate = new Date(van.daysId.end);

        const formattedStartDate = startDate.toLocaleDateString("en-US", {
          month: "short", // Sep
          day: "numeric", // 30
          year: "numeric", // 2025
        });

        const formattedEndDate = endDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        return {
          hostId: Number(van.hostId),
          income,
          start:formattedStartDate,
          end:formattedEndDate,
          vanId: van.vanId,
          name: van.name,
          price: van.price,
          imageUrl: van.imageUrl,
          type: van.type,
        };
      }),
    };

    const res = await fetch(`http://localhost:5000/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error("Failed to save booking");

    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function getBookedVans() {
  const res = await fetch("http://localhost:5000/bookings")
  return await res.json()
}