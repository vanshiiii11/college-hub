import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)

  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password,
    },
  })

  const colleges = [
    {
      name: 'Indian Institute of Technology Bombay',
      location: 'Mumbai',
      state: 'Maharashtra',
      fees: 250000,
      rating: 4.8,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/IIT_Bombay_Logo.svg/1200px-IIT_Bombay_Logo.svg.png',
      overview: 'IIT Bombay is one of the most prestigious engineering institutions in India, known for excellence in technology and research.',
      courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
      placements: { avgPackage: 2100000, highestPackage: 25000000, placementRate: 95 },
    },
    {
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi',
      state: 'Delhi',
      fees: 230000,
      rating: 4.7,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/IIT_Delhi_logo.svg/1200px-IIT_Delhi_logo.svg.png',
      overview: 'IIT Delhi is a premier engineering institution located in the heart of the national capital, offering world-class education.',
      courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
      placements: { avgPackage: 1900000, highestPackage: 22000000, placementRate: 93 },
    },
    {
      name: 'BITS Pilani',
      location: 'Pilani',
      state: 'Rajasthan',
      fees: 520000,
      rating: 4.5,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png',
      overview: 'BITS Pilani is a leading private university known for its industry connections and flexible academic programs.',
      courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD', 'B.Pharm'],
      placements: { avgPackage: 1600000, highestPackage: 18000000, placementRate: 90 },
    },
    {
      name: 'National Institute of Technology Trichy',
      location: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      fees: 180000,
      rating: 4.4,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/NIT_Trichy_Logo.svg/1200px-NIT_Trichy_Logo.svg.png',
      overview: 'NIT Trichy is one of the top NITs in India, consistently ranked among the best engineering colleges.',
      courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
      placements: { avgPackage: 1400000, highestPackage: 15000000, placementRate: 88 },
    },
    {
      name: 'Vellore Institute of Technology',
      location: 'Vellore',
      state: 'Tamil Nadu',
      fees: 450000,
      rating: 4.2,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/VIT_University_seal_2017.svg/1200px-VIT_University_seal_2017.svg.png',
      overview: 'VIT is a private university known for its strong industry partnerships and diverse student community.',
      courses: ['B.Tech', 'M.Tech', 'MBA', 'BCA', 'MCA'],
      placements: { avgPackage: 1100000, highestPackage: 12000000, placementRate: 85 },
    },
    {
      name: 'Delhi University',
      location: 'New Delhi',
      state: 'Delhi',
      fees: 50000,
      rating: 4.3,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Delhi_University_logo.svg/1200px-Delhi_University_logo.svg.png',
      overview: 'University of Delhi is one of the largest universities in India, offering a wide range of undergraduate and postgraduate programs.',
      courses: ['BA', 'BSc', 'BCom', 'MA', 'MSc', 'MCom', 'PhD'],
      placements: { avgPackage: 800000, highestPackage: 8000000, placementRate: 75 },
    },
  ]

  for (const college of colleges) {
    await prisma.college.create({ data: college })
  }

  console.log('Seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())