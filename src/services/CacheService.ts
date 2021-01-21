import LRUCache from 'lru-cache'
import { autobind } from 'core-decorators'

interface ActionPendingCacheProps {
  [key: string]: () => void
}

const CACHE_OPTION = {
  max: Infinity,
  maxAge: 60 * 60 * 1000,
  updateAgeOnGet: true,
}

class CacheService {
  actionLifecyclesPendingCache = new LRUCache<string, ActionPendingCacheProps>(CACHE_OPTION)

  constructor() {
    setInterval(this.prune, 10 * 60 * 1000)
  }

  @autobind
  prune() {
    this.actionLifecyclesPendingCache.prune()
  }
}

export default new CacheService()
