import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { AiAssistant } from "./pages/AiAssistant";
import { SendMoney } from "./pages/SendMoney"; // Keeping this if user wants it later, or ignore it
import { Layout } from "./components/Layout";

const SettingsPlaceholder = () => <h1 className="text-3xl font-bold text-white">Settings</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        {/* Protected Routes Wrapper */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/settings" element={<SettingsPlaceholder />} />
          <Route path="/send" element={<SendMoney />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
