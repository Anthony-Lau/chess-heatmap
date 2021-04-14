import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import createGraph from './d3/HeatmapNode'
import clearGraph from './d3/ClearGraph'
import Form from './components/Form'
import InfoModal from './components/InfoModal'

const Body = styled.div`
  margin: auto;
  width: 100%;
  padding: 10px;
  text-align: center;
  color: #BABABA;
`

const Area = styled.div`
  margin: auto;
  width: 60em;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 20em;
  }
`

function App() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const transformData = (rawJson, player) => {
    const whiteCoordHash = {}
    const blackCoordHash = {}

    rawJson.forEach((game) => {
      const whitePlayer = game.players.white.user?.id === player
      let offSet = 0
      if (!whitePlayer) {
        offSet += 1
      }
      const moveArray = game.moves.split(' ')
      for (let moveIndex = offSet; moveIndex < moveArray.length; moveIndex += 2) {
        let lastChar = moveArray[moveIndex].slice(-1)
        const promotion = moveArray[moveIndex].includes('=')
        let move = ''

        if (lastChar === '+' || lastChar === '#') {
          move = moveArray[moveIndex].slice(0, -1)
          lastChar = move.slice(-1)
        } else {
          move = moveArray[moveIndex]
        }
        if (lastChar >= '0' && lastChar <= '9') {
          move = move.slice(-2)
        } else if (lastChar === 'O') { // castle or promotion
          move = move.slice(0, 2)
        } else if (promotion) {
          move = move.slice(-4, -2)
        }

        const kingSideCastle = move.includes('-') && moveArray[moveIndex].length <= 4
        const queenSideCastle = move.includes('-') && moveArray[moveIndex].length <= 6
        if (whitePlayer) {
          if (kingSideCastle) {
            whiteCoordHash.g1 = (whiteCoordHash.g1 + 1) || 1
            whiteCoordHash.f1 = (whiteCoordHash.f1 + 1) || 1
          } else if (queenSideCastle) {
            whiteCoordHash.c1 = (whiteCoordHash.c1 + 1) || 1
            whiteCoordHash.d1 = (whiteCoordHash.d1 + 1) || 1
          } else {
            whiteCoordHash[move] = (whiteCoordHash[move] + 1) || 1
          }
        } else if (kingSideCastle) {
          blackCoordHash.g8 = (blackCoordHash.g8 + 1) || 1
          blackCoordHash.f8 = (blackCoordHash.f8 + 1) || 1
        } else if (queenSideCastle) {
          blackCoordHash.c8 = (blackCoordHash.c8 + 1) || 1
          blackCoordHash.d8 = (blackCoordHash.d8 + 1) || 1
        } else {
          blackCoordHash[move] = (blackCoordHash[move] + 1) || 1
        }
      }
    })

    const dataMap = (coordHash) => {
      const coordKeys = Object.keys(coordHash)
      return coordKeys.map((key) => {
        const coords = key.split('')
        return {
          letter: coords[0],
          number: coords[1],
          value: coordHash[key],
        }
      })
    }
    return [
      dataMap(whiteCoordHash),
      dataMap(blackCoordHash),
    ]
  }

  const getUserId = async (checkUsername) => {
    const userInfo = await (await fetch(`https://lichess.org/api/users/status?ids=${checkUsername}`)).json()
    if (userInfo.length > 0) {
      return userInfo[0].id
    }
    return ''
  }

  const handleSubmit = async () => {
    if (username === '') {
      setError('Username Is Required')
    }
    const userId = await getUserId(username)
    if (userId === '') {
      setError('Not a valid user')
    } else {
      setError('')
      setLoading(true)
      const rawNdJson = await fetch(`https://lichess.org/api/games/user/${userId}?max=100`,
        {
          headers: {
            Accept: 'application/x-ndjson',
          },
        })
      const test = await rawNdJson.text()
      const json = test.split('\n')
      const rawJson = json.flatMap((string) => (string === '' ? [] : [JSON.parse(string)]))
      if (rawJson.length === 0) {
        setError('No games played')
        clearGraph()
      } else {
        const data = transformData(rawJson, userId)
        clearGraph()
        createGraph(data[0], 'Frequency Of White Pieces')
        createGraph(data[1], 'Frequency Of Black Pieces')
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    document.body.style = 'background: #2D2B28'
  })

  return (
    <Body>
      <h1>
        Chess Heatmap
        <InfoModal />
      </h1>
      <Form handleSubmit={handleSubmit} username={username} setUsername={setUsername} />
      {loading ? (
        <h2>
          loading...
        </h2>
      )
        : <span />}
      {error !== '' ? (
        <h3>
          {error}
        </h3>
      )
        : <span />}
      <Area id="area" />
    </Body>
  )
}

export default App
