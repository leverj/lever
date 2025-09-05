import kill from 'tree-kill'

export const killProcess = (ps) => new Promise((resolve, reject) =>
  kill(ps.pid, 'SIGKILL', _ => _ ? reject(_) : resolve())
)
