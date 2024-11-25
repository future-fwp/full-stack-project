import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/movie" element={<Home />} />
            <Route path="/gaming" element={<Home />} />
            <Route path="/news" element={<Home />} />
            <Route path="/sports" element={<Home />} />
            <Route path="/learning" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;