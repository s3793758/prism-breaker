import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      first_name
      last_name
      username
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
      username
      email
      phone
      gender
      dateOfBirth
      profileImage
    }
  }
`;

export const UPLOAD_PROFILE_IMAGE = gql`
  mutation uploadProfileImage($image: Upload!, $userId: ID!) {
    uploadProfileImage(image: $image, userId: $userId) {
      filePath
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost(
    $postMessage: String!
    $postImage: String
    $postVideo: String
    $userId: ID!
  ) {
    addPost(
      postMessage: $postMessage
      postImage: $postImage
      postVideo: $postVideo
      userId: $userId
    ) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation ($postId: ID!, $userId: ID!) {
    deletePost(postId: $postId, userId: $userId) {
      _id
      postMessage
    }
  }
`;

export const UPLOAD_POST_IMAGE = gql`
  mutation singleUpload($file: Upload!, $userId: ID!, $postId: ID!) {
    singleUpload(file: $file, userId: $userId, postId: $postId) {
      filePath
    }
  }
`;

export const UPDATE_USER_DETAILS = gql`
  mutation addUserDetails($input: UserDetailsInput!) {
    addUserDetails(input: $input) {
      userId
      gamingName
      userRole
      location
      playingPreference
    }
  }
`;

export const UPDATE_GAME_DETAILS = gql`
  mutation addGameDetails($input: GameDetailsInput!) {
    addGameDetails(input: $input) {
      userId
    }
  }
`;
