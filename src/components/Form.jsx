import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 20em;
  margin: auto;
  grid-gap: .5em;
  margin-bottom: 1em;
`

const Input = styled.input`
  padding: 1em;
  border: solid;
  border-color: grey;
  border-radius: .9em;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box; 
`
const Label = styled.label`
  
`

const Button = styled.button`
  border-radius: 1em;
  border: solid;
  border-color: grey;
  padding: 1em;
  background-color: rgb(240,240,240);
`

function Form(props) {
  const { handleSubmit, username, setUsername } = props
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <FormContainer>
      <Label htmlFor="username">
        <Input
          id="username"
          type="text"
          name="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          onKeyDown={handleKeyDown}
        />
      </Label>
      <Button type="button" onClick={() => handleSubmit()}>Generate</Button>
    </FormContainer>
  )
}

export default Form

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
}
