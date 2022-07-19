const colors = [
  'red',
  'green',
  'purple',
  'green',
  'yellow',
  'gray',
  'pink',
  'teal',
  'blue',
  'cyan'
];
export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
