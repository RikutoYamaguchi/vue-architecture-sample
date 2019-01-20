import InfrastructuresProvider from '@providers/InfrastructuresProvider'

const providers = [
  InfrastructuresProvider,
]

export function provide () {
  providers.forEach(provider => {
    const providerInstance = new provider()
    providerInstance.register()
    providerInstance.attach(window)
  })
}
