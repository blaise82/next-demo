import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type countries {
    id: String
    name: String
    year: Int
    area: Int
    population: Int
  }

  type Query {
    countries: [countries]
  }

  type Mutation {
    addCountry(id: String, name: String, year: Int, area: Int, population: Int): countries
    editCountry(id: String, name: String, year: Int, area: Int, population: Int): countries
    deleteCountry(id: String): countries
  }
`;
