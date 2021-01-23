/* External dependencies */
import _ from 'lodash'

/* Internal dependencies */
import CacheService from 'Services/CacheService'

export default () => {
  const pending = CacheService.actionLifecyclesPendingCache

  return next => action => {
    const ret = (() => {
      if (action.uuid && action.meta && action.meta.lifecycle) {
        return next({
          ...action,
          promise: new Promise((resolve, reject) => {
            const { lifecycle } = action.meta
            pending.set(action.uuid, {
              [lifecycle.resolve]: resolve,
              [lifecycle.reject]: reject,
            })
          }),
        })
      }
      return next(action)
    })()

    if (action.uuid && pending.has(action.uuid)) {
      // @ts-ignore
      const { [action.type]: resolveOrReject } = pending.get(action.uuid)
      if (_.isFunction(resolveOrReject)) {
        pending.del(action.uuid)
        resolveOrReject(action)
      }
    }

    return ret
  }
}
