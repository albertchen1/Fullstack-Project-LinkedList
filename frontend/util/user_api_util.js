export const updateUser = (user) => (
    $.ajax({
        method: "PATCH",
        url: `/api/users/${user.id}`,
        data: {
            user
        }
    })
)

export const fetchUser = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}`
    })
)