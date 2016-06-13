export const TOGGLE_OFFCANVAS = 'TOGGLE_OFFCANVAS'

export function toggleOffcanvas() {
  return () => {
    return {
      type: TOGGLE_OFFCANVAS
    }
  }
}
