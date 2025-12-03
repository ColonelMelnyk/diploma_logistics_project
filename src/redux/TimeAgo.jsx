export function timeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "щойно";
  if (minutes < 60) return `${minutes} хв назад`;
  if (hours < 24) return `${hours} год назад`;
  return `${days} дн назад`;
}
