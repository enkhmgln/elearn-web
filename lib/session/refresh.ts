import { refresh } from "@/features/auth/api"
import { configureAuth } from "@/lib/http"
import { isPast } from "@/lib/utils/date"
import { clearSession, getSession, setToken } from "./store"

let refreshing: Promise<string | null> | null = null

export function getAccessToken() {
  const session = getSession()

  if (!session || isPast(session.access.expires_at)) {
    return null
  }

  return session.access.token
}

export function refreshAccessToken() {
  if (refreshing) {
    return refreshing
  }

  const session = getSession()

  if (!session || isPast(session.refresh.expires_at)) {
    if (session) {
      clearSession()
    }

    return Promise.resolve(null)
  }

  const refreshToken = session.refresh.token

  refreshing = refresh
    .mutate({ refresh: refreshToken })
    .then((next) => {
      if (getSession()?.refresh.token !== refreshToken) {
        return null
      }

      setToken(next)
      return next.access.token
    })
    .catch(() => {
      if (getSession()?.refresh.token === refreshToken) {
        clearSession()
      }

      return null
    })
    .finally(() => {
      refreshing = null
    })

  return refreshing
}

export function bindSessionAuth() {
  configureAuth({
    getAccessToken,
    refreshAccessToken,
  })
}
