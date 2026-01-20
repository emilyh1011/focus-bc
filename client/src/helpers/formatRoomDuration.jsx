// durationMinutes is a number like 45, 90, 1440, etc.
export default function formatRoomDuration(durationMinutes) {
  if (durationMinutes < 60) {
    return `${durationMinutes} min`;
  }

  const hours = durationMinutes / 60;

  if (Number.isInteger(hours)) {
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }

  return `${hours.toFixed(1)} hours`;
}