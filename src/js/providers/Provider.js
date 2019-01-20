import _ from 'lodash'

class Provider {
  constructor (namespace) {
    this.namespace = namespace
    this.singletons = {}
    this.singletonArguments = {}
    this.bindings = {}
  }

  createKey (name) {
    return `${this.namespace}/${name}`
  }

  singleton (provide, ...singletonArguments) {
    if (singletonArguments.length = 0) {
      singletonArguments = null
    }

    this.singletons = {
      ...this.singletons,
      [this.createKey(provide.name)]: provide,
    }
    this.singletonArguments = {
      ...this.singletonArguments,
      [this.createKey(provide.name)]: singletonArguments,
    }
  }

  binding (provide) {
    this.bindings = {
      ...this.bindings,
      [this.createKey(provide.name)]: provide,
    }
  }

  attach (container) {
    if (!_.isObject(container.app)) {
      container.$app = {}
    }

    _.each(this.singletons, (singleton, key) => {
      container.$app = {
        ...container.$app,
        [key]: new singleton(this.singletonArguments[key]),
      }
    })

    _.each(this.bindings, (binding, key) => {
      container.$app = {
        ...container.$app,
        [key]: binding,
      }
    })
  }
}

export default Provider
