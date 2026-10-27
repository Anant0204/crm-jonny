import React, { useState } from 'react';
import { Breadcrumb, Card, CardBody, Input, Button, Badge } from '../../../components/ui';
import { MessageSquare, Send, BookOpen } from 'lucide-react';
import { useSupport } from '../../../context/SupportContext';
import { useToast } from '../../../context/ToastContext';

export const SupportChat = () => {
  const { addToast } = useToast();
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Customer (Apex)', text: 'Hi support team, is the OAL API endpoint online?', time: '11:02 AM' },
    { sender: 'Support Rep (Me)', text: 'Hello! Yes, the OAL Network bridge is healthy with 14ms response rate.', time: '11:04 AM' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    setMessages([...messages, { sender: 'Support Rep (Me)', text: chatMsg, time: 'Just now' }]);
    setChatMsg('');
    addToast({ title: 'Live Chat Sent', type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'Support' }, { label: 'Live Support Chat' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Live Customer Support Chat</h1>

      <Card className="p-6 flex flex-col justify-between" style={{ minHeight: '480px' }}>
        <div className="flex flex-col gap-3">
          {messages.map((m, idx) => (
            <div key={idx} className="p-3 surface-secondary rounded-sm flex flex-col gap-1 text-xs">
              <div className="flex justify-between font-bold text-primary">
                <span>{m.sender}</span>
                <span className="text-tertiary font-normal">{m.time}</span>
              </div>
              <p className="margin-0 text-secondary">{m.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-2 border-t border-subtle pt-4 mt-4">
          <Input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} placeholder="Type live chat response..." required />
          <Button variant="primary" type="submit" icon={Send}>Send</Button>
        </form>
      </Card>
    </div>
  );
};

export const SupportKb = () => {
  const { kbArticles } = useSupport();
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'Support' }, { label: 'Knowledge Base' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Knowledge Base & Documentation</h1>

      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles (e.g. Multi-Tenant, API, OAuth)..." startIcon={BookOpen} />

      <div className="grid-responsive-2col">
        {kbArticles.map((art) => (
          <Card key={art.id} className="p-4 flex flex-col gap-2">
            <Badge variant="primary">{art.category}</Badge>
            <h3 className="text-base font-semibold">{art.title}</h3>
            <span className="text-xs text-tertiary">{art.views} views</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const SupportReports = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'Support' }, { label: 'SLA Reports' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Support Analytics & CSAT Reports</h1>
      <Card className="p-6">
        <p className="text-xs text-secondary">First contact resolution rate 94.2%, CSAT score 4.8 / 5.0, average resolution speed 3.4 hours.</p>
      </Card>
    </div>
  );
};
