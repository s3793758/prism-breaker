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
  query userDetails($userId: ID!) {
    userDetails(userId: $userId) {
      userId
      userRole
      gamingName
      location
      playingPreference
    }
  }
`;
export const GET_GAME_DETAILS = gql`
  query gameDetails($userId: ID!) {
    gameDetails(userId: $userId) {
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
