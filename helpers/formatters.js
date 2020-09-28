import format from 'format-number';

export const dateFormatter = datetime => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    new Date(datetime)
  );

  return formattedDate;
};

export const timeFormatter = datetime => {
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  const formattedTime = new Intl.DateTimeFormat('en-US', options).format(
    new Date(datetime)
  );

  return formattedTime;
};

export const nairaFormatter = amount => format({ prefix: '₦' })(amount);

export const capitalizeWord = word => {
  return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
};

export default { dateFormatter, timeFormatter, nairaFormatter };
