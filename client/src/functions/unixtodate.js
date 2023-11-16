export const converUnixToDate = (unix) =>{

    const currentTime = Date.now();
    const secondsAgo = Math.floor((currentTime - unix)/1000);
  
  
    if (secondsAgo < 60) {
      return 'just now';
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 604800) {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else {
      const date = new Date(unix);
      return date.toLocaleString();
    }
}