export function userValidation(username: string): boolean {
  const pattern = /^[A-Za-z][A-Za-z\d\_]*[A-Za-z\d]+$/;
  return pattern.test(username);
}
