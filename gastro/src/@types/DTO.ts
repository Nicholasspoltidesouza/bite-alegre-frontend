interface UserDTO {
    profilePhoto?: string;
    name: string;
    nickname: string;
    email: string;
    password: string;
    phone: string;
    gender: string | null;
    birthDate?: string;
}

export type { UserDTO };