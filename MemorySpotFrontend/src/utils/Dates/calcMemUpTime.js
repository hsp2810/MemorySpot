// tells me when the memory was uploaded

export const calcMemUpTime = dateObj => {
  // Get the current time
  const now = new Date();
  //   console.log('Current time:', now);

  // Create a Date object for the datetime you want to calculate the difference for
  const datetime = new Date(dateObj);
  //   console.log('Datetime:', datetime);

  // Calculate the difference between the current time and the datetime
  const diffMs = now - datetime;
  //   console.log('Difference in milliseconds:', diffMs);

  const diffSecs = Math.floor(diffMs / 1000);
  //   console.log('Difference in seconds:', diffSecs);

  const diffMins = Math.floor(diffSecs / 60);
  //   console.log('Difference in minutes:', diffMins);

  const diffHours = Math.floor(diffMins / 60);
  //   console.log('Difference in hours:', diffHours);

  const diffDays = Math.floor(diffHours / 24);
  //   console.log('Difference in days:', diffDays);

  // Determine the time difference in the appropriate format
  let timeDiff;
  if (diffDays > 0) {
    timeDiff = diffDays + ' day' + (diffDays > 1 ? 's' : '') + ' ago';
  } else if (diffHours > 0) {
    timeDiff = diffHours + ' hour' + (diffHours > 1 ? 's' : '') + ' ago';
  } else if (diffMins > 0) {
    timeDiff = diffMins + ' minute' + (diffMins > 1 ? 's' : '') + ' ago';
  } else {
    timeDiff = 'just now';
  }

  //   console.log('Time difference:', timeDiff);

  return timeDiff;
};
