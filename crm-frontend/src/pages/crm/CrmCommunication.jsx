import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Mail,
  MessageSquare,
  Send,
  User,
  Sparkles,
  Paperclip,
  CheckCheck,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  PhoneCall,
  ShieldCheck,
  X,
  File,
  RefreshCw
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Badge,
  Input,
  Modal,
  Select,
  KPICard
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import communicationService from '../../services/communicationService';

export const CrmCommunication = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);
  const chatScrollRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [activeChannel, setActiveChannel] = useState('EMAIL'); // 'EMAIL' | 'SMS'
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Compose Modal State
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [composeData, setComposeData] = useState({
    channel: 'EMAIL',
    recipient: '',
    subject: '',
    body: '',
  });

  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await communicationService.getMessages();
      setMessages(data);
    } catch (err) {
      console.error('Failed to load communication messages:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const channelMessages = messages.filter(
    (m) => (m.channel || 'EMAIL').toUpperCase() === activeChannel.toUpperCase()
  );

  const filteredMessages = channelMessages.filter(
    (m) =>
      (m.recipient && m.recipient.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.body && m.body.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeMessage = messages.find((m) => m.id === activeThreadId) || filteredMessages[0] || null;

  // Send Reply Handler
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      addToast({ title: 'Input Required', message: 'Type a message to send.', type: 'error' });
      return;
    }
    if (!activeMessage) return;

    try {
      const response = await communicationService.sendMessage({
        channel: activeChannel,
        recipient: activeMessage.recipient,
        subject: `Re: ${activeMessage.subject || 'Conversation'}`,
        body: replyText.trim(),
        contactId: activeMessage.contactId,
        leadId: activeMessage.leadId,
      });

      setMessages((prev) => [response.data, ...prev]);
      setReplyText('');

      const isConfigured = response.data.status !== 'NOT_CONFIGURED';
      addToast({
        title: isConfigured ? 'Message Dispatched' : 'Message Logged (Provider Unconfigured)',
        message: response.message,
        type: isConfigured ? 'success' : 'warning',
      });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to dispatch message.', type: 'error' });
    }
  };

  // Compose New Message Handler
  const handleCreateNewThread = async (e) => {
    e.preventDefault();
    if (!composeData.recipient || !composeData.body) {
      addToast({ title: 'Validation Error', message: 'Recipient and body are required.', type: 'error' });
      return;
    }

    try {
      const response = await communicationService.sendMessage({
        channel: composeData.channel,
        recipient: composeData.recipient.trim(),
        subject: composeData.subject.trim(),
        body: composeData.body.trim(),
      });

      setMessages((prev) => [response.data, ...prev]);
      setActiveThreadId(response.data.id);
      setIsComposeModalOpen(false);
      setComposeData({ channel: 'EMAIL', recipient: '', subject: '', body: '' });

      const isConfigured = response.data.status !== 'NOT_CONFIGURED';
      addToast({
        title: isConfigured ? 'Message Dispatched' : 'Message Logged in MySQL',
        message: response.message,
        type: isConfigured ? 'success' : 'warning',
      });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to dispatch message.', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: t('Core Modules') }, { label: t('Communication Hub') }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              {t('Multi-Channel Customer Communications')}
            </h1>
            <Badge variant="warning" className="bg-amber-500 text-white font-bold text-xs uppercase tracking-wider">
              {t('Internal Logging Mode')}
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            {t('Messages are logged to the CRM database. External delivery (SendGrid / Twilio) requires provider configuration in Workspace Settings.')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={fetchMessages} disabled={isLoading}>
            {t('Refresh')}
          </Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsComposeModalOpen(true)}>
            {t('Compose Message')}
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title={t("TOTAL MESSAGES")} value={String(messages.length)} change={t("CRM Database Logged")} changeType="positive" icon={Mail} />
        <KPICard title={t("EMAIL RECORDS")} value={String(messages.filter((m) => m.channel === 'EMAIL').length)} change={t("Internal Log (No SMTP)")} changeType="neutral" icon={CheckCheck} />
        <KPICard title={t("SMS RECORDS")} value={String(messages.filter((m) => m.channel === 'SMS').length)} change={t("Internal Log (No Twilio)")} changeType="neutral" icon={PhoneCall} />
        <KPICard title={t("EXTERNAL DELIVERY")} value={t("Unconfigured")} change={t("Configure in Settings")} changeType="negative" icon={ShieldCheck} />
      </div>

      {/* Main Communication Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Message List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Card className="border shadow-sm">
            <CardHeader
              title={t("Inbox & Transmissions")}
              subtitle={t("All persisted messages in this company workspace")}
            />
            <CardBody className="p-4 flex flex-col gap-3">
              {/* Channel Switcher */}
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 gap-1">
                <button
                  onClick={() => setActiveChannel('EMAIL')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    activeChannel === 'EMAIL' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> {t('Email')}
                </button>
                <button
                  onClick={() => setActiveChannel('SMS')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    activeChannel === 'SMS' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> {t('SMS Text')}
                </button>
              </div>

              {/* Search Bar */}
              <Input
                placeholder={t("Search recipient or content...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                className="text-xs"
              />

              {/* Message List Items */}
              <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto mt-2">
                {isLoading ? (
                  <div className="p-8 text-center text-xs text-secondary">{t("Loading messages from database...")}</div>
                ) : filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-secondary">
                    {t("No messages found. Click 'Compose Message' to start a new communication thread.")}
                  </div>
                ) : (
                  filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setActiveThreadId(msg.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                        activeMessage?.id === msg.id
                          ? 'bg-sky-950/40 border-sky-500/50 text-white'
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs truncate max-w-[180px]">{msg.recipient}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {msg.subject && (
                        <span className="text-xs font-semibold text-sky-400 truncate">{msg.subject}</span>
                      )}
                      <p className="text-xs text-slate-400 line-clamp-2">{msg.body}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge
                          variant={msg.status === 'SENT' ? 'success' : msg.status === 'NOT_CONFIGURED' ? 'warning' : 'danger'}
                          className="text-[10px] px-1.5 py-0.5"
                        >
                          {msg.status}
                        </Badge>
                        <span className="text-[10px] text-slate-500 uppercase">{msg.provider || 'INTERNAL'}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Side: Conversation Thread Details */}
        <div className="lg:col-span-7">
          <Card className="border shadow-sm min-h-[520px] flex flex-col justify-between">
            <CardHeader
              title={activeMessage ? `${t('Recipient:')} ${activeMessage.recipient}` : t('Conversation Detail')}
              subtitle={
                activeMessage?.subject
                  ? activeMessage.subject
                  : t('Select a conversation from the left to view message details')
              }
            />
            <CardBody className="p-4 flex flex-col justify-between flex-1">
              {activeMessage ? (
                <div className="flex flex-col gap-4 flex-1">
                  {/* Message Metadata Header */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-secondary">Channel: </span>
                      <strong className="text-primary uppercase">{activeMessage.channel}</strong>
                    </div>
                    <div>
                      <span className="text-secondary">Status: </span>
                      <Badge variant={activeMessage.status === 'SENT' ? 'success' : 'warning'}>
                        {activeMessage.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-secondary">Sent: </span>
                      <span className="text-primary">{new Date(activeMessage.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {activeMessage.errorDetails && (
                    <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{activeMessage.errorDetails}</span>
                    </div>
                  )}

                  {/* Message Body Content */}
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-sm text-slate-200 whitespace-pre-line leading-relaxed flex-1">
                    {activeMessage.body}
                  </div>

                  {/* Quick Reply Form */}
                  <form onSubmit={handleSendReply} className="flex flex-col gap-2 mt-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder={`Reply to ${activeMessage.recipient}...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 text-xs"
                      />
                      <Button variant="primary" type="submit" icon={Send} size="sm">
                        Reply
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-16 text-center text-xs text-secondary flex flex-col items-center justify-center my-auto">
                  <Mail className="w-12 h-12 text-slate-600 mb-3" />
                  <p>{t('No conversation selected. Choose a message or compose a new one.')}</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Compose Message Modal */}
      <Modal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
        title="Compose New Communication"
        size="md"
      >
        <form onSubmit={handleCreateNewThread} className="flex flex-col gap-4">
          <Select
            label="Communication Channel"
            value={composeData.channel}
            onChange={(e) => setComposeData({ ...composeData, channel: e.target.value })}
            options={[
              { value: 'EMAIL', label: 'Email Dispatch (SendGrid / SMTP Relay)' },
              { value: 'SMS', label: 'SMS Text Message (Twilio API Gateway)' },
            ]}
          />
          <Input
            label="Recipient (Email / Phone Number) *"
            placeholder={composeData.channel === 'EMAIL' ? 'customer@enterprise.com' : '+1 (555) 234-5678'}
            value={composeData.recipient}
            onChange={(e) => setComposeData({ ...composeData, recipient: e.target.value })}
            required
          />
          {composeData.channel === 'EMAIL' && (
            <Input
              label="Subject Line"
              placeholder="Enterprise Service Agreement Update"
              value={composeData.subject}
              onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
            />
          )}
          <div className="form-group">
            <label className="form-label">
              <span>Message Body <span style={{ color: 'var(--error)' }}>*</span></span>
            </label>
            <textarea
              className="form-control"
              style={{ minHeight: '120px', resize: 'vertical', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
              placeholder="Type your message content here..."
              value={composeData.body}
              onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" type="button" onClick={() => setIsComposeModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={Send}>
              Dispatch Message
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CrmCommunication;
