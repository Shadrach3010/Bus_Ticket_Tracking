import type { AuthUser, UserRole } from "@/types";

type MockUser = AuthUser & {
  password: string;
};

const mockUsers: MockUser[] = [
  {
    id: "passenger-001",
    firstName: "Aminata",
    lastName: "Kamara",
    name: "Aminata Kamara",
    email: "passenger@example.com",
    phone: "+23276123456",
    role: "passenger",
    password: "Password123!",
  },
  {
    id: "conductor-001",
    firstName: "Mohamed",
    lastName: "Bangura",
    name: "Mohamed Bangura",
    email: "conductor@example.com",
    phone: "+23276222333",
    role: "conductor",
    password: "Password123!",
  },
  {
    id: "admin-001",
    firstName: "man",
    lastName: "Conteh",
    name: "Man Conteh",
    email: "admin@example.com",
    phone: "+23276333444",
    role: "administrator",
    password: "Password123!",
  },
];

export function getPublicUser(user: MockUser): AuthUser {
  return {
    id: user.id,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    name: user.name,
    email: user.email,
    phone: user.phone,
    nationalId: user.nationalId,
    role: user.role,
  };
}

export function findUserByCredentials(
  email: string,
  password: string,
  role: UserRole,
) {
  const normalizedEmail = email.toLowerCase().trim();

  return mockUsers.find(
    (user) =>
      user.email === normalizedEmail &&
      user.password === password &&
      user.role === role,
  );
}

export function findUserById(id: string) {
  return mockUsers.find((user) => user.id === id);
}

export function updateUserProfile(
  id: string,
  input: Partial<Pick<AuthUser, "firstName" | "middleName" | "lastName" | "phone" | "nationalId">>,
) {
  const user = findUserById(id);

  if (!user) {
    return null;
  }

  Object.assign(user, input);
  user.name = [user.firstName, user.middleName, user.lastName]
    .filter(Boolean)
    .join(" ");

  return user;
}

export function emailExists(email: string) {
  const normalizedEmail = email.toLowerCase().trim();
  return mockUsers.some((user) => user.email === normalizedEmail);
}

export function createPassengerUser(input: {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  nationalId?: string;
  password: string;
}) {
  const user: MockUser = {
    id: `passenger-${mockUsers.length + 1}`.padStart(13, "0"),
    firstName: input.firstName,
    middleName: input.middleName,
    lastName: input.lastName,
    name: [input.firstName, input.middleName, input.lastName]
      .filter(Boolean)
      .join(" "),
    email: input.email.toLowerCase().trim(),
    phone: input.phone,
    nationalId: input.nationalId,
    role: "passenger",
    password: input.password,
  };

  mockUsers.push(user);
  return user;
}
