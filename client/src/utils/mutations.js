import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      first_name
      last_name
      email
      phone
      dateOfBirth
      profileImage
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      _id
      first_name
      last_name
      email
      phone
      gender
      dateOfBirth
      profileImage
    }
  }
`;
