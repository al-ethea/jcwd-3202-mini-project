const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

async function main() {
  artist.forEach(async (item) => {
    await prisma.artist.create({
      data: item,
    });
  });
  // user.forEach(async (item) => {
  //   await prisma.user.create({
  //     data: item,
  //   });
  // });
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
