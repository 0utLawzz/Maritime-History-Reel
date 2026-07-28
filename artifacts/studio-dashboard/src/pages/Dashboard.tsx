import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  useListProjects, 
  useGetProjectStats, 
  useDeleteProject,
  getListProjectsQueryKey,
  getGetProjectStatsQueryKey
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const { data: stats, isLoading: statsLoading } = useGetProjectStats();
  const { data: projects, isLoading: projectsLoading } = useListProjects();
  
  const deleteProject = useDeleteProject();

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await deleteProject.mutateAsync({ id });
      toast.success('Project deleted');
      queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetProjectStatsQueryKey() });
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'content': return 'border-gray-500';
      case 'scripted': return 'border-[#C94A00]';
      case 'building': return 'border-[#D4A800]';
      case 'ready': return 'border-[#0A6B52]';
      case 'scheduled': return 'border-[#D4A800]';
      case 'published': return 'border-[#8B2FC9]';
      case 'failed': return 'border-[#FF3333]';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 h-[58px] bg-[#0C0C0C] flex items-center justify-between px-6 shadow-[0_4px_0_#C94A00]">
        <div className="flex items-center space-x-1 font-['Bebas_Neue'] text-[28px] tracking-wide cursor-pointer" onClick={() => setLocation('/')}>
          <span className="text-[#FAF6EE]">BRIGHT</span>
          <span className="text-[#C94A00]">.</span>
          <span className="text-[#0D9970] ml-1">STORIES</span>
        </div>
        <Link href="/projects/new" className="nb-btn nb-btn-primary">
          NEW PROJECT
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Production status board */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
          {['content', 'scripted', 'building', 'ready', 'scheduled', 'published', 'failed'].map((status) => {
            const count = stats?.byStatus?.[status as keyof typeof stats.byStatus] || 0;
            return (
              <div key={status} className={`nb-card p-5 border-t-[6px] ${getStatusColor(status)} flex flex-col justify-between`}>
                <div className="mono text-xs text-muted-foreground font-bold uppercase tracking-wider">{status}</div>
                <div className="font-['Bebas_Neue'] text-7xl mt-4 leading-none text-[#0C0C0C]">{statsLoading ? '-' : count}</div>
              </div>
            );
          })}
        </div>

        {/* Content list */}
        {projectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="nb-card p-6 h-56 animate-pulse bg-[#E8DFC7] border-dashed"></div>
            ))}
          </div>
        ) : !projects || projects.length === 0 ? (
          <div className="text-center py-24 bg-white nb-card border-[3px]">
            <h2 className="font-['Bebas_Neue'] text-6xl md:text-7xl mb-4 text-[#0C0C0C]">YOUR STUDIO IS EMPTY</h2>
            <p className="text-muted-foreground font-sans text-lg mb-8 max-w-md mx-auto">Create your first short-form history reel and start telling stories.</p>
            <Link href="/projects/new" className="nb-btn nb-btn-primary px-10 py-5 text-lg shadow-[8px_8px_0_#0C0C0C]">
              CREATE YOUR FIRST REEL
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="nb-card p-6 flex flex-col relative overflow-hidden group bg-white hover:bg-[#FAF6EE] transition-colors cursor-pointer" onClick={() => setLocation(`/projects/${project.id}/edit`)}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 pr-16">
                    <h3 className="font-sans font-bold text-2xl leading-tight mb-2 line-clamp-2 text-[#0C0C0C]">{project.title}</h3>
                    <p className="text-sm text-muted-foreground truncate mono bg-[#F0E8D0] inline-block px-2 py-1 rounded-sm border border-[#0C0C0C]" title={project.topic}>{project.topic || 'UNTITLED TOPIC'}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="nb-stamp nb-stamp-orange -rotate-9 text-sm px-2 py-0">V{project.version}</div>
                  </div>
                </div>

                <div className="mb-8 flex-1">
                  <span className={`nb-badge nb-badge-${project.status} text-[10px] px-2 py-1`}>{project.status}</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-[#0C0C0C]/10">
                  <div className="mono text-[10px] text-muted-foreground font-bold tracking-widest">
                    UPDATED {format(new Date(project.updatedAt), 'MMM d, yyyy').toUpperCase()}
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setLocation(`/projects/${project.id}/edit`); }}
                      className="nb-btn nb-btn-secondary !px-4 !py-2 !text-xs bg-[#F0E8D0]"
                    >
                      EDIT
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                      className="nb-btn !bg-[#FF3333] !text-white !border-[2px] !border-[#0C0C0C] !px-3 !py-2 !text-xs hover:!bg-[#CC0000]"
                      style={{ boxShadow: '3px 3px 0 #0C0C0C' }}
                    >
                      DEL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
