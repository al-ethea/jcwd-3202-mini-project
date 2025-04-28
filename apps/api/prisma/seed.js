const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// to hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const artist = [
  { name: 'Coldplay', category: 'Pop' },
  { name: 'Lady Gaga', category: 'Pop' },
  { name: 'Adele', category: 'Pop' },
  { name: 'Taylor Swift', category: 'Pop' },
  { name: 'Ed Sheeran', category: 'Pop' },
  { name: 'Bruno Mars', category: 'R&B' },
  { name: 'Billie Eilish', category: 'Alternative' },
  { name: 'Kendrick Lamar', category: 'Hip-Hop' },
  { name: 'The Weeknd', category: 'R&B' },
  { name: 'Dua Lipa', category: 'Pop' },
  { name: 'Bad Bunny', category: 'Reggaeton' },
  { name: 'Post Malone', category: 'Hip-Hop' },
  { name: 'Ariana Grande', category: 'Pop' },
  { name: 'Doja Cat', category: 'Rap' },
  { name: 'Imagine Dragons', category: 'Alternative Rock' },
  { name: 'Harry Styles', category: 'Pop Rock' },
  { name: 'Rihanna', category: 'Pop' },
  { name: 'Coldplay', category: 'Alternative Rock' },
  { name: 'SZA', category: 'R&B' },
  { name: 'Olivia Rodrigo', category: 'Pop Rock' },
  { name: 'Shakira', category: 'Latin Pop' },
  { name: 'Travis Scott', category: 'Hip-Hop' },
  { name: 'Lady Gaga', category: 'Pop' },
  { name: 'J Balvin', category: 'Reggaeton' },
  { name: 'Tyler, The Creator', category: 'Hip-Hop' },
  { name: 'Lizzo', category: 'Pop' },
  { name: 'Megan Thee Stallion', category: 'Hip-Hop' },
  { name: 'BLACKPINK', category: 'K-Pop' },
  { name: 'Shawn Mendes', category: 'Pop' },
  { name: 'Marshmello', category: 'EDM' },
];

const users = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    postcode: '12345',
    password: 'password123',
    role: 'ATTENDEE',
    referralCode: 'ALICE123',
    totalPoints: 0,
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    postcode: '54321',
    password: 'secret456',
    role: 'ORGANIZER',
    referralCode: 'BOB456',
    totalPoints: 0,
  },
  {
    firstName: 'Latriel',
    lastName: 'Walker',
    email: 'lateriel.walker@example.com',
    postcode: '10101',
    password: 'password123',
    role: 'ATTENDEE',
    referralCode: 'LATRIEL789',
    totalPoints: 0,
  },
  {
    firstName: 'Benjamin',
    lastName: 'Stone',
    email: 'ben.stone@example.com',
    postcode: '10202',
    password: 'secure456',
    role: 'ORGANIZER',
    referralCode: 'BENJAMIN101',
    totalPoints: 0,
  },
  {
    firstName: 'Carla',
    lastName: 'Mitchell',
    email: 'carla.m@example.com',
    postcode: '10303',
    password: 'abc123xyz',
    role: 'ATTENDEE',
    referralCode: 'CARLA202',
    totalPoints: 0,
  },
];

const event = [];

// async function main() {
//   artist.forEach(async (item) => {
//     await prisma.artist.create({
//       data: item,
//     });
//   });
//   user.forEach(async (item) => {
//     const hashed = await hashPassword(item.password);
//     await prisma.user.create({
//       data: item,
//       password: hashed,
//     });
//   });
// }

async function main() {
  for (const item of users) {
    const hashed = await hashPassword(item.password);
    await prisma.user.create({
      data: {
        ...item,
        password: hashed,
      },
    });
  }
  // for (const item of artist) {
  //   await prisma.artist.create({
  //     data: item,
  //   });
  // }
  // for (const item of event) {
  //   await prisma.event.create({
  //     data: item,
  //   });
  // }
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
