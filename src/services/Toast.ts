import { toast, ToastOptions } from 'react-toastify'

// Keep track of the default notification
let defaultToastId: number | string | null = null

const showToast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'default' = 'default',
  customOptions: ToastOptions = {}
) => {
  const options: ToastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    ...customOptions,
  }

  // If a default notification is active, clear it before showing a new one
  if (defaultToastId !== null) {
    toast.dismiss(defaultToastId)
    defaultToastId = null
  }

  const toastTypes = {
    success: toast.success,
    error: toast.error,
    warning: toast.warn,
    default: toast.info,
  }

  const toastFunction = toastTypes[type] || toastTypes.default
  // Show the new notification and store its ID
  const toastId = toastFunction(message, options)

  // If the notification type is 'default', store its ID for future dismissal
  if (type === 'default') {
    defaultToastId = toastId
  }
}

export default showToast
