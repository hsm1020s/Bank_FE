import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import AgentSidePanel from '../../components/layout/AgentSidePanel';

export default function CustomerLayout() {
  const [agentEnabled, setAgentEnabled] = useState(true);
  return (
    <div className="app-shell">
      <CustomerHeader agentEnabled={agentEnabled} onToggleAgent={setAgentEnabled} />
      <main>
        <Outlet />
      </main>
      <AgentSidePanel enabled={agentEnabled} />
      <CustomerFooter />
    </div>
  );
}
