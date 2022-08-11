import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Stats from './pages/Stats'
import Docs from './pages/Docs'
import Sources from './pages/Sources'
import NotFound from './pages/NotFound'
import Container from '@mui/material/Container'

function App() {
  return (
    <Container maxWidth="md" sx={{ mb: 10 }}>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="stats" element={<Stats />} />
          <Route path="docs" element={<Docs />} />
          <Route path="sources" element={<Sources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Container>
  )
}
export default App
