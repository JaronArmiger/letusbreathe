const eventReducer = (state = null, action) => {
  switch (action.type) {
  	case 'LOAD_EVENT':
  	  return action.event;
  	default:
  	  return state;
  }
}

export default eventReducer;