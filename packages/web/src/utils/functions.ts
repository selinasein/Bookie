export function cutTitle(word: string) {
  if (word.length > 13) {
    return word.slice(0, 10) + "...";
  } else {
    return word;
  }
}

export function capitalizeWords(input: string): string {
  return input.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getFormattedDate(date: string): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}
