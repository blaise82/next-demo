import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    countries: async (_parent, _args, _context) => {
      const countries = await prisma.countries.findMany();
      return countries;
    },
  },

  Mutation: {
    addCountry: async (_parent, _args, _context) => {
      const country = await prisma.countries.create({
        data: {
          name: _args.name,
          year: _args.year,
          area: _args.area,
          population: _args.population,
        },
      });
      return country;
    },
    editCountry: async (_parent, _args, _context) => {
      const country = await prisma.countries.update({
        where: {
          id: _args.id,
        },
        data: {
          name: _args.name,
          year: _args.year,
          area: _args.area,
          population: _args.population,
        },
      });
      return country;
    },
    deleteCountry: async (_parent, _args, _context) => {
      const country = await prisma.countries.delete({
        where: {
          id: _args.id,
        },
      });
      return country;
    },
  },
};
