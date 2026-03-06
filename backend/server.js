import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// API Routes with /api prefix (for production)
app.post('/api/meeting/create', (req, res) => {
  console.log('📡 API call received:', req.method, req.path, req.body)
  try {
    const { roomName } = req.body

    if (!roomName || roomName.trim() === '') {
      return res.status(400).json({ error: 'Room name is required' })
    }

    // Generate meeting data
    const meetingData = {
      roomName: `vpaas-magic-cookie-d34b822d13494d7cbf3ee724dffa38bc/${roomName}`,
      domain: '8x8.vc',
      createdAt: new Date(),
      status: 'active'
    }

    console.log('✅ Meeting created:', meetingData)
    res.json({
      success: true,
      message: 'Meeting created successfully',
      data: meetingData
    })
  } catch (error) {
    console.error('❌ Error creating meeting:', error)
    res.status(500).json({ error: 'Failed to create meeting' })
  }
})

app.get('/api/meeting/:roomName', (req, res) => {
  try {
    const { roomName } = req.params

    const meetingInfo = {
      roomName,
      domain: '8x8.vc',
      joinUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/${roomName}`,
      status: 'available'
    }

    res.json({
      success: true,
      data: meetingInfo
    })
  } catch (error) {
    console.error('Error fetching meeting:', error)
    res.status(500).json({ error: 'Failed to fetch meeting' })
  }
})

// Legacy Routes without /api prefix (for backward compatibility)
app.post('/meeting/create', (req, res) => {
  try {
    const { roomName } = req.body

    if (!roomName || roomName.trim() === '') {
      return res.status(400).json({ error: 'Room name is required' })
    }

    // Generate meeting data
    const meetingData = {
      roomName: `vpaas-magic-cookie-d34b822d13494d7cbf3ee724dffa38bc/${roomName}`,
      domain: '8x8.vc',
      createdAt: new Date(),
      status: 'active'
    }

    res.json({
      success: true,
      message: 'Meeting created successfully',
      data: meetingData
    })
  } catch (error) {
    console.error('Error creating meeting:', error)
    res.status(500).json({ error: 'Failed to create meeting' })
  }
})

app.get('/meeting/:roomName', (req, res) => {
  try {
    const { roomName } = req.params

    const meetingInfo = {
      roomName,
      domain: '8x8.vc',
      joinUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/${roomName}`,
      status: 'available'
    }

    res.json({
      success: true,
      data: meetingInfo
    })
  } catch (error) {
    console.error('Error fetching meeting:', error)
    res.status(500).json({ error: 'Failed to fetch meeting' })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

// Serve index.html for all routes not matched (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
})
