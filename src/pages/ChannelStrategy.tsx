import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, RefreshCw, Minimize2, ChevronRight, ArrowRight } from 'lucide-react';

interface ChannelStrategyProps {
  onNavigate?: (page: string) => void;
}

const principles = [
  {
    id: 1,
    icon: Layers,
    title: 'Core first',
    subtitle: '핵심부터 차근차근',
    description: '핵심 채널 우선 통합하고\n점진적으로 확대',
    note: '너무 적게 통합하면 시너지 없고,\n너무 과하면 난이도 증가',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    iconColor: 'text-blue-500',
    tag: '01',
  },
  {
    id: 2,
    icon: Zap,
    title: 'One & Only',
    subtitle: '하나만 남긴다',
    description: '통합 후 기존 채널\nFade out',
    note: '기존 채널 유지/병행 운영 시\n고객 혼란만 가중',
    color: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    iconColor: 'text-violet-500',
    tag: '02',
  },
  {
    id: 3,
    icon: RefreshCw,
    title: 'Re design',
    subtitle: '고객 경험 중심 재설계',
    description: '각 채널의 기능을 분해하여\n고객 경험 중심으로 재조합',
    note: '단순히 기능만 하나로 합치면\n진짜 통합이 아니다',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    iconColor: 'text-emerald-500',
    tag: '03',
  },
  {
    id: 4,
    icon: Minimize2,
    title: 'Stay slim',
    subtitle: '가볍고 날렵하게',
    description: '불필요한 기능을 제거하여\n통합 채널을 slim하게 유지',
    note: '통합 시 발생하는 복잡도를\n불필요한 기능 slim화로 대응',
    color: 'from-orange-400 to-rose-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    iconColor: 'text-orange-500',
    tag: '04',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ChannelStrategy: React.FC<ChannelStrategyProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/20 pb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-violet-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* Header */}
      <div className="relative px-5 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            Next 채널 To-Be 이미지
          </span>
          <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-2">
            하나로 완전히 통합된<br />
            <span className="text-blue-600">고객 경험</span>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            하나의 앱이 아닌, <strong className="text-slate-700">하나의 고객 경험</strong>을 목표로 통합 추진
          </p>
        </motion.div>
      </div>

      {/* Principle number pills */}
      <div className="px-5 mb-6">
        <motion.div
          className="flex items-center gap-2 text-xs text-slate-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span>통합 4대 원칙</span>
          <ChevronRight size={12} />
          <span className="text-blue-600 font-semibold">고객 조사 · 임직원 인터뷰 · 벤치마킹</span>
        </motion.div>
      </div>

      {/* Cards */}
      <motion.div
        className="px-5 flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              variants={cardVariants}
              className={`relative rounded-2xl border ${p.border} ${p.bg} overflow-hidden`}
            >
              {/* Gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.color}`} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-sm`}>
                    <Icon size={18} color="white" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">{p.tag}</span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-0.5">{p.title}</h2>
                <p className="text-xs text-slate-500 font-medium mb-3">{p.subtitle}</p>

                {/* Description box */}
                <div className="bg-white/70 rounded-xl p-3 mb-3 border border-white/80">
                  <p className="text-sm font-semibold text-slate-700 whitespace-pre-line leading-relaxed">{p.description}</p>
                </div>

                {/* Note / risk */}
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-bold text-slate-500">!</span>
                  </div>
                  <p className="text-xs text-slate-400 whitespace-pre-line leading-relaxed">{p.note}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        className="px-5 mt-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-5 text-white">
          <p className="text-xs font-semibold opacity-80 mb-1">도출 방법론</p>
          <p className="text-sm font-bold leading-relaxed mb-4">
            고객 조사 및 임직원 인터뷰,<br />벤치마킹을 통해 Next 채널 통합 원칙 도출
          </p>
          <button
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-4 py-2 text-sm font-semibold"
            onClick={() => onNavigate?.('home')}
          >
            자세히 보기
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChannelStrategy;
