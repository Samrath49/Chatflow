import { useEffect, useState } from 'react'

/**
 * Custom hook to debounce a value.
 *
 * @param {*} value - The value to be debounced.
 * @param {number} delay - The delay (in milliseconds) after which the value will be updated.
 * @returns {*} The debounced value.
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function to clear the timeout when the value or delay changes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
