import { useQuasar } from 'quasar'

export default function () {
  const $q = useQuasar()

  function showToast(type, msg, msgTimeout) {
    let timeout = msgTimeout ? msgTimeout : process.env.VUE_APP_TOAST_TIMEOUT
    $q.notify.setDefaults({
      position: 'top',
      timeout,
      type,
    })
    $q.notify(msg)
  }

  return {
    showToast,
  }
}
