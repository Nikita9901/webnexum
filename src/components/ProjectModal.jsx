import React from 'react';

// Fallback placeholder image (SVG gradient) matching Portfolio component
const placeholderImg = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0ea5e9"/>
        <stop offset="1" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="675" fill="url(#g)"/>
  </svg>
`);

export function ProjectModal({ project, onClose, t }) {
    if (!project) return null;

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-[var(--card)] rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Project Image */}
                <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[var(--bg)] to-[var(--surface-muted)] flex items-center justify-center overflow-hidden">
                    {/* Close Button - positioned absolutely over image */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black/20"
                        aria-label={t.portfolio.close}
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img 
                        src={project.img || placeholderImg} 
                        alt={`${project.title || 'Project'} - пример работы веб-студии WebNexum в Минске`} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Project Content */}
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-2">
                            {project.title}
                        </h2>
                        <p className="text-lg text-[var(--muted)]">
                            {project.desc}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span 
                                    key={tag} 
                                    className="px-3 py-1 bg-[var(--bg)] rounded-full text-sm text-[var(--muted)]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Problem Section */}
                            <div className="mb-6 pb-6 border-b border-[var(--bg)]">
                                <h3 className="text-xl font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
                                    <span className="text-[var(--accent)]">📋</span>
                                    {t.portfolio.problem}
                                </h3>
                                <p className="text-[var(--muted)] leading-relaxed">
                                    {project.problem}
                                </p>
                            </div>

                            {/* What We Did Section */}
                            <div>
                                <h3 className="text-xl font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                                    <span className="text-[var(--accent)]">⚙️</span>
                                    {t.portfolio.whatWeDid}
                                </h3>
                                <ul className="space-y-3">
                                    {project.whatWeDid.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span className="text-[var(--muted)] leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                </div>
            </div>
        </div>
    );
}

