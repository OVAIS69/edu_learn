
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import MentorDashboard from './pages/MentorDashboard';
import DiagnosticAssessment from './components/learning/DiagnosticAssessment';
import NanoLessonPlayer from './components/learning/NanoLessonPlayer';
import SkillGapMRI from './components/learning/SkillGapMRI';
import CommunityWidget from './components/social/CommunityWidget';
import AITutorWindow from './components/tutor/AITutorWindow';
import LandingPage from './pages/LandingPage';
import GamifiedQuiz from './components/learning/GamifiedQuiz';
import KnowledgeNeuralMap from './pages/KnowledgeNeuralMap';
import MonetizationPage from './pages/MonetizationPage';
import SchoolLandingPage from './pages/SchoolLandingPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mentor" element={<MentorDashboard />} />
          <Route path="learn" element={<NanoLessonPlayer />} />
          <Route path="mri" element={<SkillGapMRI />} />
          <Route path="diagnostic" element={<DiagnosticAssessment />} />
          <Route path="community" element={<CommunityWidget />} />
          <Route path="tutor" element={<AITutorWindow />} />
          <Route path="quiz" element={<GamifiedQuiz />} />
          <Route path="neural-map" element={<KnowledgeNeuralMap />} />
          <Route path="upgrade" element={<MonetizationPage />} />
        </Route>
        <Route path="/schools" element={<SchoolLandingPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
