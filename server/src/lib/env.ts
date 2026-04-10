export function validateEnv(): void {
  const required = ['DATABASE_URL']
  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missing.join(', ')}`)
  }
}
