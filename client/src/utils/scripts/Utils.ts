export const isOnProduction: boolean = false

// format number to have 2 decimal places and comma separators
export function formatNumber(num: number): string {
  const numStr = num.toString()
  const cents = numStr.slice(-2)
  let wholePart = numStr.slice(0, -2)

  if (wholePart === '') wholePart = '0'

  wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${wholePart}.${cents}`
}
