import React from 'react';

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 8,
  seatsPerRow: 12,
};

function reducer(state, action) {
  switch (action.type) {
    case 'receive-seat-info-from-server': {
      console.log('actionactionactionactionactionaction',action);
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
      };
    }
    case 'mark-seat-as-purchased': {
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isBooked: true,
          },
        },
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = React.useCallback(
    (data) =>
      dispatch({
        type: 'receive-seat-info-from-server',
        ...data,
      }),
    [dispatch]
  );

  const markSeatAsPurchased = React.useCallback(
    (seatId) =>
      dispatch({
        type: 'mark-seat-as-purchased',
        seatId,
      }),
    [dispatch]
  );

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
