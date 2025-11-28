import gql from 'graphql-tag';

// Queries
export const GET_LEAGUES = gql`
  query GetLeagues($type: String!) {
    getLeagues(type: $type) {
      _id
      creator {
        _id
        name
        pic {
          url
        }
        skins {
          choseSkin
        }
      }
      description
      name
      maxSeats
      roundType
      status
      currentRound
      participantsNumber
      prizes {
        winnerPrize
        secondWinnerPrize
      }
      playSpeed
      playType
      levelName
      isRegistered
      description
      startTime
      isAd
      img
      createdAt
      updatedAt
    }
  }
`;

export const GET_CUPS = gql`
  query GetCups {
    getCups {
      _id
      name
      description
      diamondValue
      img
      createdAt
      updatedAt
    }
  }
`;

export const GET_TITLES = gql`
  query GetTitles {
    getTitles {
      _id
      name
      description
      img
    }
  }
`;
export const GET_FEATURES = gql`
  query GetLeagueFeatures {
    getLeagueFeatures {
      _id
      name
      description
      img
      title
      diamondValue
    }
  }
`;
// Mutations

export const CREATE_LEAGUE = gql`
  mutation CreateLeague($input: CreateLeagueInput!) {
    createLeague(input: $input) {
      _id
      status
      creator {
        _id
        name
        sub {
          is
        }
        pic {
          url
        }
        skins {
          choseSkin
        }
      }
      name
      description
      maxSeats
      roundType
      participantsNumber
      type
      prizes {
        winnerPrize
        secondWinnerPrize
      }
      playSpeed
      currentRound
      playType
      levelName
      isRegistered
      roomBackground
      startTime
      createdAt
      updatedAt
    }
  }
`;
export const JOIN_LEAGUE = gql`
  mutation JoinLeague($leagueId: ID!) {
    joinLeague(leagueId: $leagueId) {
      _id
      status
      creator {
        _id
        name
        pic {
          url
        }
        skins {
          choseSkin
        }
      }
      name
      description
      maxSeats
      roundType
      registeredPlayers {
        _id
        name
        pic {
          url
        }
        skins {
          choseSkin
        }
      }
      currentRound
      participantsNumber
      type
      spectators {
        _id
        name
        pic {
          url
        }
        skins {
          choseSkin
        }
      }
      prizes {
        winnerPrize
        secondWinnerPrize
      }
      playSpeed
      playType
      levelName
      roomBackground
      matches {
        _id
        round
        stage
        winnerTeam
        loserTeam
        roundWinners
        team1 {
          _id
          players
        }
        team2 {
          _id
          players
        }
        roomId {
          team1 {
            id
            count
            generalResult
          }
          team2 {
            id
            count
            generalResult
          }
          players {
            firstPlayer {
              realPlayer {
                _id
                name
                pic {
                  url
                }
                skins {
                  choseSkin
                }
              }
              teamId
            }
            secondPlayer {
              realPlayer {
                _id
                name
                pic {
                  url
                }
                skins {
                  choseSkin
                }
              }
              teamId
            }
            thirdPlayer {
              realPlayer {
                _id
                name
                pic {
                  url
                }
                skins {
                  choseSkin
                }
              }
              teamId
            }
            fourthPlayer {
              realPlayer {
                _id
                name
                pic {
                  url
                }
                skins {
                  choseSkin
                }
              }
              teamId
            }
          }
        }
      }
      startTime
      createdAt
      updatedAt
    }
  }
`;
export const REGISTER_IN_LEAGUE = gql`
  mutation RegisterInLeague($leagueId: ID!, $password: String) {
    registerInLeague(leagueId: $leagueId, password: $password) {
      message
      success
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($leagueId: ID!, $content: String!) {
    sendMessage(leagueId: $leagueId, content: $content) {
      success
      message
    }
  }
`;

export const LEAVE_LEAGUE = gql`
  mutation LeaveLeague($leagueId: ID!) {
    leaveLeague(leagueId: $leagueId) {
      success
      message
    }
  }
`;
