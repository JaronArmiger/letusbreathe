const eventReducer = (state = null, action) => {
  switch (action.type) {
  	case 'LOAD_EVENT':
  	  const event = action.event;
  	  const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      //const timeDiff = startDate.getTimezoneOffset / 60;
      startDate.setHours(startDate.getHours() + 5);
      endDate.setHours(endDate.getHours() + 5);
      event.start = startDate;
      event.end = endDate;
  	  return event;
  	default:
  	  return state;
  }
}

export default eventReducer;