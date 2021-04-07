import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

const InfoButton = styled.button`
  border: none;
  background-color: transparent;
  color: inherit;
  font-weight: 900;
  font-size: 110%;

  &:hover{
    color: white;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  color: inherit;
  font-size: 150%;
  padding: 5px 10px 0;

  &:hover {
    color: grey;
  }
`

const Content = styled.div`
  width: 30em;
  margin: 1em;
  
  @media (max-width: 768px) {
    width: 10em;
  }
`

const LinkContainer = styled.div`
  text-align: center;
  width: 100%;
`

const Link = styled.a`
  color: black;
  text-decoration: none;
  font-size: 110%;

  &:hover {
    text-decoration: underline;
  }
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacity: 1,
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.6)',
  },
}

ReactModal.setAppElement(document.getElementById('root'))

function App() {
  // let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <span>
      <InfoButton type="button" onClick={openModal}>&#9432;</InfoButton>
      <div />
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CloseButton type="button" onClick={closeModal}>&#x2715;</CloseButton>
        <Content>
          Welcome! This site generates a heatmap of moves from the
          last 100 played chess games for a lichess user.
          <br />
          <br />
          Castling counts as two moves. So if white castles
          kingside it will count Kg1 and Rf1 both as moves.
          <br />
          <br />
          If you have any suggestions for this site let me know!
          <br />
          <br />
          <LinkContainer>
            <Link
              href="https://anthonylau.dev/"
              target="_blank"
            >
              anthonylau.dev
            </Link>
          </LinkContainer>
        </Content>
      </ReactModal>
    </span>
  )
}

export default App
