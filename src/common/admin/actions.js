import ValidationError from '../lib/validation/ValidationError'
import { browserHistory } from 'react-router'

export const TOGGLE_OFFCANVAS = 'TOGGLE_OFFCANVAS'


export function toggleOffcanvas() {
  return () => {
    return {
      type: TOGGLE_OFFCANVAS
    }
  }
}
