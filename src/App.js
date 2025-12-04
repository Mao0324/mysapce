import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Save, Edit3, Github, Globe, Database, BookOpen, Cpu, Lock, LogOut, Code, Download, ExternalLink, Trash2, Plus, Image as ImageIcon, Server, Wifi } from 'lucide-react';

// --- 初始默认数据 (Initial Data) ---
const INITIAL_DATA = {
  profile: {
    name: "MAOCONG",
    title: "FULL STACK OPERATIVE",
    bio: "PROTOCOL: INITIATED. | 探索数字边界 | AI & WEB3 ARCHITECT",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Maocong&backgroundColor=000000", 
    github: "https://github.com",
    email: "hi@maocong.me"
  },
  links: [
    { id: 1, name: "BLOG_NEXUS", url: "https://blog.maocong.me", desc: "Mind Fragments & Logs", icon: "book" },
    { id: 2, name: "ALIST_DRIVE", url: "https://alist.maocong.me", desc: "Classified Data Warehouse", icon: "db" },
  ],
  papers: [
    { id: 1, title: "Distributed Consensus in High-Latency Networks", year: "2024", journal: "IEEE Access", link: "#" },
    { id: 2, title: "Optimizing Neural Rendering for Web", year: "2023", journal: "SIGGRAPH Asia", link: "#" }
  ]
};

// --- Modern Tech Background Component ---
// 现代极客风：十字网格 + 鼠标雷达 + 数据流游走
const TechGridBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // 配置
    const gridSize = 50; // 网格大小
    const dotSize = 2;   // 十字准星大小
    const hoverRadius = 150; // 鼠标影响范围
    
    // 随机游走的数据点
    const agents = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 1,
    }));

    const draw = () => {
      // 每一帧清空画布（使用半透明黑色制造拖影效果，或者全黑保持干净）
      // 现代风格通常喜欢干净，所以我们用全黑重绘，或者极低透明度保留一点点轨迹
      ctx.fillStyle = '#050505'; 
      ctx.fillRect(0, 0, width, height);
      
      // 1. 绘制基础网格 (十字准星)
      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          // 计算当前点与鼠标的距离
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // 基础颜色 (非常暗的灰色)
          let alpha = 0.1; 
          let scale = 1;

          // 鼠标交互：距离越近越亮，尺寸越大
          if (dist < hoverRadius) {
            const intensity = 1 - dist / hoverRadius;
            alpha += intensity * 0.8; // 最高亮度
            scale += intensity * 1.5; // 最大放大
            ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`; // 激活色：绿色
          } else {
             ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; // 默认色：微弱白灰
          }

          // 绘制十字
          const size = dotSize * scale;
          ctx.fillRect(x - size/2, y - 0.5, size, 1); // 横
          ctx.fillRect(x - 0.5, y - size/2, 1, size); // 竖
        }
      }

      // 2. 绘制游走的数据粒子
      ctx.fillStyle = '#22c55e'; // Green-500
      agents.forEach(agent => {
        // 更新位置
        agent.x += agent.vx;
        agent.y += agent.vy;

        // 边界反弹
        if (agent.x < 0 || agent.x > width) agent.vx *= -1;
        if (agent.y < 0 || agent.y > height) agent.vy *= -1;

        // 绘制粒子
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // 绘制粒子与附近网格点的连线 (科技感连线)
        // 找到最近的网格点
        const gridX = Math.round(agent.x / gridSize) * gridSize;
        const gridY = Math.round(agent.y / gridSize) * gridSize;
        
        // 如果距离够近，画线
        const dx = gridX - agent.x;
        const dy = gridY - agent.y;
        if (Math.abs(dx) < gridSize && Math.abs(dy) < gridSize) {
             ctx.strokeStyle = 'rgba(34, 197, 94, 0.2)';
             ctx.lineWidth = 1;
             ctx.beginPath();
             ctx.moveTo(agent.x, agent.y);
             ctx.lineTo(gridX, gridY);
             ctx.stroke();
        }
      });
      
      requestAnimationFrame(draw);
    };

    let animationFrameId = requestAnimationFrame(draw);

    // 事件监听
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-[#050505]" />;
};

// --- 图标映射 ---
const availableIcons = [
  { key: 'globe', label: 'Globe', component: Globe },
  { key: 'book', label: 'Book', component: BookOpen },
  { key: 'db', label: 'Database', component: Database },
  { key: 'code', label: 'Code', component: Code },
  { key: 'server', label: 'Server', component: Server },
  { key: 'wifi', label: 'Wifi', component: Wifi },
];

const IconMap = ({ name, className }) => {
  const IconComponent = availableIcons.find(i => i.key === name)?.component || Globe;
  return <IconComponent className={className} />;
};

export default function App() {
  // --- 状态管理 ---
  const [data, setData] = useState(INITIAL_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // 初始化加载
  useEffect(() => {
    const savedData = localStorage.getItem('maocong_config_v2');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // --- 逻辑处理 ---
  const saveToStorage = (newData) => {
    setData(newData);
    localStorage.setItem('maocong_config_v2', JSON.stringify(newData));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "maocong2025") {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword("");
    } else {
      alert("ACCESS DENIED // 密码错误");
    }
  };

  const handleUpdate = (section, field, value) => {
    const newData = { ...data, [section]: { ...data[section], [field]: value } };
    saveToStorage(newData);
  };

  // 数组项更新（通用）
  const handleArrayUpdate = (section, id, field, value) => {
    const newArray = data[section].map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    const newData = { ...data, [section]: newArray };
    saveToStorage(newData);
  };

  // 删除数组项
  const handleDeleteItem = (section, id) => {
    if(!window.confirm("CONFIRM DELETION?")) return;
    const newArray = data[section].filter(item => item.id !== id);
    const newData = { ...data, [section]: newArray };
    saveToStorage(newData);
  };

  // 添加导航链接
  const handleAddLink = () => {
    const newLink = {
      id: Date.now(),
      name: "NEW_NODE",
      url: "https://",
      desc: "System Node Description",
      icon: "globe"
    };
    const newData = { ...data, links: [...data.links, newLink] };
    saveToStorage(newData);
  };

  // 添加论文
  const handleAddPaper = () => {
    const newPaper = { id: Date.now(), title: "New Protocol Research", year: "2025", journal: "DRAFT_MODE", link: "#" };
    const newData = { ...data, papers: [...data.papers, newPaper] };
    saveToStorage(newData);
  };

  const exportConfig = () => {
    const configStr = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(configStr);
    alert("CONFIG DUMPED TO CLIPBOARD.\nPaste into INITIAL_DATA in source code.");
  };

  // --- 渲染部分 ---

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#0F0] flex flex-col items-center justify-center font-mono p-4 z-50">
        <div className="w-full max-w-lg border border-[#0F0]/30 p-8 bg-black/50 backdrop-blur relative">
          <div className="absolute top-0 left-0 w-2 h-2 bg-[#0F0]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#0F0]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#0F0]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#0F0]"></div>
          <p className="typing-effect mb-2 text-xl font-bold text-white tracking-widest">INITIALIZING KERNEL...</p>
          <div className="w-full bg-[#111] h-1 mt-4 mb-2 overflow-hidden">
             <div className="h-full bg-[#0F0] animate-progress"></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 font-mono uppercase">
             <span>Loading Assets</span>
             <span>100%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#a8bebb] font-mono relative overflow-x-hidden selection:bg-[#0F0] selection:text-black">
      
      {/* 1. 背景层：现代交互式网格 */}
      <TechGridBackground />
      
      {/* 仅保留暗角 (Vignette) 增加深邃感，去掉了复古的 CRT 扫描线 */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)]"></div>

      {/* 2. 顶部 HUD 导航 */}
      <nav className="relative z-20 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-widest group cursor-default">
            <Terminal size={20} className="text-[#0F0]" />
            <span>MAOCONG.ME</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex text-[10px] text-gray-500 gap-4 uppercase tracking-widest">
              <span>SYS: ONLINE</span>
              <span>NET: ENCRYPTED</span>
            </div>
            
            <div className="h-4 w-px bg-white/10"></div>

            {isAdmin ? (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
                <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-1 tracking-widest">ADMIN</span>
                <button onClick={exportConfig} className="p-2 text-[#0F0] hover:bg-[#0F0]/10 rounded transition" title="DUMP CONFIG">
                  <Download size={18} />
                </button>
                <button onClick={() => setIsAdmin(false)} className="p-2 text-gray-400 hover:text-white transition" title="LOGOUT">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className="p-2 text-gray-500 hover:text-white transition hover:scale-110">
                <Lock size={16} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-16 space-y-24">
        
        {/* 3. Hero Section (现代 HUD 风格) */}
        <section className="relative">
          {/* 左侧装饰线 */}
          <div className="absolute -left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#0F0]/20 to-transparent hidden md:block"></div>

          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* 头像区域 - 增加悬停辉光 */}
            <div className="relative group md:order-2 flex justify-center md:justify-end">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* 旋转的光环 */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#0F0]/30 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border border-dotted border-white/10 animate-[spin_15s_linear_infinite_reverse]"></div>
                
                {/* 核心头像 */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-[#0F0]/50 bg-black/50 backdrop-blur group-hover:border-[#0F0] transition-colors duration-500">
                    <img src={data.profile.avatar} alt="Avatar" className="w-full h-full object-cover filter brightness-90 contrast-125 group-hover:brightness-100 transition duration-500" />
                    
                    {isAdmin && (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon className="text-[#0F0] mb-2" />
                        <input 
                          type="text" 
                          value={data.profile.avatar}
                          onChange={(e) => handleUpdate('profile', 'avatar', e.target.value)}
                          className="w-full bg-transparent border-b border-[#0F0] text-xs text-[#0F0] focus:outline-none text-center"
                          placeholder="Paste Image URL"
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* 文字信息区域 */}
            <div className="col-span-2 space-y-6 md:order-1">
              <div>
                 {isAdmin ? (
                  <div className="space-y-4 p-6 border border-[#0F0]/30 bg-[#0F0]/5 backdrop-blur relative rounded-lg">
                    <span className="absolute top-0 right-0 bg-[#0F0] text-black text-[10px] px-2 font-bold rounded-bl">EDITING</span>
                    <input 
                      value={data.profile.name} 
                      onChange={(e) => handleUpdate('profile', 'name', e.target.value)}
                      className="w-full bg-transparent border-b border-[#333] p-2 text-3xl font-bold text-white focus:border-[#0F0] outline-none" 
                    />
                    <input 
                      value={data.profile.title} 
                      onChange={(e) => handleUpdate('profile', 'title', e.target.value)}
                      className="w-full bg-transparent border-b border-[#333] p-2 text-xl text-[#0F0] focus:border-[#0F0] outline-none" 
                    />
                    <textarea 
                      value={data.profile.bio} 
                      onChange={(e) => handleUpdate('profile', 'bio', e.target.value)}
                      className="w-full bg-transparent border-b border-[#333] p-2 h-24 text-gray-400 focus:border-[#0F0] outline-none font-mono text-sm" 
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-4">
                      {data.profile.name}
                      <span className="text-[#0F0] text-6xl">.</span>
                    </h1>
                    <div className="inline-block px-3 py-1 mb-6 border border-[#0F0]/30 rounded-full bg-[#0F0]/5 text-[#0F0] text-xs tracking-widest font-bold">
                      {data.profile.title}
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl font-light">
                      {data.profile.bio}
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href={data.profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-[#0F0] hover:text-black hover:border-[#0F0] transition-all duration-300 rounded">
                    <Github size={18} />
                    <span className="font-bold text-sm tracking-wider">GITHUB</span>
                </a>
                <a href={`mailto:${data.profile.email}`} className="flex items-center gap-2 px-6 py-3 border border-white/10 text-gray-400 hover:text-white hover:border-white transition-all duration-300 rounded">
                    <span className="text-sm tracking-wider">EMAIL ME</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Navigation Matrix (Glassmorphism + Tech) */}
        <section className="relative">
          <div className="flex items-center justify-between mb-12">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0F0]/10 rounded-lg">
                   <Cpu className="text-[#0F0]" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-wide">NAVIGATION HUB</h2>
             </div>
             <div className="hidden md:block h-px w-32 bg-gradient-to-r from-transparent to-[#0F0]/50"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.links.map(link => (
              <div 
                key={link.id} 
                className={`relative group bg-[#0a0a0a]/80 backdrop-blur-sm border ${isAdmin ? 'border-yellow-500/50' : 'border-white/5'} hover:border-[#0F0]/50 transition-all duration-500 rounded-xl overflow-hidden`}
              >
                {/* 悬停时的光效背景 */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F0]/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {isAdmin ? (
                  // Admin Mode
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-xs text-yellow-500 font-bold uppercase">Node Config</span>
                       <button onClick={() => handleDeleteItem('links', link.id)} className="text-red-400 hover:text-red-300 transition">
                         <Trash2 size={16} />
                       </button>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-1/3">
                          <select 
                            value={link.icon} 
                            onChange={(e) => handleArrayUpdate('links', link.id, 'icon', e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded p-2 text-xs text-white focus:border-[#0F0] outline-none"
                          >
                            {availableIcons.map(icon => (
                              <option key={icon.key} value={icon.key}>{icon.label}</option>
                            ))}
                          </select>
                       </div>
                       <div className="w-2/3">
                          <input 
                            value={link.name}
                            onChange={(e) => handleArrayUpdate('links', link.id, 'name', e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm font-bold focus:border-[#0F0] outline-none"
                          />
                       </div>
                    </div>
                    <input 
                        value={link.url}
                        onChange={(e) => handleArrayUpdate('links', link.id, 'url', e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded p-2 text-[#0F0] text-xs font-mono focus:border-[#0F0] outline-none"
                    />
                     <input 
                        value={link.desc}
                        onChange={(e) => handleArrayUpdate('links', link.id, 'desc', e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded p-2 text-gray-400 text-xs focus:border-[#0F0] outline-none"
                    />
                  </div>
                ) : (
                  // View Mode
                  <a href={link.url} target="_blank" rel="noreferrer" className="block p-8 relative z-10 h-full flex flex-col justify-between">
                     <div>
                       <div className="flex justify-between items-start mb-4">
                          <div className="p-3 bg-white/5 rounded-lg group-hover:bg-[#0F0] group-hover:text-black transition duration-300">
                             <IconMap name={link.icon} className="w-6 h-6" />
                          </div>
                          <ExternalLink size={16} className="text-gray-600 group-hover:text-[#0F0] transition" />
                       </div>
                       
                       <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#0F0] transition-colors">
                         {link.name}
                       </h3>
                       <p className="text-gray-400 text-sm leading-relaxed">
                         {link.desc}
                       </p>
                     </div>
                     <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-600 font-mono">
                        <span>{new URL(link.url).hostname}</span>
                        <span className="group-hover:translate-x-1 transition duration-300">➜</span>
                     </div>
                  </a>
                )}
              </div>
            ))}
            
            {isAdmin && (
              <button 
                onClick={handleAddLink}
                className="flex flex-col items-center justify-center p-8 border border-dashed border-white/20 rounded-xl text-gray-500 hover:border-[#0F0] hover:text-[#0F0] hover:bg-[#0F0]/5 transition-all min-h-[200px]"
              >
                <Plus size={32} className="mb-2" />
                <span className="font-bold text-xs tracking-widest uppercase">Add Node</span>
              </button>
            )}
          </div>
        </section>

        {/* 5. Research Logs (Clean List) */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-bold text-white">Latest Research</h2>
          </div>

          <div className="border-t border-white/10">
            {data.papers.map(paper => (
              <div key={paper.id} className="group relative border-b border-white/10 transition hover:bg-white/5">
                {isAdmin ? (
                   <div className="flex flex-col md:flex-row gap-4 p-4 items-center">
                     <input 
                       value={paper.year}
                       onChange={(e) => handleArrayUpdate('papers', paper.id, 'year', e.target.value)}
                       className="w-20 bg-black/50 text-blue-400 text-sm p-2 border border-white/10 rounded" 
                     />
                     <input 
                         value={paper.title}
                         onChange={(e) => handleArrayUpdate('papers', paper.id, 'title', e.target.value)}
                         className="flex-1 bg-black/50 text-white text-sm p-2 border border-white/10 rounded" 
                       />
                      <input 
                       value={paper.journal}
                       onChange={(e) => handleArrayUpdate('papers', paper.id, 'journal', e.target.value)}
                       className="w-32 bg-black/50 text-gray-400 text-sm p-2 text-right border border-white/10 rounded" 
                     />
                      <button onClick={() => handleDeleteItem('papers', paper.id)} className="text-red-400 p-2 hover:bg-red-500/10 rounded">
                         <Trash2 size={16} />
                       </button>
                   </div>
                ) : (
                  <a href={paper.link} className="flex flex-col md:flex-row md:items-center py-6 px-2 gap-4">
                    <div className="md:w-24 text-sm font-mono text-blue-500 opacity-70 group-hover:opacity-100">
                      {paper.year}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                        {paper.title}
                      </h4>
                    </div>
                    <div className="md:text-right text-xs text-gray-500 font-mono border border-white/10 px-2 py-1 rounded">
                      {paper.journal}
                    </div>
                  </a>
                )}
              </div>
            ))}

            {isAdmin && (
               <button onClick={handleAddPaper} className="w-full py-4 mt-4 border border-dashed border-white/10 text-xs text-gray-500 hover:text-white hover:border-white/30 transition rounded-lg">
                 + Add Research Entry
               </button>
            )}
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 py-12 text-center bg-black">
         <div className="text-xs text-gray-600 font-mono space-y-2">
           <p className="tracking-widest">MAOCONG.ME SYSTEM</p>
           <p>© 2025 • SECURE CONNECTION</p>
         </div>
      </footer>

      {/* Login Modal (Modern Glass) */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 w-full max-w-sm rounded-2xl shadow-2xl shadow-green-900/20">
             <div className="flex flex-col items-center mb-6">
                <div className="p-3 bg-[#0F0]/10 rounded-full mb-4 text-[#0F0]">
                  <Shield size={24} />
                </div>
                <h3 className="text-lg text-white font-bold tracking-wide">SYSTEM ACCESS</h3>
             </div>
             
             <form onSubmit={handleLogin} className="space-y-4">
               <div>
                 <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded-lg focus:border-[#0F0] focus:ring-1 focus:ring-[#0F0] outline-none font-mono text-center tracking-widest transition-all"
                    placeholder="ENTER PASSCODE"
                    autoFocus
                 />
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <button type="button" onClick={() => setShowLogin(false)} className="py-3 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition text-xs font-bold">
                   CANCEL
                 </button>
                 <button type="submit" className="py-3 bg-[#0F0] rounded-lg text-black font-bold text-xs hover:bg-[#0F0]/90 transition shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                   UNLOCK
                 </button>
               </div>
             </form>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes progress {
          0% { width: 0% }
          100% { width: 100% }
        }
        .animate-progress {
          animation: progress 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}