export default function formatDate(date) {
  let seconds = (new Date() - new Date(date)) / 1000;

  if (seconds < 60)
    return "Just now";

  if (seconds >= 60 && seconds < 3600) {
    let minutes = seconds / 60;
    let result = Math.floor(minutes);
    if(result <= 1)
      return result + " minute ago";
    return result + " minutes ago";
  }

  if (seconds >= 3600 && seconds < 86400) {
    let hours = seconds / 3600;
    let result = Math.floor(hours);
    if(result <= 1)
      return result + " hour ago";
    return result + " hours ago";
  }

  if (seconds >= 86400 && seconds < 2592000) {
    let days = seconds / 86400;
    let result = Math.floor(days);
    if(result <= 1)
      return result + " day ago";
    return result + " days ago";
  }

  if (seconds >= 2592000 && seconds < 31536000) {
    let months = seconds / 2592000;
    let result = Math.floor(months);
    if(result <= 1)
      return result + " month ago";
    return result + " months ago";
  }

  if (seconds >= 31536000) {
    let years = seconds / 31536000;
    let result = Math.floor(years);
    if(result <= 1)
      return result + " year ago";
    return result + " years ago";
  }

}
