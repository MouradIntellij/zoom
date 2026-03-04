import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [roomName, setRoomName] = useState('')
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [currentRoom, setCurrentRoom] = useState('')

  useEffect(() => {
    if (isInMeeting && currentRoom) {
      launchJitsiMeeting(currentRoom)
    }
  }, [isInMeeting, currentRoom])

  const handleJoinMeeting = async (e) => {
    e.preventDefault()
    if (!roomName.trim()) {
      alert('Please enter a room name')
      return
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api'
      const response = await fetch(`${apiUrl}/meeting/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName })
      })

      if (!response.ok) throw new Error('Failed to create meeting')

      setCurrentRoom(roomName)
      setIsInMeeting(true)
    } catch (error) {
      console.error('Error creating meeting:', error)
      alert('Failed to create meeting')
    }
  }

  const launchJitsiMeeting = (room) => {
    const domain = '8x8.vc'
    const options = {
      roomName: `vpaas-magic-cookie-d34b822d13494d7cbf3ee724dffa38bc/${room}`,
      parentNode: document.querySelector('#jitsi-container'),
      height: 700,
      configOverwrite: {
        startAudioOnly: false,
        disableAudioLevels: true
      },
      interfaceConfigOverwrite: {
        DEFAULT_WELCOME_PAGE_LOGO_URL: '',
        MOBILE_APP_PROMO: false
      },
      userInfo: {
        displayName: 'Guest User'
      }
    }

    const api = new window.JitsiMeetExternalAPI(domain, options)

    api.addEventListener('videoConferenceJoined', () => {
      console.log('User joined the meeting')
    })

    api.addEventListener('videoConferenceLeft', () => {
      setIsInMeeting(false)
      setRoomName('')
    })

    return api
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Video Meeting Platform</h1>
        <p>Powered by Jitsi Meet</p>
      </header>

      {!isInMeeting ? (
        <div className="meeting-form">
          <form onSubmit={handleJoinMeeting}>
            <div className="form-group">
              <label htmlFor="roomName">Enter Meeting Room Name</label>
              <input
                id="roomName"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="e.g., my-meeting"
                className="input"
              />
            </div>
            <button type="submit" className="button">
              Join Meeting
            </button>
          </form>
        </div>
      ) : (
        <div id="jitsi-container" style={{ height: '700px' }} />
      )}
    </div>
  )
}
