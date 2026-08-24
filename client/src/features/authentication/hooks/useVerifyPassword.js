export default function useVerifyPassword() {
  function verifyPassword(password) {
    return password.length >= 8
  }

  return { verifyPassword }
}
