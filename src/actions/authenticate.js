import { createAction } from '@reduxjs/toolkit'

const authenticate = createAction('user/authenticate', function authenticate(data) {
  return {
    payload: data
  }
})

export default authenticate;
