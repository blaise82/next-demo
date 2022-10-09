import { useQuery, gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  {
    countries {
      id
      name
      year
      area
      population
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation addCountry($id: String, $name: String, $year: Int, $area: Int, $population: Int) {
    addCountry(id: $id, name: $name, year: $year, area: $area, population: $population) {
      id
      name
      year
      area
      population
    }
  }
`;

export const DELETE_COUNTRY = gql`
  mutation deleteCountry($id: String) {
    deleteCountry(id: $id) {
      id
      name
    }
  }
`;

export const EDIT_COUNTRY = gql`
  mutation editCountry($id: String, $name: String, $year: Int, $area: Int, $population: Int) {
    editCountry(id: $id, name: $name, year: $year, area: $area, population: $population) {
      id
      name
      year
      area
      population
    }
  }
`;
