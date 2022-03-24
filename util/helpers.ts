export function displayAdddress(address?: string | null) {
  if (!address) {
    return '';
  }

  return address.substring(0, 6) + '...' + address.substring(address.length - 5, address.length);
}
