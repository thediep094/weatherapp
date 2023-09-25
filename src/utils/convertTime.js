export const formatTimeToAMPM = (timeString) => {
  const time = new Date("2000-01-01T" + timeString);
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0:00)
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedTime = hours + ":" + minutes + " " + ampm;
  return formattedTime;
};

export const formatDate = (inputDate) => {
  var date = new Date(inputDate);
  var day = date.getDate();
  var month = date.getMonth() + 1; // Months are 0-based
  return day + "/" + month;
};
