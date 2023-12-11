import request from '../request'

export const abortController = new AbortController()

export const getRatesEurToBrl = () => {
  return request.get('/rates/EUR/BRL', {
    signal: abortController.signal
  })
}

export const getRatesUsdToBrl = () => {
  return request.get('/rates/USD/BRL', {
    signal: abortController.signal
  })
}

export default {
  getRatesEurToBrl,
  getRatesUsdToBrl
}
