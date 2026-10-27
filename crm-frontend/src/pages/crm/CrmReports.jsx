import React, { useState, useEffect } from 'react';
import { FileText, Download, Filter as FilterIcon, Calendar, User, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Select, Input, KPICard } from '../../components/ui';
import { useToast } from '../../context/ToastContext';
import { useCrm } from '../../context/CrmContext';
import { useLanguage } from '../../context/LanguageContext';

const reportsList = [
  { id: 'REP-101', title: 'Q1 Enterprise Revenue & MRR Audit', titleEs: 'Auditoría de Ingresos y MRR Empresarial Q1', category: 'Finance', categoryEs: 'Finanzas y Contabilidad', user: 'Alexander Wright', date: '2026-02-25', status: 'Approved', statusEs: 'Aprobado', format: 'CSV / PDF' },
  { id: 'REP-102', title: 'Sales Pipeline & Opportunity Conversion', titleEs: 'Pipeline de Ventas y Conversión de Oportunidades', category: 'Sales', categoryEs: 'Ventas', user: 'Sarah Jenkins', date: '2026-02-24', status: 'Approved', statusEs: 'Aprobado', format: 'CSV' },
  { id: 'REP-103', title: 'Lead Source Attribution & ROI Analysis', titleEs: 'Atribución de Fuentes de Prospectos y ROI', category: 'Marketing', categoryEs: 'Marketing', user: 'David Chen', date: '2026-02-22', status: 'Approved', statusEs: 'Aprobado', format: 'CSV' },
  { id: 'REP-104', title: 'ERP Procurement & Inventory Valuation', titleEs: 'Adquisiciones ERP y Valoración de Inventario', category: 'Operations', categoryEs: 'Operaciones', user: 'Alexander Wright', date: '2026-02-20', status: 'Pending Review', statusEs: 'Pendiente de Revisión', format: 'CSV / PDF' },
  { id: 'REP-105', title: 'Customer Support SLA & CSAT Performance', titleEs: 'SLA de Soporte al Cliente y Rendimiento CSAT', category: 'Support', categoryEs: 'Soporte al Cliente', user: 'Elena Rostova', date: '2026-02-18', status: 'Approved', statusEs: 'Aprobado', format: 'CSV' },
];

export const CrmReports = () => {
  const { addToast } = useToast();
  const { refreshActivities, refreshDeals } = useCrm();
  const { language, t } = useLanguage();
  const isEs = language === 'ES';

  useEffect(() => {
    if (refreshActivities) refreshActivities();
    if (refreshDeals) refreshDeals();
  }, [refreshActivities, refreshDeals]);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = reportsList.filter((r) => {
    const matchCategory = categoryFilter === 'all' || r.category === categoryFilter;
    const matchUser = userFilter === 'all' || r.user === userFilter;
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchCategory && matchUser && matchStatus;
  });

  const handleExportPDF = (reportTitle) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      addToast({ title: isEs ? 'Error de Exportación' : 'Export Failed', message: isEs ? 'Por favor permita ventanas emergentes para generar el PDF.' : 'Please allow popups to generate PDF.', type: 'error' });
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${reportTitle}</title>
        <style>
          body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; padding: 40px; margin: 0; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { margin: 0; font-size: 24px; color: #0f172a; }
          .header p { margin: 5px 0 0; color: #64748b; font-size: 14px; }
          .meta { text-align: right; font-size: 14px; color: #64748b; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
          th { background-color: #f8fafc; color: #334155; font-weight: 600; text-align: left; padding: 12px; border-bottom: 2px solid #cbd5e1; }
          td { padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .status-badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
          .status-Approved { background-color: #dcfce7; color: #166534; }
          .status-Pending { background-color: #fef08a; color: #854d0e; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>${reportTitle.replace(/_/g, ' ')}</h1>
            <p>${isEs ? 'Informes Empresariales CRM nErgy AI' : 'CRM nErgy AI Enterprise Reporting'}</p>
          </div>
          <div class="meta">
            ${isEs ? 'Generado' : 'Generated'}: ${new Date().toLocaleDateString()}<br/>
            ${isEs ? 'Registros Totales' : 'Total Records'}: ${filteredReports.length}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>${isEs ? 'Título del Informe' : 'Report Title'}</th>
              <th>${isEs ? 'Categoría' : 'Category'}</th>
              <th>${isEs ? 'Generado Por' : 'Generated By'}</th>
              <th>${isEs ? 'Fecha' : 'Date'}</th>
              <th>${isEs ? 'Estado' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            ${filteredReports.map(r => `
              <tr>
                <td><strong>${r.id}</strong></td>
                <td>${isEs && r.titleEs ? r.titleEs : r.title}</td>
                <td>${isEs && r.categoryEs ? r.categoryEs : r.category}</td>
                <td>${r.user}</td>
                <td>${r.date}</td>
                <td>
                  <span class="status-badge status-${r.status.split(' ')[0]}">
                    ${isEs && r.statusEs ? r.statusEs : r.status}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="margin-top: 40px; text-align: center; color: #94a3b8; font-size: 12px;">
          ${isEs ? 'Confidencial - Exclusivo para uso interno empresarial.' : 'Confidential - For internal enterprise use only.'}
        </div>
        <script>
          window.onload = function() { window.print(); window.onafterprint = function() { window.close(); } };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    addToast({ title: isEs ? 'PDF Generado' : 'PDF Generated', message: isEs ? `Se preparó ${reportTitle} en formato PDF.` : `Prepared ${reportTitle} as PDF.`, type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: isEs ? 'Centro de Informes' : 'Reports Hub' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
            {isEs ? 'Análisis e Informes Empresariales' : 'Enterprise Analytics & Reports'}
          </h1>
        </div>

        <div className="header-actions-right">
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={() => handleExportPDF('All_CRM_Reports_Summary')}
          >
            {isEs ? 'Exportar Todo (PDF)' : 'Export All (PDF)'}
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards Strip */}
      <div className="grid-responsive-kpi">
        <KPICard
          title={isEs ? 'TOTAL INFORMES DE AUDITORÍA' : 'TOTAL AUDIT REPORTS'}
          value={`${reportsList.length}`}
          change={isEs ? '100% Sincronizado' : '100% Synced'}
          changeType="positive"
          changePeriod={isEs ? 'registros del sistema' : 'system records'}
          icon={FileText}
          iconBg="rgba(29, 78, 216, 0.1)"
          iconColor="#1d4ed8"
        />
        <KPICard
          title={isEs ? 'INFORMES APROBADOS' : 'APPROVED REPORTS'}
          value={`${reportsList.filter((r) => r.status === 'Approved').length}`}
          change={isEs ? '80% Verificado' : '80% Verified'}
          changeType="positive"
          changePeriod={isEs ? 'cumplimiento aprobado' : 'compliance passed'}
          icon={CheckCircle2}
          iconBg="rgba(22, 163, 74, 0.1)"
          iconColor="#16a34a"
        />
        <KPICard
          title={isEs ? 'PENDIENTE DE REVISIÓN' : 'PENDING REVIEW'}
          value={`${reportsList.filter((r) => r.status === 'Pending Review').length}`}
          change={isEs ? '1 En Revisión' : '1 In Review'}
          changeType="neutral"
          changePeriod={isEs ? 'cola de auditoría' : 'auditor queue'}
          icon={Clock}
          iconBg="rgba(234, 88, 12, 0.1)"
          iconColor="#ea580c"
        />
        <KPICard
          title={isEs ? 'SLA DE CUMPLIMIENTO' : 'COMPLIANCE SLA'}
          value="100%"
          change={isEs ? 'Certificado' : 'Certified'}
          changeType="positive"
          changePeriod="SOX • ISO 27001"
          icon={ShieldCheck}
          iconBg="rgba(147, 51, 234, 0.1)"
          iconColor="#9333ea"
        />
      </div>

      {/* 3. Filter Bar — 3 Dropdowns in ONE Horizontal Row */}
      <div className="table-toolbar">
        <div className="table-toolbar-actions" style={{ width: '100%' }}>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { label: isEs ? 'Todas las Categorías' : 'All Categories', value: 'all' },
              { label: isEs ? 'Finanzas y Contabilidad' : 'Finance', value: 'Finance' },
              { label: isEs ? 'Ventas' : 'Sales', value: 'Sales' },
              { label: isEs ? 'Marketing' : 'Marketing', value: 'Marketing' },
              { label: isEs ? 'Operaciones' : 'Operations', value: 'Operations' },
              { label: isEs ? 'Soporte al Cliente' : 'Support', value: 'Support' },
            ]}
            style={{ height: '38px', fontSize: '13px' }}
          />

          <Select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            options={[
              { label: isEs ? 'Todos los Usuarios' : 'All Users', value: 'all' },
              { label: 'Alexander Wright', value: 'Alexander Wright' },
              { label: 'Sarah Jenkins', value: 'Sarah Jenkins' },
              { label: 'David Chen', value: 'David Chen' },
            ]}
            style={{ height: '38px', fontSize: '13px' }}
          />

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: isEs ? 'Todos los Estados' : 'All Statuses', value: 'all' },
              { label: isEs ? 'Aprobado' : 'Approved', value: 'Approved' },
              { label: isEs ? 'Pendiente de Revisión' : 'Pending Review', value: 'Pending Review' },
            ]}
            style={{ height: '38px', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* 4. Desktop Reports Table */}
      <Card className="hidden-mobile">
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>{isEs ? 'Código de Informe' : 'Report Code'}</TableCell>
                <TableCell isHeader>{isEs ? 'Título del Informe' : 'Report Title'}</TableCell>
                <TableCell isHeader>{isEs ? 'Categoría' : 'Category'}</TableCell>
                <TableCell isHeader>{isEs ? 'Generado Por' : 'Generated By'}</TableCell>
                <TableCell isHeader>{isEs ? 'Fecha' : 'Date'}</TableCell>
                <TableCell isHeader>{isEs ? 'Estado' : 'Status'}</TableCell>
                <TableCell isHeader align="right">{isEs ? 'Acciones' : 'Actions'}</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((rep) => (
                <TableRow key={rep.id}>
                  <TableCell><span className="font-mono text-xs text-tertiary">{rep.id}</span></TableCell>
                  <TableCell><span className="font-bold text-xs text-primary">{isEs && rep.titleEs ? rep.titleEs : rep.title}</span></TableCell>
                  <TableCell><Badge variant="primary">{isEs && rep.categoryEs ? rep.categoryEs : rep.category}</Badge></TableCell>
                  <TableCell><span className="text-xs text-secondary">{rep.user}</span></TableCell>
                  <TableCell><span className="text-xs text-tertiary">{rep.date}</span></TableCell>
                  <TableCell><Badge variant={rep.status === 'Approved' ? 'success' : 'warning'}>{isEs && rep.statusEs ? rep.statusEs : rep.status}</Badge></TableCell>
                  <TableCell align="right">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Download}
                      onClick={() => handleExportPDF(rep.title)}
                    >
                      {isEs ? 'Exportar PDF' : 'Export PDF'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Mobile Card List View */}
      <div className="visible-mobile flex flex-col gap-3">
        {filteredReports.map((rep) => (
          <Card key={rep.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-subtle pb-2">
              <span className="font-mono text-xs text-tertiary">{rep.id}</span>
              <Badge variant={rep.status === 'Approved' ? 'success' : 'warning'}>{isEs && rep.statusEs ? rep.statusEs : rep.status}</Badge>
            </div>
            
            <div>
              <div className="font-bold text-sm text-primary mb-1">{isEs && rep.titleEs ? rep.titleEs : rep.title}</div>
              <Badge variant="primary" className="mb-2 w-fit">{isEs && rep.categoryEs ? rep.categoryEs : rep.category}</Badge>
            </div>

            <div className="flex flex-col gap-1 text-xs text-secondary mt-1">
              <div className="flex items-center gap-2"><User size={14} className="text-tertiary" /> {rep.user}</div>
              <div className="flex items-center gap-2"><Calendar size={14} className="text-tertiary" /> {rep.date}</div>
            </div>

            <div className="pt-2 mt-0.5">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                className="w-full justify-center"
                onClick={() => handleExportPDF(rep.title)}
              >
                {isEs ? 'Exportar PDF' : 'Export PDF'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
