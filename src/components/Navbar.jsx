import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  onOpenCase, 
  currentRole: propRole, 
  setCurrentRole: propSetCurrentRole,
  showToast,
  onOpenAuth
}) {
  const auth = useAuth();
  const currentRole = propRole || auth.currentRole;
  const setCurrentRole = propSetCurrentRole || auth.setCurrentRole;
  const user = auth.user;
  const profile = auth.profile;
  const activePersona = auth.activePersona;

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [hasUnread, setHasUnread] = useState(true);

  const isAdmin = currentRole === 'admin';
  const isLegal = currentRole === 'legal' || currentRole === 'legal_officer';
  const isForensic = currentRole === 'forensic' || currentRole === 'forensic_officer';

  return (
    <header className="top-navbar">
      <div className="nav-container">
        
        {/* Brand Logo & Tagline */}
        <div 
          className="nav-brand" 
          onClick={() => setActivePage(isAdmin ? 'adminDashboard' : 'dashboard')} 
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-logo-wrap">
            <svg className="shield-logo" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 1L2 7V17.5C2 27.5 8.8 36.8 18 39.5C27.2 36.8 34 27.5 34 17.5V7L18 1Z" fill="#0B1E36" stroke="#0B1E36" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M10 13H26M10 19H26M13 25H23" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="brand-text-block">
            <span className="brand-name">DocShield</span>
            <span className="brand-tagline">Secure Documents. Stronger Justice.</span>
          </div>
        </div>

        {/* Top Navigation Menu */}
        <nav className="nav-menu">
          {/* Dashboard */}
          <div className={`nav-item-wrapper ${(activePage === 'adminDashboard' || activePage === 'dashboard') ? 'active-wrapper' : ''}`}>
            <button 
              className={`nav-item ${(activePage === 'adminDashboard' || activePage === 'dashboard') ? 'active' : ''}`}
              onClick={() => setActivePage(isAdmin ? 'adminDashboard' : 'dashboard')}
            >
              <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9.5L10 3L17 9.5V17C17 17.5 16.5 18 16 18H4C3.5 18 3 17.5 3 17V9.5Z"/>
                <path d="M8 18V11H12V18"/>
              </svg>
              <span>Dashboard</span>
            </button>
            {(activePage === 'adminDashboard' || activePage === 'dashboard') && <span className="nav-active-bar"></span>}
          </div>

          {/* Admin-only "Users" Item */}
          {isAdmin && (
            <div className={`nav-item-wrapper ${activePage === 'users' ? 'active-wrapper' : ''}`}>
              <button 
                className={`nav-item ${activePage === 'users' ? 'active' : ''}`}
                onClick={() => setActivePage('users')}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 19v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M19 11a3 3 0 0 0-2.5-2.9M19 14.5a3 3 0 0 0-1.5-.5"/>
                </svg>
                <span>Users</span>
              </button>
              {activePage === 'users' && <span className="nav-active-bar"></span>}
            </div>
          )}

          {/* Cases */}
          <div className={`nav-item-wrapper ${activePage === 'cases' ? 'active-wrapper' : ''}`}>
            <button 
              className={`nav-item ${activePage === 'cases' ? 'active' : ''}`}
              onClick={() => setActivePage('cases')}
            >
              <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="16" height="12" rx="2"/>
                <path d="M7 5V3C7 2.4 7.4 2 8 2H12C12.6 2 13 2.4 13 3V5"/>
                <path d="M2 10H18"/>
              </svg>
              <span>Cases</span>
            </button>
            {activePage === 'cases' && <span className="nav-active-bar"></span>}
          </div>

          {/* Evidence (For Forensic Officer, Evidence comes before Documents per specifications) */}
          {isForensic && (
            <div className={`nav-item-wrapper ${activePage === 'evidence' ? 'active-wrapper' : ''}`}>
              <button 
                className={`nav-item ${activePage === 'evidence' ? 'active' : ''}`}
                onClick={() => setActivePage('evidence')}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 6.5L10 2.5L3 6.5V13.5L10 17.5L17 13.5V6.5Z"/>
                  <path d="M10 2.5V17.5M3 6.5L10 10.5L17 6.5"/>
                </svg>
                <span>Evidence</span>
              </button>
              {activePage === 'evidence' && <span className="nav-active-bar"></span>}
            </div>
          )}

          {/* Forensic Reports (For Forensic Officer, Forensic Reports comes next) */}
          {isForensic && (
            <div className={`nav-item-wrapper ${activePage === 'forensic' ? 'active-wrapper' : ''}`}>
              <button 
                className={`nav-item ${activePage === 'forensic' ? 'active' : ''}`}
                onClick={() => setActivePage('forensic')}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3H11M10 3V8M6 17H14M10 8L6 14C5 15.5 6 17 8 17H12C14 17 15 15.5 14 14L10 8Z"/>
                </svg>
                <span>Forensic Reports</span>
              </button>
              {activePage === 'forensic' && <span className="nav-active-bar"></span>}
            </div>
          )}

          {/* Documents */}
          <div className={`nav-item-wrapper ${activePage === 'documents' ? 'active-wrapper' : ''}`}>
            <button 
              className={`nav-item ${activePage === 'documents' ? 'active' : ''}`}
              onClick={() => setActivePage('documents')}
            >
              <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2H5C4.4 2 4 2.4 4 3V17C4 17.6 4.4 18 5 18H15C15.6 18 16 17.6 16 17V6L12 2Z"/>
                <path d="M12 2V6H16"/>
                <path d="M8 10H12M8 14H12"/>
              </svg>
              <span>Documents</span>
            </button>
            {activePage === 'documents' && <span className="nav-active-bar"></span>}
          </div>

          {/* Evidence (For Non-Forensic roles) */}
          {!isForensic && (
            <div className={`nav-item-wrapper ${activePage === 'evidence' ? 'active-wrapper' : ''}`}>
              <button 
                className={`nav-item ${activePage === 'evidence' ? 'active' : ''}`}
                onClick={() => setActivePage('evidence')}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 6.5L10 2.5L3 6.5V13.5L10 17.5L17 13.5V6.5Z"/>
                  <path d="M10 2.5V17.5M3 6.5L10 10.5L17 6.5"/>
                </svg>
                <span>Evidence</span>
              </button>
              {activePage === 'evidence' && <span className="nav-active-bar"></span>}
            </div>
          )}

          {/* Forensic Reports (For Non-Forensic roles) */}
          {!isForensic && (
            <div className={`nav-item-wrapper ${activePage === 'forensic' ? 'active-wrapper' : ''}`}>
              <button 
                className={`nav-item ${activePage === 'forensic' ? 'active' : ''}`}
                onClick={() => setActivePage('forensic')}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3H11M10 3V8M6 17H14M10 8L6 14C5 15.5 6 17 8 17H12C14 17 15 15.5 14 14L10 8Z"/>
                </svg>
                <span>Forensic Reports</span>
              </button>
              {activePage === 'forensic' && <span className="nav-active-bar"></span>}
            </div>
          )}

          {/* Charge Sheets (Available to Admin, Inspector, Legal Officer) */}
          {!isForensic && (
            <div className={`nav-item-wrapper ${activePage === 'chargeSheets' ? 'active-wrapper' : ''}`}>
              <button 
                className={`nav-item ${activePage === 'chargeSheets' ? 'active' : ''}`}
                onClick={() => setActivePage('chargeSheets')}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4H16V16H4V4Z"/>
                  <path d="M4 8H16M8 4V16"/>
                </svg>
                <span>Charge Sheets</span>
              </button>
              {activePage === 'chargeSheets' && <span className="nav-active-bar"></span>}
            </div>
          )}

          {/* Court Filings (Available to Admin, Inspector, Legal Officer) */}
          {!isForensic && (
            <div className={`nav-item-wrapper ${activePage === 'courtFilings' ? 'active-wrapper' : ''}`}>
              <button 
                className={`nav-item ${activePage === 'courtFilings' ? 'active' : ''}`}
                onClick={() => setActivePage('courtFilings')}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h14M3 10h14M3 14h14M10 2L2 6v12h16V6l-8-4z"/>
                </svg>
                <span>Court Filings</span>
              </button>
              {activePage === 'courtFilings' && <span className="nav-active-bar"></span>}
            </div>
          )}

          {/* Chain of Custody */}
          <div className={`nav-item-wrapper ${activePage === 'custody' ? 'active-wrapper' : ''}`}>
            <button 
              className={`nav-item ${activePage === 'custody' ? 'active' : ''}`}
              onClick={() => setActivePage('custody')}
            >
              <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="9" width="12" height="9" rx="2"/>
                <path d="M7 9V6a3 3 0 0 1 6 0v3"/>
                <circle cx="10" cy="13.5" r="1" fill="currentColor"/>
              </svg>
              <span>Chain of Custody</span>
            </button>
            {activePage === 'custody' && <span className="nav-active-bar"></span>}
          </div>

          {/* Audit Logs */}
          <div className={`nav-item-wrapper ${activePage === 'auditLogs' ? 'active-wrapper' : ''}`}>
            <button 
              className={`nav-item ${activePage === 'auditLogs' ? 'active' : ''}`}
              onClick={() => setActivePage('auditLogs')}
            >
              <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2L3 5v6c0 5 7 7 7 7s7-2 7-7V5l-7-3z"/>
                <polyline points="10 7 10 10 12 12"/>
              </svg>
              <span>Audit Logs</span>
            </button>
            {activePage === 'auditLogs' && <span className="nav-active-bar"></span>}
          </div>

          {/* Admin-only "Settings" Item */}
          {isAdmin && (
            <div className={`nav-item-wrapper ${activePage === 'settings' ? 'active-wrapper' : ''}`}>
              <button 
                className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
                onClick={() => setActivePage('settings')}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="10" r="3"/>
                  <path d="M16.5 10c0-.3-.02-.6-.07-.9l1.64-1.28a.4.4 0 0 0 .1-.51l-1.55-2.68a.4.4 0 0 0-.49-.17l-1.93.78a5.5 5.5 0 0 0-1.56-.9l-.3-2.06A.4.4 0 0 0 12 2h-3.1a.4.4 0 0 0-.4.38l-.3 2.06c-.56.24-1.08.54-1.56.9l-1.93-.78a.4.4 0 0 0-.49.17L2.67 7.41a.4.4 0 0 0 .1.51l1.64 1.28c-.05.3-.07.6-.07.9s.02.6.07.9l-1.64 1.28a.4.4 0 0 0-.1.51l1.55 2.68c.11.2.35.27.49.17l1.93-.78c.48.36 1 .66 1.56.9l.3 2.06c.04.22.21.38.4.38H12c.2 0 .37-.16.4-.38l.3-2.06c.56-.24 1.08-.54 1.56-.9l1.93.78c.14.1.38.03.49-.17l1.55-2.68a.4.4 0 0 0-.1-.51l-1.64-1.28c.05-.3.07-.6.07-.9z"/>
                </svg>
                <span>Settings</span>
              </button>
              {activePage === 'settings' && <span className="nav-active-bar"></span>}
            </div>
          )}
        </nav>

        {/* Right Nav Utilities */}
        <div className="nav-actions">
          
          {/* Header Search Box */}
          <div className="navbar-search-box">
            <svg className="search-svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="9" r="6"/>
              <path d="M13.5 13.5L17.5 17.5"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchVal.trim()) {
                  setActivePage('cases');
                }
              }}
            />
          </div>

          {/* Notification Bell */}
          <div className="notification-wrap">
            <button 
              className="icon-btn notification-btn" 
              title="Notifications"
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
              }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 7C15 4.2 12.8 2 10 2C7.2 2 5 4.2 5 7C5 12 3 13.5 3 13.5H17C17 13.5 15 12 15 7Z"/>
                <path d="M8.5 16.5C8.8 17.4 9.6 18 10.5 18C11.4 18 12.2 17.4 12.5 16.5"/>
              </svg>
              {hasUnread && <span className="notif-badge">3</span>}
            </button>

            {notifOpen && (
              <div className="dropdown-panel notif-dropdown open" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-header">
                  <span className="dropdown-title">System Alerts</span>
                  <button 
                    className="text-link-btn" 
                    onClick={() => setHasUnread(false)}
                  >
                    Mark all read
                  </button>
                </div>
                <div className="notif-list">
                  <div 
                    className="notif-item unread" 
                    onClick={() => {
                      onOpenCase('#2024-1768');
                      setNotifOpen(false);
                    }}
                  >
                    <div className="notif-icon-circle blue">
                      <svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 3h12v10H2z"/></svg>
                    </div>
                    <div className="notif-content">
                      <p className="notif-msg"><strong>FIR.pdf</strong> verified with SHA-256 in <strong>#2024-1768</strong></p>
                      <span className="notif-time">2 hours ago • Bhopal Central PS</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Pill (Legal Officer, Admin, or Inspector) */}
          <div className="profile-wrap">
            <button 
              className="profile-btn" 
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
            >
              <img 
                src={profile?.avatar_url || activePersona.avatar} 
                alt={profile?.full_name || activePersona.name} 
                className="profile-avatar" 
              />
              <div className="profile-info">
                <span className="profile-role">
                  {isForensic ? "Forensic Officer" : isLegal ? "Legal Officer" : isAdmin ? "Admin" : "Inspector"}
                </span>
                <span className="profile-station">
                  {profile?.station_or_lab || activePersona.organization}
                </span>
              </div>
              <svg className="chevron-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6L8 10L12 6"/>
              </svg>
            </button>

            {profileOpen && (
              <div className="dropdown-panel profile-dropdown open" onClick={(e) => e.stopPropagation()}>
                <div className="profile-dropdown-header">
                  <div className="profile-dropdown-name">
                    {profile?.full_name || activePersona.name}
                  </div>
                  <div className="profile-dropdown-sub">
                    {profile?.badge_id || activePersona.badge}
                  </div>
                  <div className="profile-dropdown-badge">
                    {profile?.station_or_lab || activePersona.organization}
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                
                {/* 4-Way Role Switcher */}
                {setCurrentRole && (
                  <div style={{ padding: '6px 12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
                      Switch Role View
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button 
                        className={`dropdown-item ${isForensic ? 'active-role' : ''}`}
                        style={{ padding: '6px 10px', borderRadius: '6px', fontSize: '12.5px', fontWeight: isForensic ? '700' : '500', color: isForensic ? '#1E6DEB' : '#334155', backgroundColor: isForensic ? '#EFF6FF' : 'transparent' }}
                        onClick={() => {
                          setCurrentRole('forensic');
                          setActivePage('dashboard');
                          setProfileOpen(false);
                          showToast?.("Switched to Evidence / Forensic Officer view.");
                        }}
                      >
                        🔬 Evidence / Forensic Officer (RFSL)
                      </button>

                      <button 
                        className={`dropdown-item ${isLegal ? 'active-role' : ''}`}
                        style={{ padding: '6px 10px', borderRadius: '6px', fontSize: '12.5px', fontWeight: isLegal ? '700' : '500', color: isLegal ? '#1E6DEB' : '#334155', backgroundColor: isLegal ? '#EFF6FF' : 'transparent' }}
                        onClick={() => {
                          setCurrentRole('legal');
                          setActivePage('dashboard');
                          setProfileOpen(false);
                          showToast?.("Switched to Court / Legal Officer view.");
                        }}
                      >
                        ⚖️ Legal Officer (DPO Court Review)
                      </button>

                      <button 
                        className={`dropdown-item ${isAdmin ? 'active-role' : ''}`}
                        style={{ padding: '6px 10px', borderRadius: '6px', fontSize: '12.5px', fontWeight: isAdmin ? '700' : '500', color: isAdmin ? '#1E6DEB' : '#334155', backgroundColor: isAdmin ? '#EFF6FF' : 'transparent' }}
                        onClick={() => {
                          setCurrentRole('admin');
                          setActivePage('adminDashboard');
                          setProfileOpen(false);
                          showToast?.("Switched to System Administrator view.");
                        }}
                      >
                        🛡️ Admin (System Oversight & Users)
                      </button>

                      <button 
                        className={`dropdown-item ${!isAdmin && !isLegal && !isForensic ? 'active-role' : ''}`}
                        style={{ padding: '6px 10px', borderRadius: '6px', fontSize: '12.5px', fontWeight: (!isAdmin && !isLegal && !isForensic) ? '700' : '500', color: (!isAdmin && !isLegal && !isForensic) ? '#1E6DEB' : '#334155', backgroundColor: (!isAdmin && !isLegal && !isForensic) ? '#EFF6FF' : 'transparent' }}
                        onClick={() => {
                          setCurrentRole('inspector');
                          setActivePage('dashboard');
                          setProfileOpen(false);
                          showToast?.("Switched to Police Inspector view.");
                        }}
                      >
                        👮 Inspector (Field Investigation)
                      </button>
                    </div>
                  </div>
                )}

                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item text-danger" 
                  onClick={async () => {
                    try {
                      await auth.signOut();
                      showToast?.("Session signed out successfully. CCTNS security audit sealed.");
                    } catch (err) {
                      console.warn('Sign out notice:', err.message);
                    }
                    setProfileOpen(false);
                    if (onOpenAuth) onOpenAuth();
                  }}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H5"/></svg>
                  <span>Sign Out Session</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
