export const until = async (predicate, options) => {
  const {interval = 20, timeout = Infinity} = options
  const start = Date.now()
  const poll = async (done) => {
    if (Date.now() - start > timeout) return done(null)
    const value = await predicate()
    return value ? done(value) : setTimeout(() => poll(done), interval)
  }
  return new Promise(poll)
}
