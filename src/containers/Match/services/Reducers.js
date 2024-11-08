export const selectFigCardReducer = (state, action) => {
  if (action.type === "select_fig_card") {
    console.log(state);
    if (!state.index && !state.player)
      return { index: action.index, player: action.player };
    if (state.index === action.index && state.player === action.player)
      return { index: null, player: null };
    return { index: action.index, player: action.player };
  }
  if (action.type === "deselect") {
    return { index: null, player: null };
  }
  throw Error("Unknown action: " + action.type);
};

export const setPositionReducer = (state, action) => {
  switch (action.type) {
    case "setTilePosition" : {
      if (!state?.first_position && !state?.second_position){
        return { first_position : action.position, second_position : null };
      } else if (state?.first_position && !state.second_position) {
        if (
          action.position.pos_x === state.first_position.pos_x && 
          action.position.pos_y === state.first_position.pos_y
        ) {
          return { first_position : null, second_position : null}
        }
        return { first_position : state.first_position, second_position : action.position }
      } else if (state?.first_position && state?.second_position) {
        return { first_position : null, second_position : null }
      } else {
        // No deberia llegar nunca aca, pero necesitamos un else que retorne algo
        // por cualquier caso raro que no haya tenido en cuenta
        return { first_position : null, second_position : null }
      }
    }
    case "resetPositions" : {
      return { first_position : null, second_position : null }
    }
    default : {
      return null
    }
  }
}

export const setMovCardReducer = (state, action) => {
  switch (action.type) {
    case ("selectMovCard") : {
      if(!state.card){
        return { card : action.card };
      } else if(state.card?.index === action.card.index){
        return { card : null };
      } else {
        return { card : action.card };
      }
    }
    case ("resetMovCard") : {
      return { card : null };
    }
    default : {
      return { card : null };
    }
  }
};


