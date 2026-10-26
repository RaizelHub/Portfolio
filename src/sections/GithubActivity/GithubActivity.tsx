import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { profile } from "../../data/profile";
interface Day { date: string; count: number; level: number }
function parseDays(value: unknown): Day[] {
  const days = (value as {contributions?: unknown})?.contributions;
  if (!Array.isArray(days) || !days.length) throw new Error("No activity returned");
  if (!days.every(d => typeof d.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d.date) && Number.isFinite(Date.parse(d.date)) && Number.isInteger(d.count) && d.count >= 0 && Number.isInteger(d.level) && d.level >= 0 && d.level <= 4)) throw new Error('Invalid activity data');
  return [...days].sort((a,b)=>a.date.localeCompare(b.date));
}
export function GithubActivity() {
  const [days,setDays] = useState<Day[]>([]);
  const [state,setState] = useState<'loading'|'ready'|'error'>('loading');
  const [attempt,setAttempt] = useState(0);
  useEffect(()=>{
    const controller = new AbortController(); let active = true;
    const timeout = window.setTimeout(()=>controller.abort(),12000);
    setState('loading');
    fetch('https://github-contributions-api.jogruber.de/v4/RaizelHub?y=last',{signal:controller.signal})
      .then(response=>{if(!response.ok)throw new Error('Activity unavailable');return response.json();})
      .then(json=>{const result=parseDays(json);if(active){setDays(result);setState('ready');}})
      .catch(()=>{if(active)setState('error');})
      .finally(()=>clearTimeout(timeout));
    return ()=>{active=false;clearTimeout(timeout);controller.abort();};
  },[attempt]);
  const start = days.length ? new Date(days[0].date+'T00:00:00Z') : null;
  const offset = start?.getUTCDay() ?? 0;
  const positioned = days.map(day=>({...day,index: Math.round((Date.parse(day.date+'T00:00:00Z')-(start?.getTime() ?? 0))/86400000)+offset}));
  const columns = positioned.length ? Math.ceil((positioned[positioned.length-1].index+1)/7) : 53;
  const total = days.reduce((sum,day)=>sum+day.count,0);
  const months = positioned.filter((day,i)=>i===0 || day.date.slice(0,7)!==days[i-1].date.slice(0,7));
  return <section id="github-activity" className="section" aria-labelledby="github-activity-title">
    <div className="section-heading-row"><div><p className="eyebrow">Beyond the case studies</p><h2 id="github-activity-title">GitHub activity</h2></div><a className="text-link" href={profile.githubUrl} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true"/>@RaizelHub ↗</a></div>
    <div className="panel github-activity-panel" aria-busy={state==='loading'}>
      {state==='loading' && <p className="activity-message" role="status">Loading contribution activity…</p>}
      {state==='error' && <div className="activity-message" role="status"><p>Contribution activity is unavailable right now. You can still view it on GitHub.</p><button className="button" onClick={()=>setAttempt(a=>a+1)}>Try again</button></div>}
      {state==='ready' && <><div className="activity-summary"><p><strong>{total.toLocaleString()} contributions</strong> in the displayed period</p><span>{days[0].date} — {days[days.length-1].date}</span></div>
        <div className="activity-scroll" tabIndex={0} role="region" aria-label="GitHub contribution calendar; scroll horizontally on smaller screens">
          <svg className="activity-calendar" width={columns*14+34} height="130" role="img" aria-label={`GitHub contribution calendar: ${total} contributions from ${days[0].date} to ${days[days.length-1].date}. Exact counts are available in daily activity below.`}>
            {months.filter((m,i)=>i===0 || Math.floor(m.index/7)-Math.floor(months[i-1].index/7)>2).map(m=><text key={m.date} x={Math.floor(m.index/7)*14+32} y="13">{new Date(m.date+'T00:00:00Z').toLocaleDateString('en-US',{month:'short',timeZone:'UTC'})}</text>)}
            {[['Mon',1],['Wed',3],['Fri',5]].map(([label,row])=><text key={label} x="0" y={Number(row)*14+35}>{label}</text>)}
            {positioned.map(day=><rect key={day.date} className={`contribution-cell level-${day.level}`} x={Math.floor(day.index/7)*14+32} y={day.index%7*14+25} width="11" height="11" rx="2"><title>{day.count} contributions on {day.date}</title></rect>)}
          </svg>
        </div>
        <div className="activity-caption"><span>Contribution counts, not only commits.</span><div className="activity-legend" aria-label="Shading indicates fewer to more contributions"><span>Less</span>{[0,1,2,3,4].map(level=><span key={level} className={`contribution-cell level-${level}`} aria-hidden="true"/>)}<span>More</span></div></div>
        <details className="activity-details"><summary>View daily activity</summary><div className="activity-table-scroll" tabIndex={0} role="region" aria-label="Daily contribution counts"><table><caption>Contributions by date, newest first</caption><thead><tr><th scope="col">Date</th><th scope="col">Contributions</th></tr></thead><tbody>{[...days].reverse().map(day=><tr key={day.date}><th scope="row">{day.date}</th><td>{day.count}</td></tr>)}</tbody></table></div></details>
      </>}
      <p className="activity-source">Data via <a href="https://github-contributions-api.jogruber.de" target="_blank" rel="noreferrer">GitHub Contributions API ↗</a>. Updates may be delayed.</p>
    </div>
  </section>;
}
