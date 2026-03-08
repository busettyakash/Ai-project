import './DashboardPreview.css'
import Logo from './Logo'

export default function DashboardPreview() {
    return (
        <div className="dash">
            {/* Sidebar */}
            <aside className="dash-side">
                <div className="dash-side-logo">
                    <Logo size={28} />
                </div>
                <nav className="dash-side-nav">
                    <a className="active" title="Dashboard">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                    </a>
                    <a title="Analytics">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
                    </a>
                    <a title="Contacts">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </a>
                    <a title="Deals">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M16 8l-8 8M8 8h8v8" /></svg>
                    </a>
                    <a title="Settings">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                    </a>
                </nav>
            </aside>

            {/* Main content */}
            <main className="dash-main">
                {/* Top bar */}
                <header className="dash-topbar">
                    <div className="dash-search">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        <span>Search deals, contacts...</span>
                    </div>
                    <div className="dash-topbar-right">
                        <div className="dash-notif">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                            <span className="notif-dot" />
                        </div>
                        <div className="dash-avatar">AK</div>
                    </div>
                </header>

                {/* Stat cards */}
                <div className="dash-stats">
                    <div className="dash-stat-card">
                        <span className="stat-label">Total Revenue</span>
                        <div className="stat-main">
                            <strong>$124,500</strong>
                            <span className="stat-badge up">↑ 12%</span>
                        </div>
                        <span className="stat-sub">vs last month</span>
                    </div>
                    <div className="dash-stat-card">
                        <span className="stat-label">Active Deals</span>
                        <div className="stat-main">
                            <strong>1,284</strong>
                            <span className="stat-badge up">↑ 8%</span>
                        </div>
                        <span className="stat-sub">120 new this week</span>
                    </div>
                    <div className="dash-stat-card">
                        <span className="stat-label">Conversion Rate</span>
                        <div className="stat-main">
                            <strong>24.8%</strong>
                            <span className="stat-badge up">↑ 3.2%</span>
                        </div>
                        <span className="stat-sub">above average</span>
                    </div>
                    <div className="dash-stat-card">
                        <span className="stat-label">Active Customers</span>
                        <div className="stat-main">
                            <strong>856</strong>
                            <span className="stat-badge neutral">→ 0%</span>
                        </div>
                        <span className="stat-sub">45 new this month</span>
                    </div>
                </div>

                {/* Chart area */}
                <div className="dash-chart-area">
                    <div className="dash-chart-header">
                        <div>
                            <h3>Revenue Growth</h3>
                            <span>Last 6 months</span>
                        </div>
                        <div className="chart-tabs">
                            <button className="active">Monthly</button>
                            <button>Weekly</button>
                        </div>
                    </div>
                    <div className="dash-chart">
                        <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="chart-svg">
                            {/* Grid lines */}
                            <line x1="0" y1="32" x2="600" y2="32" stroke="#F1F5F9" strokeWidth="1" />
                            <line x1="0" y1="64" x2="600" y2="64" stroke="#F1F5F9" strokeWidth="1" />
                            <line x1="0" y1="96" x2="600" y2="96" stroke="#F1F5F9" strokeWidth="1" />
                            <line x1="0" y1="128" x2="600" y2="128" stroke="#F1F5F9" strokeWidth="1" />

                            {/* Area fill */}
                            <defs>
                                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.01" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,130 C40,125 80,115 120,105 C160,95 200,80 240,72 C280,64 320,55 360,42 C400,38 440,46 480,35 C520,24 560,12 600,8 L600,160 L0,160 Z"
                                fill="url(#areaGrad)"
                            />
                            {/* Line */}
                            <path
                                d="M0,130 C40,125 80,115 120,105 C160,95 200,80 240,72 C280,64 320,55 360,42 C400,38 440,46 480,35 C520,24 560,12 600,8"
                                fill="none"
                                stroke="#4F46E5"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            {/* Data points */}
                            <circle cx="0" cy="130" r="3.5" fill="#4F46E5" stroke="#fff" strokeWidth="2" />
                            <circle cx="120" cy="105" r="3.5" fill="#4F46E5" stroke="#fff" strokeWidth="2" />
                            <circle cx="240" cy="72" r="3.5" fill="#4F46E5" stroke="#fff" strokeWidth="2" />
                            <circle cx="360" cy="42" r="3.5" fill="#4F46E5" stroke="#fff" strokeWidth="2" />
                            <circle cx="480" cy="35" r="3.5" fill="#4F46E5" stroke="#fff" strokeWidth="2" />
                            <circle cx="600" cy="8" r="3.5" fill="#4F46E5" stroke="#fff" strokeWidth="2" />
                        </svg>
                        <div className="chart-labels">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        </div>
                    </div>
                </div>

                {/* Recent Deals Table */}
                <div className="dash-table-area">
                    <div className="dash-table-header">
                        <h3>Recent Deals</h3>
                        <button className="view-all">View All →</button>
                    </div>
                    <table className="dash-table">
                        <thead>
                            <tr>
                                <th>Deal</th>
                                <th>Contact</th>
                                <th>Value</th>
                                <th>Stage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="deal-name">Enterprise License</td>
                                <td>Sarah Chen</td>
                                <td>$48,000</td>
                                <td><span className="stage won">Closed Won</span></td>
                            </tr>
                            <tr>
                                <td className="deal-name">Annual Subscription</td>
                                <td>Marcus J.</td>
                                <td>$24,500</td>
                                <td><span className="stage negotiation">Negotiation</span></td>
                            </tr>
                            <tr>
                                <td className="deal-name">Team Plan Upgrade</td>
                                <td>Priya S.</td>
                                <td>$12,800</td>
                                <td><span className="stage proposal">Proposal</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
