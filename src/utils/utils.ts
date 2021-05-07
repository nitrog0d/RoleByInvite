export function cleanPathsInError(stack: string) {
  return stack.replace(new RegExp(process.cwd(), 'g'), '');
}
