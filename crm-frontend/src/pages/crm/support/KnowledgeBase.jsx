import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  FileText,
  Folder,
  ChevronRight,
  HelpCircle,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Plus,
  ArrowLeft,
  ExternalLink,
  Tag,
  RefreshCw
} from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Input, Modal } from '../../../components/ui';
import { useSupport } from '../../../context/SupportContext';
import { useToast } from '../../../context/ToastContext';
import { useLanguage } from '../../../context/LanguageContext';

export const KnowledgeBase = () => {
  const { t } = useLanguage();
  const { kbArticles, addArticle, isLoading, fetchSupportData } = useSupport();
  const { addToast } = useToast();

  useEffect(() => {
    if (fetchSupportData) {
      fetchSupportData();
    }
  }, [fetchSupportData]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'CRM & Pipeline', content: '' });

  const filteredArticles = kbArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      addToast({ title: 'Validation Error', message: 'Title and content are required.', type: 'error' });
      return;
    }

    try {
      const created = await addArticle(formData);
      addToast({ title: 'Article Published', message: `Published "${created.title}".`, type: 'success' });
      setIsModalOpen(false);
      setFormData({ title: '', category: 'CRM & Pipeline', content: '' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to publish article.', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: t('Customer Support') }, { label: t('Knowledge Base') }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              {t('Knowledge Base & Standard Procedures')}
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              {t('MySQL Synced')}
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            {t('Searchable internal documentation, troubleshooting manuals, and FAQs for CRM & ERP operators.')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={fetchSupportData} disabled={isLoading}>
            {t('Refresh')}
          </Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            {t('Publish Article')}
          </Button>
        </div>
      </div>

      {/* Article Detail View Modal/State */}
      {activeArticle ? (
        <Card className="border shadow-sm">
          <CardHeader
            title={activeArticle.title}
            subtitle={`${t('Category')}: ${t(activeArticle.category)} • ${t('Views')}: ${activeArticle.views || 0}`}
            action={
              <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => setActiveArticle(null)}>
                {t('Back to Articles')}
              </Button>
            }
          />
          <CardBody className="p-6 text-sm text-slate-200 whitespace-pre-line leading-relaxed">
            {activeArticle.content}
          </CardBody>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder={t('Search guides, procedures, or technical keywords...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
              className="flex-1"
            />
          </div>

          {/* Articles Grid */}
          {isLoading ? (
            <div className="p-12 text-center text-xs text-secondary">{t('Loading articles from database...')}</div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
              <BookOpen className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-primary">{t('No Documentation Articles Found')}</h3>
              <p className="text-xs text-secondary max-w-sm mt-1 mb-4">
                {t("No articles match your criteria. Click 'Publish Article' to add documentation to the knowledge base.")}
              </p>
              <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
                {t('Publish First Article')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((art) => (
                <Card
                  key={art.id}
                  className="border shadow-sm hover:border-sky-500/50 transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => setActiveArticle(art)}
                >
                  <CardBody className="p-5 flex flex-col justify-between h-full gap-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="info" className="text-[10px]">{t(art.category)}</Badge>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {art.views || 0} {t('views')}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-primary hover:text-sky-400 transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-xs text-secondary line-clamp-3">
                        {art.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-sky-400 font-medium">
                      <span>{t('Read Manual')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Article Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('Publish Knowledge Base Article')}
        size="md"
      >
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input
            label={t('Article Title *')}
            placeholder="e.g. Standard Operating Procedure for Enterprise Procurement"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label={t('Category')}
            placeholder="e.g. ERP & Logistics, CRM, Security"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <div className="form-group">
            <label className="form-label">
              <span>{t('Documentation Content')} <span style={{ color: 'var(--error)' }}>*</span></span>
            </label>
            <textarea
              className="form-control"
              style={{ minHeight: '140px', resize: 'vertical', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
              placeholder={t('Write the full documentation guide, markdown formatting is supported...')}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              {t('Cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('Publish Article')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default KnowledgeBase;
