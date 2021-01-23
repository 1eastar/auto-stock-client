/* External dependencies */
import _ from 'lodash'
import { v4 as UUID } from 'uuid'

/* Internal Dependencies */
import { ActionFunc, PromisedActionFunc } from 'Types/Redux'

export type ActionGenerator<T, S = {}> = ActionFunc<T, S>

export type PromiseActionGenerator<T, S = {}> = PromisedActionFunc<T, S>

export function actionCreator<T, S = {}>(requestType: string): ActionGenerator<T, S> {
  return (payload: any = {}, meta: any = {}) => {
    const uuid = _.get(meta, 'uuid', UUID())
    _.unset(meta, 'uuid')
    return ({
      uuid: !_.isEmpty(uuid) ? uuid as string : UUID(),
      type: requestType,
      payload,
      meta,
    })
  }
}

export function actionCreatorWithPromise<T, S = {}>(requestType): PromiseActionGenerator<T, S> {
  return (payload: any = {}, meta: any = {}) => {
    const uuid = _.get(meta, 'uuid', UUID())
    _.unset(meta, 'uuid')
    return ({
      uuid: !_.isEmpty(uuid) ? uuid as string : UUID(),
      type: requestType,
      meta: {
        ...meta,
        lifecycle: {
          resolve: `${requestType}_SUCCESS`,
          reject: `${requestType}_ERROR`,
        },
      },
      payload,
    })
  }
}
