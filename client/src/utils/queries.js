import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query posts {
    posts {
      _id
      userId {
        _id
        first_name
        last_name
        profileImage
      }
      postMessage
      postImage
      createdAt
    }
  }
`;

export const GET_USER_POSTS = gql`
  query posts($userId: String) {
    posts(userId: $userId) {
      _id
      userId {
        _id
        first_name
        last_name
        profileImage
      }
      postMessage
      postImage
      createdAt
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query userDetails($username: String!) {
    userDetails(username: $username) {
      userId
      userRole
      gamingName
      location
      playingPreference
    }
  }
`;

export const GET_GAME_DETAILS = gql`
  query gameDetails($username: String!) {
    gameDetails(username: $username) {
      userId
      race {
        index
        name
        url
      }
      selectedClass {
        index
        name
        url
      }
    }
  }
`;
export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      email
      first_name
      last_name
      profileImage
      dateOfBirth
      phone
      posts {
        _id
        userId {
          profileImage
        }
        postMessage
        postImage
        createdAt
      }
    }
  }
`;
