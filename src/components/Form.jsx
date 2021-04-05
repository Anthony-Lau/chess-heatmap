import React from 'react'
import PropTypes from 'prop-types'

function Form(props) {
  const { handleSubmit, username, setUsername } = props
  return (
    <div>
      <label htmlFor="username">
        Name:
        <input id="username" type="text" name="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      </label>
      <button type="button" onClick={() => handleSubmit()}>go</button>
    </div>
  )
}

export default Form

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
}
