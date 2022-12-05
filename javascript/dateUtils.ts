export function TimeSinceNow(date: Date) {
  let time = null;
  const secondsSinceNow = (Date.now() - date.getTime()) / 1000;
  if (secondsSinceNow < 5) {
    // Within past 5s
    time = "Just now";
  } else if (secondsSinceNow / 60 < 1) {
    // Within past 1 minute
    time = `${secondsSinceNow} seconds ago`;
  } else if (secondsSinceNow / 60 / 60 < 1) {
    const t = Math.floor(secondsSinceNow / 60);
    time = `${t} minute${t > 1 ? "s" : ""} ago`;
  } else if (secondsSinceNow / 60 / 60 / 24 < 1) {
    // Within past 1 day
    const t = Math.floor(secondsSinceNow / 60 / 60);
    time = `${t} hour${t > 1 ? "s" : ""} ago`;
  } else if (secondsSinceNow / 60 / 60 / 24 < 7) {
    // Within past 1 week
    const t = Math.floor(secondsSinceNow / 60 / 60 / 24);
    time = `${t} day${t > 1 ? "s" : ""} ago`;
  } else {
    // Greater than 1 week old
    time = date.toLocaleString();
  }
  return time;
}

export function TimeSinceNowShort(date: Date) {
  let time = null;
  const secondsSinceNow = (Date.now() - date.getTime()) / 1000;
  if (secondsSinceNow < 5) {
    // Within past 5s
    time = "Just now";
  } else if (secondsSinceNow / 60 < 1) {
    // Within past 1 minute
    time = `${secondsSinceNow}s ago`;
  } else if (secondsSinceNow / 60 / 60 < 1) {
    const t = Math.floor(secondsSinceNow / 60);
    time = `${t}m ago`;
  } else if (secondsSinceNow / 60 / 60 / 24 < 1) {
    // Within past 1 day
    const t = Math.floor(secondsSinceNow / 60 / 60);
    time = `${t}h ago`;
  } else if (secondsSinceNow / 60 / 60 / 24 < 7) {
    // Within past 1 week
    const t = Math.floor(secondsSinceNow / 60 / 60 / 24);
    time = `${t}d ago`;
  } else {
    // Greater than 1 week old
    time = date.toLocaleString();
  }
  return time;
}
