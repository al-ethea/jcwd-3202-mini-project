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

const user = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    postcode: '12345',
    password: 'password123',
    role: 'ATTENDEE', // must match your enum
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    postcode: '54321',
    password: 'secret456',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Latriel',
    lastName: 'Walker',
    email: 'lateriel.walker@example.com',
    postcode: '10101',
    password: 'password123',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Benjamin',
    lastName: 'Stone',
    email: 'ben.stone@example.com',
    postcode: '10202',
    password: 'secure456',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Carla',
    lastName: 'Mitchell',
    email: 'carla.m@example.com',
    postcode: '10303',
    password: 'abc123xyz',
    role: 'ATTENDEE',
  },
  {
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@example.com',
    postcode: '10404',
    password: 'qwerty789',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Ella',
    lastName: 'Jameson',
    email: 'ella.j@example.com',
    postcode: '10505',
    password: 'ella2024',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Finn',
    lastName: 'Harper',
    email: 'finn.harper@example.com',
    postcode: '10606',
    password: 'finnRules',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Grace',
    lastName: 'Kim',
    email: 'grace.k@example.com',
    postcode: '10707',
    password: 'grace123',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Henry',
    lastName: 'Nguyen',
    email: 'henry.n@example.com',
    postcode: '10808',
    password: 'henryPass',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Isla',
    lastName: 'Chen',
    email: 'isla.chen@example.com',
    postcode: '10909',
    password: 'iloveevents',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Jake',
    lastName: 'Rivera',
    email: 'jake.r@example.com',
    postcode: '11010',
    password: 'passJake123',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Kylie',
    lastName: 'Tran',
    email: 'kylie.tran@example.com',
    postcode: '11111',
    password: 'kylieSecure',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Liam',
    lastName: 'Park',
    email: 'liam.p@example.com',
    postcode: '11212',
    password: 'liamPword',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Maya',
    lastName: 'Lopez',
    email: 'maya.lopez@example.com',
    postcode: '11313',
    password: 'mayaMaya1',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Nathan',
    lastName: 'Singh',
    email: 'nathan.singh@example.com',
    postcode: '11414',
    password: 'nathan@2024',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Olivia',
    lastName: 'Foster',
    email: 'olivia.f@example.com',
    postcode: '11515',
    password: 'oliviaPASS',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Patrick',
    lastName: 'Murphy',
    email: 'patrick.m@example.com',
    postcode: '11616',
    password: 'patrickP',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Quinn',
    lastName: 'Adams',
    email: 'quinn.adams@example.com',
    postcode: '11717',
    password: 'quinnSecure',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Ruby',
    lastName: 'Hernandez',
    email: 'ruby.h@example.com',
    postcode: '11818',
    password: 'rubyPass1',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Sam',
    lastName: 'Green',
    email: 'sam.green@example.com',
    postcode: '11919',
    password: 'sam123pass',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Tina',
    lastName: 'Peterson',
    email: 'tina.p@example.com',
    postcode: '12020',
    password: 'tinaLove',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Umar',
    lastName: 'Ali',
    email: 'umar.ali@example.com',
    postcode: '12121',
    password: 'umar456',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Vera',
    lastName: 'Brooks',
    email: 'vera.b@example.com',
    postcode: '12222',
    password: 'vera321',
    role: 'ATTENDEE',
  },
  {
    firstName: 'William',
    lastName: 'Young',
    email: 'will.young@example.com',
    postcode: '12323',
    password: 'willPass',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Xander',
    lastName: 'White',
    email: 'xander.w@example.com',
    postcode: '12424',
    password: 'xPass999',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Yara',
    lastName: 'Scott',
    email: 'yara.s@example.com',
    postcode: '12525',
    password: 'yaraBest',
    role: 'ORGANIZER',
  },
  {
    firstName: 'Zane',
    lastName: 'Evans',
    email: 'zane.evans@example.com',
    postcode: '12626',
    password: 'zane2024',
    role: 'ATTENDEE',
  },
  {
    firstName: 'Lily',
    lastName: 'James',
    email: 'lily.j@example.com',
    postcode: '12727',
    password: 'lilySecure!',
    role: 'ATTENDEE',
  },
];

const event = [
  {
    name: 'Adele Live in Tokyo',
    city: 'Tokyo',
    venue: 'Grand Theater',
    date: new Date('2025-08-10T20:00:00'),
    category: 'Pop',
    price: 120,
    description: 'Amazing performance by Adele in Tokyo. Don’t miss out!',
    availableSeats: 3000,
    type: 'PAID',
    artistId: 6,
    userId: '160b669e-2811-43f0-a6b4-864ab4d6112b',
  },
  {
    name: 'Marshmello Live in Bangkok',
    city: 'Bangkok',
    venue: 'Stadium Arena',
    date: new Date('2025-06-01T21:00:00'),
    category: 'EDM',
    price: 0,
    description: 'Enjoy Marshmello for free under the Bangkok night sky!',
    availableSeats: 4500,
    type: 'FREE',
    artistId: 28,
    userId: '25d5e6ed-5a5e-4d88-b632-96548a7d9787',
  },
];

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
  // for (const item of user) {
  //   const hashed = await hashPassword(item.password);
  //   await prisma.user.create({
  //     data: {
  //       ...item,
  //       password: hashed,
  //     },
  //   });
  // }
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
