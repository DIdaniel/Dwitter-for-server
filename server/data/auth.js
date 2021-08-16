let users = [
  {
    id: "1",
    username: "bob",
    password:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJvYiIsInBhc3N3b3JkIjoiYWJjZDEyMzQifQ.hvxcpdJn7tENf5J_9quxOm1MZzT0PaT9VX4q1U1KtoA",
    name: "Bob",
    email: "bob@gmail.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
