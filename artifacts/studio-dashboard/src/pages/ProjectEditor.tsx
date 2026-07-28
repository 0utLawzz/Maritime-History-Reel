import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'wouter';
import { 
  useGetProject, 
  useCreateProject, 
  useUpdateProject,
  useUpdateProjectStatus,
  useDeleteProject,
  getListProjectsQueryKey,
  getGetProjectStatsQueryKey,
  getGetProjectQueryKey,
  VideoProject,
  VideoProjectStatus
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type ProjectFormData = {
  title: string;
  topic: string;
  hookDate: string;
  hookYear: string;
  scene2Headline: string;
  scene2Subline: string;
  scene3Headline: string;
  scene3Body: string;
  scene4Headline: string;
  scene4Body: string;
  scene5Headline: string;
  scene5Body: string;
  scene6Cta: string;
  status: VideoProjectStatus;
};

export default function ProjectEditor() {
  const params = useParams();
  const id = params.id ? parseInt(params.id, 10) : null;
  const isEdit = !!id;

  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: project, isLoading: projectLoading } = useGetProject(id as number, { 
    query: { enabled: isEdit, queryKey: getGetProjectQueryKey(id as number) }
  });

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const updateStatus = useUpdateProjectStatus();
  const deleteProject = useDeleteProject();

  // Form state
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    topic: '',
    hookDate: '',
    hookYear: '',
    scene2Headline: '',
    scene2Subline: '',
    scene3Headline: '',
    scene3Body: '',
    scene4Headline: '',
    scene4Body: '',
    scene5Headline: '',
    scene5Body: '',
    scene6Cta: '',
     status: VideoProjectStatus.content
  });

  const [activeTab, setActiveTab] = useState(1);
  const initializedForId = useRef<number | null>(null);

  useEffect(() => {
    if (isEdit && project && initializedForId.current !== project.id) {
      initializedForId.current = project.id;
      setFormData({
        title: project.title || '',
        topic: project.topic || '',
        hookDate: project.hookDate || '',
        hookYear: project.hookYear || '',
        scene2Headline: project.scene2Headline || '',
        scene2Subline: project.scene2Subline || '',
        scene3Headline: project.scene3Headline || '',
        scene3Body: project.scene3Body || '',
        scene4Headline: project.scene4Headline || '',
        scene4Body: project.scene4Body || '',
        scene5Headline: project.scene5Headline || '',
        scene5Body: project.scene5Body || '',
        scene6Cta: project.scene6Cta || '',
        status: project.status as any
      });
    }
  }, [project, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (markAsScripted = false) => {
    if (!formData.title) {
      toast.error('Project Title is required');
      return;
    }

    const payload = {
      ...formData,
      status: markAsScripted ? VideoProjectStatus.scripted : formData.status
    };

    try {
      if (isEdit) {
        await updateProject.mutateAsync({ id: id as number, data: payload as any });
        toast.success('Project updated');
        queryClient.invalidateQueries({ queryKey: getGetProjectQueryKey(id as number) });
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetProjectStatsQueryKey() });
        if (markAsScripted) {
          setFormData(prev => ({ ...prev, status: VideoProjectStatus.scripted }));
        }
      } else {
        const res = await createProject.mutateAsync({ data: payload as any });
        toast.success('Project created');
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetProjectStatsQueryKey() });
        setLocation(`/projects/${res.id}/edit`);
      }
    } catch (err) {
      toast.error('Failed to save project');
    }
  };

  const handleStatusChange = async (newStatus: any) => {
    if (!isEdit) return;
    try {
      await updateStatus.mutateAsync({ id: id as number, data: { status: newStatus } });
      toast.success(`Status updated to ${newStatus}`);
      queryClient.setQueryData(getGetProjectQueryKey(id as number), (old: any) => 
        old ? { ...old, status: newStatus } : old
      );
      setFormData(prev => ({ ...prev, status: newStatus }));
      queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetProjectStatsQueryKey() });
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!isEdit) return;
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject.mutateAsync({ id: id as number });
        toast.success('Project deleted');
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetProjectStatsQueryKey() });
        setLocation('/');
      } catch (err) {
        toast.error('Failed to delete project');
      }
    }
  };

  const tabs = [
    { id: 1, label: '1 HOOK' },
    { id: 2, label: '2 SHIP' },
    { id: 3, label: '3 BATTLE' },
    { id: 4, label: '4 STORY' },
    { id: 5, label: '5 LEGACY' },
    { id: 6, label: '6 CTA' },
  ];

  const statuses = [
    VideoProjectStatus.content,
    VideoProjectStatus.scripted,
    VideoProjectStatus.building,
    VideoProjectStatus.ready,
    VideoProjectStatus.scheduled,
    VideoProjectStatus.published,
    VideoProjectStatus.failed,
  ];

  if (isEdit && projectLoading) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col md:flex-row">
        <div className="w-full border-r-[3px] border-[#0C0C0C] bg-[#FAF6EE] p-6 h-[100dvh]">
          <div className="nb-card p-8 h-64 w-full animate-pulse bg-secondary/50"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col md:flex-row overflow-hidden">
      {/* LEFT - Form */}
      <div className="w-full md:w-[60%] border-r-[3px] border-[#0C0C0C] bg-[#FAF6EE] flex flex-col relative h-[100dvh] overflow-y-auto">
        
        <div className="p-6 pb-32 md:pb-24">
          <button 
            onClick={() => setLocation('/')}
            className="nb-btn nb-btn-secondary !py-1.5 !px-3 !text-xs mb-6"
          >
            ← BACK
          </button>

          <div className="flex items-center justify-between mb-8">
            <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl tracking-wide">
              {isEdit ? 'EDIT REEL' : 'NEW REEL'}
            </h1>
            {isEdit && project && (
              <div className="nb-stamp nb-stamp-orange -rotate-9 text-lg md:text-xl px-2 py-1">V{project.version}</div>
            )}
          </div>

          {isEdit && (
            <div className="mb-8 flex flex-wrap items-center gap-1 sm:gap-2 border-b-2 border-black/10 pb-4">
              {statuses.map((s, i) => (
                <React.Fragment key={s}>
                  <button 
                    onClick={() => handleStatusChange(s)}
                    className={`mono text-[10px] sm:text-xs uppercase px-2 py-1 transition-colors ${formData.status === s ? 'text-[#C94A00] font-bold border-b-2 border-[#C94A00]' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {s}
                  </button>
                  {i < statuses.length - 1 && <span className="text-muted-foreground/30 text-xs">→</span>}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="space-y-4 mb-8 bg-[#F0E8D0] p-4 border-[3px] border-[#0C0C0C] shadow-[5px_5px_0_#0C0C0C] rounded-md">
            <div>
              <label className="mono block text-sm font-bold mb-1">PROJECT TITLE</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                className="nb-input bg-white" 
                placeholder="e.g. The Mary Rose — July 19, 1545" 
              />
            </div>
            <div>
              <label className="mono block text-sm font-bold mb-1">TOPIC / SUBJECT</label>
              <input 
                name="topic" 
                value={formData.topic} 
                onChange={handleChange} 
                className="nb-input bg-white" 
                placeholder="e.g. English Naval History, Tudor Period" 
              />
            </div>
          </div>

          <div className="sticky top-0 z-10 -mx-6 px-6 bg-[#FAF6EE] pt-2 pb-4 shadow-sm border-b-[3px] border-[#0C0C0C] mb-6">
            <div className="nb-tab-bar overflow-x-auto whitespace-nowrap hide-scrollbar flex rounded-md overflow-hidden border-[3px] border-[#0C0C0C]">
              {tabs.map((tab, idx) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 mono text-xs md:text-sm font-bold px-3 py-3 border-r-[3px] border-[#0C0C0C] last:border-r-0 transition-colors ${activeTab === tab.id ? 'bg-[#C94A00] text-white' : 'bg-white text-[#0C0C0C] hover:bg-[#F0E8D0]'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            {activeTab === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="font-sans text-sm text-muted-foreground border-l-4 border-[#C94A00] pl-3 py-1">This is the first frame viewers see. Make it specific and intriguing.</p>
                <div>
                  <label className="mono block text-sm font-bold mb-1">ON THIS DAY — DATE</label>
                  <input name="hookDate" value={formData.hookDate} onChange={handleChange} className="nb-input" placeholder="e.g. July 19" />
                </div>
                <div>
                  <label className="mono block text-sm font-bold mb-1">HISTORICAL YEAR</label>
                  <input name="hookYear" value={formData.hookYear} onChange={handleChange} className="nb-input" placeholder="e.g. 1545" />
                </div>
              </div>
            )}
            
            {activeTab === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="font-sans text-sm text-muted-foreground border-l-4 border-[#C94A00] pl-3 py-1">Bold text shown over the main image. Split into headline and italic subtitle.</p>
                <div>
                  <label className="mono block text-sm font-bold mb-1">MAIN HEADLINE</label>
                  <input name="scene2Headline" value={formData.scene2Headline} onChange={handleChange} className="nb-input" placeholder="e.g. The Ship That Sank" />
                </div>
                <div>
                  <label className="mono block text-sm font-bold mb-1">SUBTITLE (ITALIC GOLD)</label>
                  <input name="scene2Subline" value={formData.scene2Subline} onChange={handleChange} className="nb-input" placeholder="e.g. in Front of the King" />
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <label className="mono block text-sm font-bold mb-1">SECTION HEADLINE</label>
                  <input name="scene3Headline" value={formData.scene3Headline} onChange={handleChange} className="nb-input" placeholder="e.g. The Battle of the Solent" />
                </div>
                <div>
                  <label className="mono block text-sm font-bold mb-1">BODY TEXT</label>
                  <textarea name="scene3Body" value={formData.scene3Body} onChange={handleChange} className="nb-input nb-textarea" placeholder="e.g. On a calm summer morning in 1545, the pride of Henry VIII's fleet..." />
                </div>
              </div>
            )}

            {activeTab === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <label className="mono block text-sm font-bold mb-1">SECTION HEADLINE</label>
                  <input name="scene4Headline" value={formData.scene4Headline} onChange={handleChange} className="nb-input" placeholder="e.g. Why Did She Sink?" />
                </div>
                <div>
                  <label className="mono block text-sm font-bold mb-1">BODY TEXT</label>
                  <textarea name="scene4Body" value={formData.scene4Body} onChange={handleChange} className="nb-input nb-textarea" placeholder="e.g. Historians debate the cause — overcrowding, open gun ports..." />
                </div>
              </div>
            )}

            {activeTab === 5 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <label className="mono block text-sm font-bold mb-1">SECTION HEADLINE</label>
                  <input name="scene5Headline" value={formData.scene5Headline} onChange={handleChange} className="nb-input" placeholder="e.g. Rediscovery & Legacy" />
                </div>
                <div>
                  <label className="mono block text-sm font-bold mb-1">BODY TEXT</label>
                  <textarea name="scene5Body" value={formData.scene5Body} onChange={handleChange} className="nb-input nb-textarea" placeholder="e.g. In 1982, the Mary Rose was raised from the seabed..." />
                </div>
              </div>
            )}

            {activeTab === 6 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="font-sans text-sm text-muted-foreground border-l-4 border-[#C94A00] pl-3 py-1">The final frame. Short, punchy, drives engagement.</p>
                <div>
                  <label className="mono block text-sm font-bold mb-1">CALL TO ACTION</label>
                  <input name="scene6Cta" value={formData.scene6Cta} onChange={handleChange} className="nb-input" placeholder="e.g. Follow for more history reels" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#FAF6EE] border-t-[3px] border-[#0C0C0C] flex flex-wrap items-center gap-3 z-20">
          <button 
            onClick={() => handleSave(false)} 
            disabled={createProject.isPending || updateProject.isPending}
            className="nb-btn nb-btn-primary flex-1 min-w-[120px]"
          >
            {isEdit ? 'SAVE CHANGES' : 'SAVE DRAFT'}
          </button>
          
          {!isEdit && (
            <button 
              onClick={() => handleSave(true)} 
              disabled={createProject.isPending || updateProject.isPending}
              className="nb-btn nb-btn-teal flex-1 min-w-[120px]"
            >
               MARK AS SCRIPTED
            </button>
          )}

          {isEdit && (
            <>
              <a 
                href="/mary-rose-reel/" 
                target="_blank" 
                rel="noreferrer"
                className="nb-btn nb-btn-yellow flex-1 min-w-[140px] text-center"
              >
                EXPORT VIDEO ↗
              </a>
              <div className="hidden sm:block flex-grow"></div>
              <button 
                onClick={handleDelete}
                className="nb-btn !bg-white !text-destructive !border-[3px] !border-[#0C0C0C] shadow-[3px_3px_0_#0C0C0C] flex-none text-xs ml-auto"
              >
                DELETE
              </button>
            </>
          )}
        </div>
      </div>

      {/* RIGHT - 9:16 Live Preview Panel */}
      <div className="w-full md:w-[40%] bg-[#F0E8D0] p-6 flex flex-col items-center h-[100dvh] overflow-y-auto border-t-[3px] md:border-t-0 border-[#0C0C0C]">
        <div className="mono text-xs text-muted-foreground mb-4 uppercase tracking-[0.2em] font-bold bg-white px-3 py-1 border-[2px] border-[#0C0C0C] rounded-full">
          PREVIEW · 9:16
        </div>
        
        <div className="nb-preview-916 flex flex-col bg-black flex-shrink-0">
          {activeTab === 1 && (
            <div className="flex-1 bg-[#1C1C1C] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>
              <div className="relative z-10">
                <div className="mono text-[#D4A800] text-[10px] tracking-[0.3em] mb-3 uppercase font-bold border-b border-[#D4A800]/30 pb-1 inline-block">
                  ON THIS DAY
                </div>
                <div className="font-['Bebas_Neue'] text-white text-[64px] leading-[0.85] tracking-wide filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] break-words">
                  {formData.hookDate || 'DATE'}
                </div>
                <div className="mono text-white/70 text-base mt-2 tracking-wider">
                  {formData.hookYear || 'YEAR'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="flex-1 bg-[#1C1C1C] flex flex-col items-center justify-center p-6 relative">
              <div className="absolute inset-0 bg-[#2A2A2A] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-dashed border-white/20 rounded-full flex items-center justify-center">
                  <span className="mono text-[8px] text-white/50">IMG</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="relative z-10 text-center w-full mt-auto mb-12">
                <div className="font-['Bebas_Neue'] text-white text-[48px] leading-[0.9] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2 break-words">
                  {formData.scene2Headline || 'HEADLINE GOES HERE'}
                </div>
                <div className="font-serif italic text-[#D4A800] text-xl mt-3 font-medium filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] break-words">
                  {formData.scene2Subline || 'Subtitle italic text'}
                </div>
              </div>
            </div>
          )}

          {(activeTab === 3 || activeTab === 4 || activeTab === 5) && (
            <div className="flex-1 bg-[#1C1C1C] flex flex-col justify-end p-6 pb-16 relative">
              <div className="absolute inset-0 bg-[#2A2A2A] opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
              <div className="relative z-10 w-full">
                <div className="font-['Bebas_Neue'] text-white text-3xl leading-none mb-3 text-[#D4A800] break-words">
                  {activeTab === 3 ? formData.scene3Headline || 'HEADLINE' : 
                   activeTab === 4 ? formData.scene4Headline || 'HEADLINE' : 
                   formData.scene5Headline || 'HEADLINE'}
                </div>
                <div className="font-sans text-[#F0E8D0] text-[13px] leading-[1.6] bg-black/40 p-3 border-l-2 border-[#C94A00] break-words">
                  {activeTab === 3 ? formData.scene3Body || 'Body text appears here...' : 
                   activeTab === 4 ? formData.scene4Body || 'Body text appears here...' : 
                   formData.scene5Body || 'Body text appears here...'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 6 && (
            <div className="flex-1 bg-[#1C1C1C] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C0C0C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
              <div className="font-['Bebas_Neue'] text-white text-[40px] leading-[0.9] px-4 break-words">
                {formData.scene6Cta || 'CALL TO ACTION'}
              </div>
              <div className="mono text-[10px] text-white/50 mt-8 uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">
                Link in bio
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-[280px]">
          <a href="/mary-rose-reel/" target="_blank" rel="noreferrer" className="mono text-[11px] font-bold text-[#0D9970] hover:underline uppercase tracking-wider">
            OPEN FULL VIDEO ↗
          </a>
          <a href="/mary-rose-reel/" target="_blank" rel="noreferrer" className="nb-btn nb-btn-yellow w-full text-center flex justify-center !py-3">
            EXPORT PREVIEW
          </a>
        </div>
      </div>
    </div>
  );
}
