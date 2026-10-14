(function(root){
'use strict';
const STAGES=['选题确认','脚本与拍摄方案','沟通确认','拍摄','剪辑审核','发布与数据','单条复盘','下一条策划'];
const id=()=>globalThis.crypto?.randomUUID?.()||'id-'+Date.now()+'-'+Math.random().toString(36).slice(2);
const iso=()=>new Date().toISOString();
const ago=(hours)=>new Date(Date.now()-hours*3600000).toISOString();
const metrics=(plays,completion,likes,comments,saves,shares,follows)=>({plays,completion,likes,comments,saves,shares,follows,window:24,source:'示例数据',collectedAt:ago(2)});
function project(creatorId,title,extra={}){return {id:id(),creatorId,title,angle:'记录真实生活里的小变化，让观众看到过程，而不仅是结果。',source:'手动策划',stage:0,createdAt:iso(),updatedAt:iso(),due:new Date(Date.now()+86400000*2).toISOString().slice(0,10),script:'',shootPlan:'',brand:'',brief:'',needs:[],shootStatus:'未开始',editStatus:'未开始',editResult:'',version:1,history:[],...extra};}
function seed(){
const creators=[
{id:'c1',name:'小满和妈妈',track:'亲子',owner:'我',status:'负责中',tag:'把日子过成成长日记',profile:'真实、温柔但不煽情。用孩子的视角讲述亲子日常，保留自然反应。',taboos:'不强迫孩子表演，不展示学校及住址。',color:'peach',initial:'满',history:[]},
{id:'c2',name:'阿野的生活切片',track:'生活 Vlog',owner:'我',status:'负责中',tag:'城市里，发现一点自由',profile:'幽默、松弛。记录下班后的城市探索与朋友互动。',taboos:'避免刻意摆拍和过度消费叙事。',color:'sage',initial:'野',history:[]},
{id:'c3',name:'一颗画画的桃',track:'绘画',owner:'我',status:'负责中',tag:'让灵感有形状',profile:'用画面讲故事，展示绘画过程、失败尝试与最终作品。',taboos:'不模仿在世画师的独特作品，不承诺速成。',color:'lilac',initial:'桃',history:[]},
{id:'c4',name:'林林慢慢来',track:'生活 Vlog',owner:'我',status:'负责中',tag:'认真生活，也允许留白',profile:'轻盈、细腻。关注租房改造、做饭和普通人的生活秩序。',taboos:'不制造焦虑，商业露出要自然且明确。',color:'blue',initial:'林',history:[]}
];
const p1=project('c1','让孩子决定，周末的 100 元怎么花',{id:'demo',demo:true,angle:'把预算的决定权交给孩子，记录真实取舍与亲子互动。',source:'示例灵感 · 亲子自主选择'});
const p2=project('c2','下班后，给自己一小时的旷野',{id:'p2',stage:4,script:'开场：关掉工作群，走进城市绿地。中段：记录三个微小发现。结尾：分享今天最放松的一刻。',shootPlan:'日落前 1 小时；手机、收音麦；远景、步行特写、自然对话。',shootStatus:'已完成',editStatus:'待审核',editResult:'V1 已提交：完成节奏调整和字幕校对，等待编导确认。',videoUrl:''});
const p3=project('c3','把秋天的颜色，画进一张明信片',{id:'p3',stage:3,script:'用一片落叶开始，记录取色、试色、作画到成品。',shootPlan:'自然窗光、俯拍机位；保留画错后的修改过程。',shootStatus:'拍摄中'});
const p4=project('c4','一个人的厨房，也值得认真对待',{id:'p4',stage:2,brand:'谷物日记',brief:'示例 Brief：展示早餐麦片的真实使用场景；露出包装与冲泡过程；不使用功效承诺。',script:'清晨整理台面，做一份简单早餐，记录真实使用体验。',shootPlan:'厨房自然光，早餐制作过程与产品特写。',needs:[{text:'确认厨房拍摄时间及产品到货',done:false},{text:'确认品牌必带画面与口播边界',done:true}]});
const past=[
project('c1','第一次，让孩子自己准备出游包',{id:'past1',stage:6,publishedAt:ago(48),platform:'抖音',metrics:metrics(28600,32,1150,86,220,96,105)}),
project('c1','放学路上，我们交换今天的小秘密',{id:'past2',stage:6,publishedAt:ago(96),platform:'抖音',metrics:metrics(22000,38,990,95,182,88,78)}),
project('c1','周末不赶路，一起去找秋天',{id:'past3',stage:7,publishedAt:ago(144),platform:'抖音',metrics:metrics(32400,40,1340,126,278,122,130),direction:{text:'保留真实互动，下一条用孩子做决定的场景作为开头；先观察前 5 秒留存，再判断效果。',by:'我',at:ago(120)},decisions:[]})
];
const topics=[
['h1','小小主理人：把选择权交给孩子','抖音','亲子',5,'topic','从日常决策切入，捕捉孩子意外的答案。'],
['h2','下班后的一小时，我想这样度过','小红书','生活 Vlog',18,'topic','用一个小时的生活切片，回应日常疲惫。'],
['h3','把秋天的色卡带回家','小红书','绘画',44,'topic','采集身边的颜色，转化为一张小作品。'],
['h4','不赶时间的周末计划','抖音','生活 Vlog',120,'topic','记录一段没有清单和目的地的周末。'],
['b1','秋日亲子出游装备清单','小红书','亲子',10,'business','适配户外、食品与亲子品牌；真实展示使用场景。'],
['b2','五分钟早餐的生活仪式感','抖音','生活 Vlog',38,'business','适配早餐、厨具与食品品牌；避免功效暗示。'],
['b3','一份送给朋友的手作礼物','小红书','绘画',140,'business','适配画材、文创与礼物品牌；以创作过程承载露出。']
].map(([id,title,platform,track,hours,kind,summary])=>({id,title,platform,track,kind,summary,publishedAt:ago(hours),collectedAt:iso(),source:'示例数据',url:'',heat:null}));
return {schemaVersion:1,creators,projects:[p1,p2,p3,p4,...past],hotspots:topics,favorites:[],searches:[],preferences:{reviewer:'我'},createdAt:iso()};
}
function assert(ok,msg){if(!ok)throw new Error(msg);}
function transition(p,action,payload={}){
const stages={confirmTopic:0,confirmScript:1,confirmCommunication:2,finishShoot:3,approveEdit:4,publish:5,confirmDirection:6};
assert(stages[action]===p.stage,'请先完成当前步骤，不能跳过审核。');
if(action==='confirmTopic')assert(p.title.trim()&&p.angle.trim(),'请填写选题标题与切入角度。');
if(action==='confirmScript')assert(p.script.trim()&&p.shootPlan.trim(),'请先保存脚本和拍摄方案。');
if(action==='confirmCommunication')assert((p.needs||[]).every(n=>n.done),'还有未确认的沟通事项。');
if(action==='finishShoot')assert(p.shootStatus==='已完成','请先将拍摄状态设为已完成。');
if(action==='approveEdit'){assert(p.editStatus==='待审核'&&p.editResult.trim(),'请先提交剪辑结果，再由编导审核。');p.editStatus='已通过';}
if(action==='publish'){
assert(p.platform&&p.publishedAt,'请填写发布平台与发布时间。');validateMetrics(p.metrics);
}
if(action==='confirmDirection'){
assert(p.review&&p.decisions?.length===p.review.suggestions.length,'请先生成复盘。');
assert(p.decisions.every(d=>['adopt','modify','reject'].includes(d.choice)),'请逐条采纳、修改或拒绝参考建议。');
assert(p.decisions.every(d=>d.choice!=='modify'||d.text.trim()),'修改后的建议不能为空。');
assert(payload.text?.trim()&&payload.by?.trim()&&payload.checked,'请填写最终方向与确认人，并亲自勾选确认。');
p.direction={text:payload.text.trim(),by:payload.by.trim(),at:iso()};
}
p.stage++;p.updatedAt=iso();p.history.push({action,at:iso(),by:payload.by||'我'});return p;
}
function validateMetrics(m){
assert(m,'请录入视频数据。');
for(const k of ['plays','likes','comments','saves','shares','follows'])assert(Number.isFinite(m[k])&&m[k]>=0&&Number.isInteger(m[k]),'播放与互动数据必须为非负整数。');
assert(m.plays>0,'播放量必须大于 0，才能进行有效复盘。');
assert(Number.isFinite(m.completion)&&m.completion>=0&&m.completion<=100,'完播率应在 0–100% 之间。');
assert([24,72,168].includes(Number(m.window)),'请选择有效的统计窗口。');
assert(m.source?.trim(),'请说明数据来源。');
assert(m.collectedAt&&!isNaN(Date.parse(m.collectedAt)),'请填写数据采集时间。');
}
const median=(a)=>{a=[...a].sort((a,b)=>a-b);return a.length%2?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2;};
function review(p,projects){
validateMetrics(p.metrics);const m=p.metrics;
const comparable=projects.filter(x=>x.id!==p.id&&x.creatorId===p.creatorId&&x.platform===p.platform&&Number(x.metrics?.window)===Number(m.window)&&x.metrics?.plays>0&&new Date(x.publishedAt)<new Date(p.publishedAt));
const base=comparable.length?{plays:median(comparable.map(x=>x.metrics.plays)),completion:median(comparable.map(x=>x.metrics.completion))}:null;
const rate=(m.likes+m.comments+m.saves+m.shares)/m.plays*100;
const suggestions=[
{id:'s1',title:'开场更早出现人物的选择',text:'下一条前 5 秒先呈现一个真实的选择或结果，再补充背景；记录 5 秒留存（如平台可提供）与完播率。',basis:base?`本条完播率 ${m.completion}%，同口径历史中位数 ${base.completion}%。`:`本条完播率 ${m.completion}%；当前缺少同口径历史样本。`},
{id:'s2',title:'把观众的回应变成内容线索',text:'下一条收集 3 条有代表性的评论，围绕一个真实问题设计情境；比较评论率，避免诱导互动。',basis:`本条 ${m.comments} 条评论，评论率 ${(m.comments/m.plays*100).toFixed(2)}%。尚未导入评论文本，不推断观众动机。`},
{id:'s3',title:'保留一个变量，做一次小验证',text:'保持人物、题材与大致时长一致，只调整开场方式；发布满相同统计窗口后，再比较完播率与收藏率。',basis:`本条收藏 ${m.saves} 次，收藏率 ${(m.saves/m.plays*100).toFixed(2)}%；单条视频不能证明因果。`}
];
return {generatedAt:iso(),mode:'规则模拟 · 未调用真实 AI',sampleIds:comparable.map(x=>x.id),base,interactionRate:rate,snapshot:JSON.parse(JSON.stringify(m)),suggestions,summary:base?`播放量较 ${comparable.length} 条同达人、同平台、同统计窗口的既往视频中位数${m.plays>=base.plays?'高':'低'} ${Math.abs((m.plays/base.plays-1)*100).toFixed(1)}%；完播率相差 ${(m.completion-base.completion).toFixed(1)} 个百分点。`: '暂无同达人、同平台、同统计窗口的既往视频，先建立基线，再判断变化。'};
}
function nextProject(p){assert(p.stage===7&&p.direction?.text,'只有编导确认最终方向后，才能创建下一条。');assert(!p.nextId,'该方向已经关联下一条策划。');const n=project(p.creatorId,'下一条 · '+p.title,{angle:p.direction.text,source:'已确认复盘方向',parentId:p.id});p.nextId=n.id;return n;}
function mockScript(p,c){return {script:`【选题】${p.title}\n【达人表达】${c.profile}\n\n开场 0–5 秒｜让一个真实动作或选择先发生。\n画面：${p.angle}\n口播草稿：“今天我想试试，把这件小事换一种方式。”\n\n展开 5–35 秒｜记录过程中的两个具体变化。\n保留自然对话、犹豫与意外；不要预设人物反应。\n\n收束 35–60 秒｜用行动或真实感受结束。\n口播草稿：“原来，这就是今天最值得记住的瞬间。”\n\n${p.brand?'商业内容：根据 '+p.brand+' Brief 核对必带信息，明确商业标识。':'非商单内容：优先保证人物与生活场景的真实性。'}\n内容边界：${c.taboos||'拍摄前与达人确认。'}`,shootPlan:`地点：与达人共同确认的真实生活场景。\n设备：手机 / 相机、领夹麦、备用电池。\n镜头：环境全景 → 关键动作特写 → 自然互动 → 结果。\n拍摄前：确认人物意愿、场地许可与隐私边界。\n收音：保留环境音，对话单独收音。\n补拍：空镜、手部动作、关键结果；不补演虚假反应。`};}
function validateImport(s){
assert(s&&s.schemaVersion===1&&Array.isArray(s.creators)&&Array.isArray(s.projects)&&Array.isArray(s.hotspots)&&Array.isArray(s.favorites)&&Array.isArray(s.searches)&&s.preferences&&typeof s.preferences.reviewer==='string','备份格式不正确。');
const validId=x=>typeof x==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(x);
assert(s.creators.length<=1000&&s.projects.length<=20000&&s.hotspots.length<=20000,'备份记录数量超出当前原型容量。');
const ids=new Set(); for(const c of s.creators){assert(validId(c.id)&&!ids.has(c.id)&&typeof c.name==='string'&&typeof c.profile==='string'&&typeof c.track==='string'&&typeof c.taboos==='string'&&typeof c.owner==='string'&&['负责中','暂停','已移交','已归档'].includes(c.status)&&Array.isArray(c.history),'达人记录格式不正确。');ids.add(c.id);}
const pids=new Set();for(const p of s.projects){assert(validId(p.id)&&!pids.has(p.id)&&ids.has(p.creatorId)&&Number.isInteger(p.stage)&&p.stage>=0&&p.stage<=7&&['title','angle','script','shootPlan','editStatus','editResult','brand','brief','shootStatus'].every(k=>typeof p[k]==='string')&&Array.isArray(p.needs)&&p.needs.every(n=>typeof n.text==='string'&&typeof n.done==='boolean')&&Array.isArray(p.history),'视频记录格式不正确。');if(root.JimuEvidence)root.JimuEvidence.validateProject(p);if(p.videoAnalysis&&root.JimuAnalysis)root.JimuAnalysis.validate(p.videoAnalysis);if(p.analysisReport)assert(typeof p.analysisReport.signature==='string'&&typeof p.analysisReport.mode==='string'&&typeof p.analysisReport.evidenceSource==='string'&&Array.isArray(p.analysisReport.findings)&&p.analysisReport.findings.every(f=>['title','evidence','interpretation'].every(k=>typeof f[k]==='string'))&&Array.isArray(p.analysisReport.missing)&&Array.isArray(p.analysisReport.suggestions)&&p.analysisReport.suggestions.length===3&&p.analysisReport.suggestions.every(s=>['title','text','basis'].every(k=>typeof s[k]==='string'))&&p.analysisReport.extra&&(!p.analysisReport.data||Array.isArray(p.analysisReport.data.sampleIds)),'视频分析报告格式不正确。');if(p.stage>=6)validateMetrics(p.metrics);if(p.stage===7)assert(p.direction&&typeof p.direction.text==='string'&&typeof p.direction.by==='string','已完成项目缺少确认方向。');if(p.review)assert(Array.isArray(p.review.suggestions)&&p.review.suggestions.length===3&&Array.isArray(p.review.sampleIds),'复盘记录格式不正确。');if(p.decisions)assert(Array.isArray(p.decisions)&&p.decisions.every(d=>typeof d.text==='string'&&typeof d.choice==='string'),'建议决策格式不正确。');for(const k of ['createdAt','updatedAt','due','publishedAt'])if(p[k])assert(!isNaN(Date.parse(p[k])),'视频日期格式不正确。');if(p.parentId)assert(validId(p.parentId),'来源项目编号不正确。');if(p.nextId)assert(validId(p.nextId),'下一条项目编号不正确。');pids.add(p.id);}
for(const h of s.hotspots)assert(validId(h.id)&&!isNaN(Date.parse(h.publishedAt))&&!isNaN(Date.parse(h.collectedAt))&&['title','platform','track','kind','summary','source','publishedAt','collectedAt'].every(k=>typeof h[k]==='string')&&['topic','business'].includes(h.kind),'热点记录格式不正确。');
assert(s.favorites.every(validId),'收藏格式不正确。');for(const q of s.searches)assert(q&&typeof q.platform==='string'&&typeof q.keyword==='string'&&typeof q.track==='string'&&['1','3','7','all'].includes(String(q.days)),'搜索历史格式不正确。');
return s;
}
const api={STAGES,id,iso,ago,project,seed,transition,validateMetrics,review,nextProject,mockScript,validateImport};root.Jimu=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
