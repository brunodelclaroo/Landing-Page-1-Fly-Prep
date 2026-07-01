export function formatBrazilianWhatsapp(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "").replace(/^55/, "").slice(0, 11);

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  let result = "+55";
  if (ddd) result += ` (${ddd}`;
  if (ddd.length === 2) result += ")";
  if (rest) {
    // WhatsApp numbers are always mobile: 9-digit local part (5 + 4).
    const splitAt = rest.length > 4 ? 5 : 4;
    const first = rest.slice(0, splitAt);
    const second = rest.slice(splitAt);
    result += ` ${first}`;
    if (second) result += `-${second}`;
  }

  return result;
}
