export type Role = "user" | "moderator"

export const getRoleFromString = (role: string) => {
    switch (role) {
        case "user":
            return "user"
        case "moderator":
            return "moderator"
        default:
            throw new Error(`Invalid role: ${role}`);
    }
}

export default interface User {
    role: "user" | "moderator"
    login: string
}