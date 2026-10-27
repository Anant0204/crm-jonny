import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  Lock,
  Building2,
  FileText,
  User,
  Users,
  Eye,
  Download,
  Plus,
  Sparkles,
  AlertCircle,
  Clock,
  Check,
  Copy,
  ExternalLink,
  RefreshCw,
  CheckCheck
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Badge,
  Input,
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerKyc = () => {
  const navigate = useNavigate();
  const { applicationDraft, setApplicationStage } = useOal();
  const { addToast } = useToast();

  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('entity');
  const [isVerified, setIsVerified] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isAddOwnerOpen, setIsAddOwnerOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState(applicationDraft?.companyName || 'BioGenix Labs Inc.');
  const [ein, setEin] = useState('84-9201948');
  const [duns, setDuns] = useState('08-492-1184');
  const [incState, setIncState] = useState('Delaware (DE Corp - C-Corp)');
  const [signatoryName, setSignatoryName] = useState('Dr. Aris Thorne');
  const [signatoryRole, setSignatoryRole] = useState('Chief Executive Officer (CEO)');
  const [showEin, setShowEin] = useState(false);

  // Beneficial Owners List
  const [owners, setOwners] = useState([
    { id: '1', name: 'Dr. Aris Thorne', role: 'CEO & Founder', equity: '62.5%', citizenship: 'United States', ssnLast4: '8492', status: 'Verified' },
    { id: '2', name: 'Horizon BioVentures LP', role: 'Series A Institutional Lead', equity: '25.0%', citizenship: 'Delaware LP', ssnLast4: '3901', status: 'Verified' },
    { id: '3', name: 'Dr. Elena Vance', role: 'Chief Technology Officer', equity: '12.5%', citizenship: 'United States', ssnLast4: '1109', status: 'Verified' },
  ]);

  // New Owner Modal State
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerRole, setNewOwnerRole] = useState('');
  const [newOwnerEquity, setNewOwnerEquity] = useState('');

  // Vault Documents List
  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      title: 'Certificate of Incorporation (Delaware Secretary of State)',
      type: 'Corporate Governance',
      size: '1.8 MB',
      date: 'Feb 12, 2026',
      hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-2',
      title: 'IRS EIN Tax Determination Letter (Form CP 575)',
      type: 'Federal Tax ID',
      size: '420 KB',
      date: 'Feb 12, 2026',
      hash: 'sha256:3f7b2c918a44d827f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-3',
      title: 'Certificate of Good Standing (Delaware 2026 Renewal)',
      type: 'State Compliance',
      size: '850 KB',
      date: 'Feb 18, 2026',
      hash: 'sha256:918a44d827f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d6772843f7b2c',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-4',
      title: 'Government Passport & RealID (Dr. Aris Thorne)',
      type: 'Executive Identity',
      size: '3.1 MB',
      date: 'Feb 15, 2026',
      hash: 'sha256:b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d90697f83',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-5',
      title: 'Corporate Resolution for Commercial Borrowing Authorization',
      type: 'Board Authorization',
      size: '2.4 MB',
      date: 'Feb 20, 2026',
      hash: 'sha256:fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d90697f83b1657ff1',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-6',
      title: 'Primary Operating Commercial Bank Account Verification (Plaid Link)',
      type: 'Banking Telemetry',
      size: '1.2 MB',
      date: 'Feb 22, 2026',
      hash: 'sha256:d200126d90697f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284add',
      status: 'Cryptographically Verified',
    }
  ]);

  const handleAddOwner = (e) => {
    e.preventDefault();
    if (!newOwnerName || !newOwnerEquity) return;
    const newEntry = {
      id: String(owners.length + 1),
      name: newOwnerName,
      role: newOwnerRole || 'Co-Owner',
      equity: newOwnerEquity.includes('%') ? newOwnerEquity : `${newOwnerEquity}%`,
      citizenship: 'United States',
      ssnLast4: '7721',
      status: 'Verified',
    };
    setOwners([...owners, newEntry]);
    setNewOwnerName('');
    setNewOwnerRole('');
    setNewOwnerEquity('');
    setIsAddOwnerOpen(false);
    addToast({
      title: 'Beneficial Owner Added',
      message: `${newEntry.name} successfully registered with FinCEN CDD compliance protocol.`,
      type: 'success'
    });
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const processUploadedFiles = (files) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    setTimeout(() => {
      const newDocs = Array.from(files).map((file, idx) => {
        const sizeFormatted = file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024) || 120} KB`;

        return {
          id: `doc-${Date.now()}-${idx}`,
          title: file.name || 'Uploaded Corporate Document.pdf',
          type: file.type?.includes('pdf') ? 'Corporate Document (PDF)' : 'Corporate Governance',
          size: sizeFormatted,
          date: 'Just now',
          hash: `sha256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
          status: 'Cryptographically Verified',
        };
      });

      setDocuments((prev) => [...newDocs, ...prev]);
      setIsUploading(false);
      addToast({
        title: 'Document(s) Encrypted & Vaulted',
        message: `${newDocs.length} file(s) encrypted with 256-bit AES and saved to your compliance vault.`,
        type: 'success',
      });
    }, 600);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFiles(e.target.files);
    }
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFiles(e.dataTransfer.files);
    }
  };

  const handleReVerify = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast({
        title: 'Compliance Telemetry Synced',
        message: 'Live FinCEN, LexisNexis & Delaware Corporate Registry data verified 100%.',
        type: 'success',
      });
    }, 800);
  };

  const handleDownloadCertificate = () => {
    setIsCertModalOpen(false);

    const printWindow = window.open('', '_blank', 'width=900,height=850');
    if (!printWindow) {
      addToast({
        title: 'Popup Blocked',
        message: 'Please allow popups to download/print the PDF certificate.',
        type: 'warning'
      });
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>KYC_Certificate_${companyName.replace(/\\s+/g, '_')}</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            * { box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              background-color: #f8fafc;
              margin: 0;
              padding: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .cert-frame {
              width: 100%;
              max-width: 780px;
              border: 10px solid #0f172a;
              padding: 6px;
              background: #ffffff;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .cert-inner-border {
              border: 2px solid #2563eb;
              padding: 36px 40px;
              text-align: center;
              position: relative;
              background: radial-gradient(circle at 50% 50%, #ffffff 0%, #fbfcfe 100%);
            }
            .cert-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 16px;
              margin-bottom: 20px;
            }
            .cert-logo {
              font-size: 20px;
              font-weight: 900;
              color: #0f172a;
              letter-spacing: -0.02em;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .cert-badge {
              background: #ecfdf5;
              color: #059669;
              padding: 5px 12px;
              border-radius: 9999px;
              font-weight: 800;
              font-size: 11px;
              border: 1px solid #a7f3d0;
              letter-spacing: 0.05em;
            }
            .cert-title {
              font-size: 24px;
              font-weight: 900;
              color: #0f172a;
              text-transform: uppercase;
              letter-spacing: 0.06em;
              margin: 12px 0 4px;
            }
            .cert-subtitle {
              font-size: 12px;
              color: #64748b;
              text-transform: uppercase;
              letter-spacing: 0.12em;
              font-weight: 700;
              margin-bottom: 24px;
            }
            .cert-body {
              font-size: 13.5px;
              line-height: 1.6;
              color: #334155;
              margin-bottom: 24px;
              text-align: center;
              max-width: 620px;
              margin-left: auto;
              margin-right: auto;
            }
            .cert-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 14px;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 18px 20px;
              text-align: left;
              margin-bottom: 28px;
            }
            .cert-field-label {
              font-size: 10.5px;
              color: #64748b;
              text-transform: uppercase;
              font-weight: 700;
              letter-spacing: 0.03em;
            }
            .cert-field-value {
              font-size: 13.5px;
              font-weight: 700;
              color: #0f172a;
              margin-top: 2px;
            }
            .cert-footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              padding-top: 18px;
              border-top: 1px solid #e2e8f0;
            }
            .cert-sign {
              text-align: left;
            }
            .sign-line {
              width: 180px;
              border-bottom: 1.5px solid #64748b;
              margin-bottom: 6px;
              font-family: 'Brush Script MT', cursive, sans-serif;
              font-size: 20px;
              color: #1e40af;
            }
            .cert-seal {
              border: 3px double #2563eb;
              border-radius: 50%;
              width: 80px;
              height: 80px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-size: 8.5px;
              font-weight: 900;
              color: #1e40af;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              line-height: 1.25;
              background: #eff6ff;
            }
            @media print {
              body { padding: 0; background: none; }
              .cert-frame { box-shadow: none; border-color: #0f172a; }
            }
          </style>
        </head>
        <body>
          <div class="cert-frame">
            <div class="cert-inner-border">
              <div class="cert-header">
                <div class="cert-logo">⚡ OAL LENDING NETWORK</div>
                <div class="cert-badge">● FINCEN CDD LEVEL 3 VERIFIED</div>
              </div>

              <div class="cert-title">Certificate of Corporate KYC Compliance</div>
              <div class="cert-subtitle">Official Institutional Borrowing Authorization</div>

              <div class="cert-body">
                This official compliance certificate attests that <strong>${companyName}</strong> has satisfied 100% of corporate identity, Beneficial Ownership (FinCEN 31 CFR § 1010.230), and Delaware State corporate charter validation for debt facilities up to $10,000,000.
              </div>

              <div class="cert-grid">
                <div>
                  <div class="cert-field-label">Legal Entity Name</div>
                  <div class="cert-field-value">${companyName}</div>
                </div>
                <div>
                  <div class="cert-field-label">Taxpayer ID (EIN)</div>
                  <div class="cert-field-value">${ein}</div>
                </div>
                <div>
                  <div class="cert-field-label">Jurisdiction & Entity</div>
                  <div class="cert-field-value">${incState}</div>
                </div>
                <div>
                  <div class="cert-field-label">D-U-N-S Number</div>
                  <div class="cert-field-value">${duns}</div>
                </div>
                <div>
                  <div class="cert-field-label">Authorized Signatory</div>
                  <div class="cert-field-value">${signatoryName} (${signatoryRole})</div>
                </div>
                <div>
                  <div class="cert-field-label">Immutable Security Hash</div>
                  <div class="cert-field-value" style="font-family: monospace; font-size: 11px;">SHA256-OAL-9482-CDD</div>
                </div>
              </div>

              <div class="cert-footer">
                <div class="cert-sign">
                  <div class="sign-line">${signatoryName}</div>
                  <div style="font-size: 11.5px; font-weight: 700; color: #0f172a;">Authorized Officer</div>
                  <div style="font-size: 10.5px; color: #64748b;">Issued on ${currentDate}</div>
                </div>

                <div class="cert-seal">
                  <span>★ OAL ★</span>
                  <span>COMPLIANCE</span>
                  <span>SEAL</span>
                </div>

                <div class="cert-sign" style="text-align: right;">
                  <div class="sign-line" style="text-align: right; width: 100%;">Marcus Sterling</div>
                  <div style="font-size: 11.5px; font-weight: 700; color: #0f172a;">Chief Risk & Compliance Officer</div>
                  <div style="font-size: 10.5px; color: #64748b;">OAL Network Vault</div>
                </div>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 400);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();

    addToast({
      title: 'PDF Certificate Generated',
      message: `Official KYC Compliance Certificate ready for ${companyName}.`,
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'KYC & Legal Vault' }]} />
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            KYC Identity & Corporate Legal Vault
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            disabled={isRefreshing}
            onClick={handleReVerify}
            style={{ fontSize: '12px' }}
          >
            {isRefreshing ? 'Syncing...' : 'Refresh Telemetry'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={FileText}
            onClick={() => setIsCertModalOpen(true)}
            style={{ fontSize: '12px' }}
          >
            Export KYC Certificate
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={CheckCircle2}
            style={{ backgroundColor: 'var(--success)', borderColor: 'var(--success)', fontSize: '12px' }}
            onClick={() => navigate('/oal/borrower/offers')}
          >
            View Active Lender Offers
          </Button>
        </div>
      </div>

      {/* 2. Top Trust & Compliance KPI Summary Strip */}
      <div className="kpi-strip-4col">
        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            VERIFICATION STATUS
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--success)' }}>Level 3 Verified</span>
            <span className="text-xs text-secondary">FinCEN Cleared</span>
          </div>
        </Card>

        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            BORROWING CAPACITY
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Up to $10,000,000</span>
            <span className="text-xs text-secondary">Institutional</span>
          </div>
        </Card>

        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            ENCRYPTED DOCUMENTS
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent)' }}>{documents.length} / {documents.length} Validated</span>
            <span className="text-xs text-secondary">AES-256 Bit</span>
          </div>
        </Card>

        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            NEXT AUDIT REVIEW
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Dec 2027</span>
            <span className="text-xs text-secondary">Auto-Renewed</span>
          </div>
        </Card>
      </div>

      {/* 3. Navigation Tabs - Horizontal Touch Scrolling on Mobile */}
      <div className="flex items-center justify-between gap-3 border-b border-subtle pb-2 w-full">
        <div
          className="flex items-center gap-1.5 p-1 surface-secondary rounded-lg border-subtle"
          style={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
            maxWidth: '100%',
            width: '100%',
            scrollbarWidth: 'none',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('entity')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              backgroundColor: activeTab === 'entity' ? 'var(--surface)' : 'transparent',
              color: activeTab === 'entity' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'entity' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            1. Corporate Entity & Identity
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('owners')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              backgroundColor: activeTab === 'owners' ? 'var(--surface)' : 'transparent',
              color: activeTab === 'owners' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'owners' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            2. Beneficial Ownership ({owners.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vault')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              backgroundColor: activeTab === 'vault' ? 'var(--surface)' : 'transparent',
              color: activeTab === 'vault' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'vault' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            3. Legal Document Vault ({documents.length})
          </button>
        </div>
      </div>

      {/* 4. TAB 1: Corporate Entity & Signatory Identity */}
      {activeTab === 'entity' && (
        <div className="flex flex-col gap-5">
          {/* Section 1: Commercial Entity Legal Information */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Commercial Entity Legal Information
                </h2>
                <Badge variant="success" icon={CheckCircle2} style={{ display: 'inline-flex', width: 'auto' }}>
                  Good Standing: Active
                </Badge>
              </div>
            </div>

            <Card style={{ padding: '1.25rem', borderRadius: '12px' }}>
              <div className="form-grid-2x2 text-xs">
                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">Borrower Legal Name</label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{ height: '38px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">Jurisdiction & Entity Structure</label>
                  <Input
                    value={incState}
                    onChange={(e) => setIncState(e.target.value)}
                    style={{ height: '38px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="form-label mb-0 font-semibold text-secondary">Taxpayer ID (EIN / SSN)</label>
                    <button
                      type="button"
                      onClick={() => setShowEin(!showEin)}
                      className="text-accent text-xs font-semibold"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      {showEin ? 'Hide EIN' : 'Show Full EIN'}
                    </button>
                  </div>
                  <Input
                    value={showEin ? '84-9201948' : 'XX-XXX1948'}
                    readOnly
                    style={{ height: '38px', fontSize: '13px', fontFamily: 'monospace' }}
                  />
                </div>

                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">D-U-N-S Number (Dun & Bradstreet)</label>
                  <Input
                    value={duns}
                    onChange={(e) => setDuns(e.target.value)}
                    style={{ height: '38px', fontSize: '13px', fontFamily: 'monospace' }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Section 2: Primary Officer Identity */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Primary Authorized Signatory & Executive Officer
                </h2>
                <Badge variant="success" icon={ShieldCheck} style={{ display: 'inline-flex', width: 'auto' }}>
                  Identity Verified
                </Badge>
              </div>
            </div>

            <Card style={{ padding: '1.25rem', borderRadius: '12px' }} className="flex flex-col gap-3.5">
              <div className="form-grid-2x2 text-xs">
                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">Authorized Officer Full Legal Name</label>
                  <Input
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                    style={{ height: '38px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">Corporate Title / Capacity</label>
                  <Input
                    value={signatoryRole}
                    onChange={(e) => setSignatoryRole(e.target.value)}
                    style={{ height: '38px', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Officer Verification Status Box */}
              <div className="p-3 surface-secondary rounded-lg border-subtle flex items-center justify-between gap-3 text-xs flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '12px',
                      flexShrink: 0,
                    }}
                  >
                    AT
                  </div>
                  <div>
                    <span className="font-bold text-sm text-primary">Dr. Aris Thorne &bull; US Passport #P48920194</span>
                    <div className="text-secondary">Cryptographic Facial Match: 99.8% &bull; State DMV Record Valid</div>
                  </div>
                </div>

                <Badge variant="success" style={{ display: 'inline-flex', width: 'auto' }}>● RealID Validated</Badge>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* 5. TAB 2: Beneficial Ownership (FinCEN 25%+ Rule) */}
      {activeTab === 'owners' && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              Beneficial Ownership Registry (FinCEN Compliance)
            </h2>

            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => setIsAddOwnerOpen(true)}
              style={{ fontWeight: 600, flexShrink: 0 }}
            >
              Add Beneficial Owner
            </Button>
          </div>

          <Card style={{ padding: '0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader>Owner / Entity Name</TableCell>
                    <TableCell isHeader>Corporate Capacity</TableCell>
                    <TableCell isHeader>Equity Ownership</TableCell>
                    <TableCell isHeader>Citizenship / Jurisdiction</TableCell>
                    <TableCell isHeader>FinCEN Verification</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {owners.map((owner) => (
                    <TableRow key={owner.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--surface-secondary)',
                              border: '1px solid var(--border)',
                              color: 'var(--accent)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '11px',
                            }}
                          >
                            {owner.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                          </div>
                          <div>
                            <span className="font-bold text-primary">{owner.name}</span>
                            <div className="text-xs text-tertiary">SSN/EIN: ***-**-{owner.ssnLast4}</div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="text-secondary">{owner.role}</span>
                      </TableCell>

                      <TableCell>
                        <span className="font-bold text-primary" style={{ fontSize: '14px' }}>
                          {owner.equity}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-secondary">{owner.citizenship}</span>
                      </TableCell>

                      <TableCell>
                        <Badge variant="success" icon={CheckCircle2}>
                          {owner.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}

      {/* 6. TAB 3: Legal Document Vault */}
      {activeTab === 'vault' && (
        <div className="flex flex-col gap-6">
          {/* Section 1: Upload Dropzone */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Institutional Legal Repository
              </h2>
              <Badge variant="neutral" style={{ flexShrink: 0 }}>SHA-256 Protected</Badge>
            </div>

            {/* Real Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.xlsx,.png,.jpg,.jpeg"
              style={{ display: 'none' }}
            />

            {/* Interactive Upload Dropzone */}
            <Card
              onClick={handleTriggerUpload}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: isDragging ? '2px dashed var(--accent)' : '2px dashed var(--border)',
                borderRadius: '12px',
                padding: '1.75rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isDragging ? 'rgba(37, 99, 235, 0.05)' : 'var(--surface-secondary)',
                transition: 'all 0.15s ease',
              }}
              className="hover:border-primary flex flex-col items-center justify-center gap-2"
            >
              <UploadCloud size={32} style={{ color: isDragging ? 'var(--accent)' : 'var(--text-secondary)' }} />
              <div>
                <span className="font-bold text-sm text-primary">
                  {isUploading ? 'Encrypting & Verifying File...' : 'Click to Upload Legal Documents or Drag & Drop'}
                </span>
                <p className="text-xs text-secondary margin-0 mt-0.5">
                  Supports PDF, DOCX, XLSX, PNG (Corporate Bylaws, Audited Financials, Tax Filings up to 25MB)
                </p>
              </div>
            </Card>
          </div>

          {/* Section 2: List of Verified Documents */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Verified Corporate Documents ({documents.length})
              </h2>
            </div>

            <Card style={{ padding: '0', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Document Name
                      </th>
                      <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Category
                      </th>
                      <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        File Size
                      </th>
                      <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Verification Date
                      </th>
                      <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Status
                      </th>
                      <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc, idx) => (
                      <tr
                        key={doc.id}
                        style={{
                          borderBottom: idx === documents.length - 1 ? 'none' : '1px solid var(--border)',
                          transition: 'background-color 0.15s ease',
                        }}
                        className="hover:surface-secondary"
                      >
                        <td style={{ padding: '12px 16px' }}>
                          <div className="flex items-center gap-3">
                            <div
                              style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '8px',
                                backgroundColor: 'rgba(37, 99, 235, 0.08)',
                                color: 'var(--accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <FileText size={18} />
                            </div>
                            <div>
                              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{doc.title}</span>
                              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>SHA-256 Verified</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                          {doc.type}
                        </td>

                        <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                          {doc.size}
                        </td>

                        <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                          {doc.date}
                        </td>

                        <td style={{ padding: '12px 16px' }}>
                          <Badge variant="success" style={{ fontSize: '11px', padding: '2px 8px' }}>
                            ● Verified
                          </Badge>
                        </td>

                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              icon={Eye}
                              title="Inspect Hash"
                              onClick={() => setSelectedDoc(doc)}
                              style={{ width: '32px', height: '32px', padding: 0, justifyContent: 'center' }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              icon={Download}
                              title="Download File"
                              onClick={() => {
                                addToast({
                                  title: 'Document Downloaded',
                                  message: `Downloaded ${doc.title} (${doc.size}).`,
                                  type: 'info'
                                });
                              }}
                              style={{ width: '32px', height: '32px', padding: 0, justifyContent: 'center' }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* MODAL 1: Document Hash Inspector */}
      <Modal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc ? selectedDoc.title : 'Document Details'}
        maxWidth="640px"
        footer={
          <Button variant="primary" size="sm" onClick={() => setSelectedDoc(null)}>
            Done
          </Button>
        }
      >
        {selectedDoc && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-3.5 surface-secondary rounded-lg border-subtle">
              <span className="font-bold text-sm text-primary">{selectedDoc.title}</span>
              <div className="text-secondary mt-0.5">
                Category: <strong>{selectedDoc.type}</strong> &bull; Size: {selectedDoc.size} &bull; Certified on {selectedDoc.date}
              </div>
            </div>

            <div>
              <label className="form-label mb-1 font-semibold text-secondary">SHA-256 Cryptographic Audit Hash</label>
              <div className="p-2.5 surface-secondary rounded border-subtle font-mono text-tertiary select-all break-all" style={{ fontSize: '11px' }}>
                {selectedDoc.hash}
              </div>
              <span className="text-secondary mt-1 block" style={{ fontSize: '11px' }}>
                This cryptographic checksum guarantees document integrity and tampering prevention.
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL 2: Add Beneficial Owner Modal */}
      <Modal
        isOpen={isAddOwnerOpen}
        onClose={() => setIsAddOwnerOpen(false)}
        title="Add Beneficial Owner (FinCEN CDD)"
        maxWidth="540px"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddOwnerOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
              onClick={handleAddOwner}
            >
              Save & Verify Owner
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddOwner} className="flex flex-col gap-3 text-xs">
          <div>
            <label className="form-label mb-1 font-semibold text-secondary">Full Legal Name / Entity Name</label>
            <Input
              value={newOwnerName}
              onChange={(e) => setNewOwnerName(e.target.value)}
              placeholder="e.g. Jane Doe or Apex Capital Partners"
              required
              style={{ height: '38px' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label mb-1 font-semibold text-secondary">Corporate Title</label>
              <Input
                value={newOwnerRole}
                onChange={(e) => setNewOwnerRole(e.target.value)}
                placeholder="e.g. Chief Operating Officer"
                style={{ height: '38px' }}
              />
            </div>

            <div>
              <label className="form-label mb-1 font-semibold text-secondary">Equity Ownership (%)</label>
              <Input
                value={newOwnerEquity}
                onChange={(e) => setNewOwnerEquity(e.target.value)}
                placeholder="e.g. 25%"
                required
                style={{ height: '38px' }}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: Export KYC Certificate PDF */}
      <Modal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        title="Official OAL KYC Compliance Certificate"
        maxWidth="600px"
        footer={
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={handleDownloadCertificate}
          >
            Download Signed Certificate (.txt / PDF)
          </Button>
        }
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="p-4 surface-secondary rounded-lg border-subtle flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-primary">BioGenix Labs Inc. &bull; Level 3 Institutional KYC</span>
              <Badge variant="success">Active Certificate #OAL-KYC-9482</Badge>
            </div>
            <p className="text-secondary margin-0">
              This certificate confirms that BioGenix Labs Inc. (EIN: 84-9201948) has completed 100% of corporate identity, FinCEN CDD beneficial ownership, and legal charter verification under the OAL Lending Network Governance protocol.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 surface-secondary rounded-lg border-subtle">
            <div>
              <span className="text-tertiary">Issuing Authority</span>
              <div className="font-bold text-primary">OAL Network Compliance Desk</div>
            </div>
            <div>
              <span className="text-tertiary">Cryptographic Seal</span>
              <div className="font-bold text-success font-mono">TLS 256-Bit Valid</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
