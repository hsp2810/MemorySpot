import { users } from './tempData.js';
export const fetchMyUser = () => {
  return {
    id: 1234,
    firstName: 'Kylan',
    lastName: 'Kidd',
    username: 'The_Kiddler4',
    friends: [],
    email: 'Kylan.Kidd@gmail.com',
    profilePicture: 'https://via.placeholder.com/150',
  };
};

export const fetchFriends = () => {
  return [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 2,
      name: 'Jane Doe',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 3,
      name: 'Bob Smith',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 4,
      name: 'Samantha Johnson',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 5,
      name: 'Peter Parker',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 6,
      name: 'Mary Jane Watson',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 7,
      name: 'Bruce Wayne',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 8,
      name: 'Clark Kent',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 9,
      name: 'Diana Prince',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 10,
      name: 'Barry Allen',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 11,
      name: 'Hal Jordan',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 12,
      name: 'Arthur Curry',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 13,
      name: 'Oliver Queen',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 14,
      name: 'Selina Kyle',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 15,
      name: 'Harvey Dent',
      avatar: 'https://bit.ly/dan-abramov',
    },
  ];
};

// requre this for search
export const fetchUsers = () => {
  return (users = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 2,
      name: 'Jane Doe',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 3,
      name: 'Bob Smith',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 4,
      name: 'Samantha Johnson',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 5,
      name: 'Peter Parker',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 6,
      name: 'Mary Jane Watson',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 7,
      name: 'Bruce Wayne',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 8,
      name: 'Clark Kent',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 9,
      name: 'Diana Prince',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 10,
      name: 'Barry Allen',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 11,
      name: 'Hal Jordan',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 12,
      name: 'Arthur Curry',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 13,
      name: 'Oliver Queen',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 14,
      name: 'Selina Kyle',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 15,
      name: 'Harvey Dent',
      avatar: 'https://bit.ly/dan-abramov',
    },
  ]);
};

export function fetchProfile(id) {
  // search for that perso
  return {
    id: 1234,
    firstName: 'Kylan1',
    lastName: 'Kidd',
    username: 'The_Kiddler4',
    friends: [
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'John',
      'Jane',
      'Bob',
      'jessi',
      'fade',
    ],
    email: 'Kylan.Kidd@gmail.com',
    profilePicture: 'https://via.placeholder.com/150',
    bio: 'Hi. My name’s River. I’m from San Francisco & I film concerts for a living. I quite enjoy what I do. Before that, I was a lawyer. Courts got too boring so I decided to live life a bit more loose. My family owns a liquor store, so if I ever needed a job, I could’ve easily started there. But I wanted to take my own path. And my path was my camera.',
  };
}

export const updateUser = user => {
  console.log(user);
};

export const searchFriends = () => {};
