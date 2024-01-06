const Notification = ({ notification }) => {
  const { message, isError } = notification

  if (message === null) {
    return null
  }

  return (
    <div className={isError ? 'error' : 'notification'}>
      {message}
    </div>
  )
}

export default Notification