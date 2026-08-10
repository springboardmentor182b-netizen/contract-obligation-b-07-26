import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMonitor, FiType, FiCalendar, FiGlobe, FiLayout } from 'react-icons/fi';
import SettingsCard from '../SettingsCard';
import SettingsRow from '../SettingsRow';
import ToggleSwitch from '../ToggleSwitch';
import '../SettingsShared.css';
import './Appearance.css';
import { getAppearance, updateAppearance } from '../../../api/settingsApi';

const ACCENT_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Rose', value: '#f43f5e' },
];

const THEMES = [
  { id: 'light', label: 'Light', icon: <FiSun />, desc: 'Clean white interface' },
  { id: 'dark', label: 'Dark', icon: <FiMoon />, desc: 'Easy on the eyes' },
  { id: 'system', label: 'System', icon: <FiMonitor />, desc: 'Follow device setting' },
];

const Appearance = () => {
  const [selectedTheme, setSelectedTheme] = useState(() => localStorage.getItem('contractiq_theme') || 'light');
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [compactMode, setCompactMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAppearance().then((data) => {
      if (!data || typeof data !== 'object') return;
      setSelectedTheme(data.theme || localStorage.getItem('contractiq_theme') || 'light');
      setAccentColor(data.accent_color || '#3b82f6');
      setCompactMode(Boolean(data.compact_mode));
      setLanguage(data.language || 'en');
      setDateFormat(data.date_format || 'DD/MM/YYYY');
    }).catch(() => {});
  }, []);

  const DATE_FORMATS = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', example: '05/08/2026' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', example: '08/05/2026' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2026-08-05' },
    { value: 'D MMMM YYYY', label: 'D MMMM YYYY', example: '5 August 2026' },
    { value: 'MMM D, YYYY', label: 'MMM D, YYYY', example: 'Aug 5, 2026' },
  ];

  const getCurrentDatePreview = () => {
    const today = new Date();
    const format = DATE_FORMATS.find(f => f.value === dateFormat);
    if (!format) return '';
    
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'D MMMM YYYY':
        return `${today.getDate()} ${monthNames[today.getMonth()]} ${year}`;
      case 'MMM D, YYYY':
        return `${shortMonthNames[today.getMonth()]} ${today.getDate()}, ${year}`;
      default:
        return `${day}/${month}/${year}`;
    }
  };

  const handleSave = async () => {
    try {
      await updateAppearance({ theme: selectedTheme, accent_color: accentColor, compact_mode: compactMode, language, date_format: dateFormat });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { setSaved(false); }
  };

  const selectTheme = async (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem('contractiq_theme', theme);
    try {
      await updateAppearance({ theme, accent_color: accentColor, compact_mode: compactMode, language, date_format: dateFormat });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setSaved(false);
    }
  };

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('contractiq_theme', selectedTheme);
    if (selectedTheme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--bg-primary', '#111827');
      root.style.setProperty('--bg-secondary', '#1f2937');
      root.style.setProperty('--bg-sidebar', '#111827');
      root.style.setProperty('--bg-hover', '#1f2937');
      root.style.setProperty('--text-primary', '#f9fafb');
      root.style.setProperty('--text-secondary', '#9ca3af');
      root.style.setProperty('--text-sidebar', '#ffffff');
      root.style.setProperty('--border-color', '#374151');
    } else if (selectedTheme === 'light') {
      root.classList.remove('dark');
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f3f4f6');
      root.style.setProperty('--bg-sidebar', '#111827');
      root.style.setProperty('--bg-hover', '#fafafa');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#6b7280');
      root.style.setProperty('--text-sidebar', '#ffffff');
      root.style.setProperty('--border-color', '#e5e7eb');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        root.style.setProperty('--bg-primary', '#111827');
        root.style.setProperty('--bg-secondary', '#1f2937');
        root.style.setProperty('--bg-sidebar', '#111827');
        root.style.setProperty('--bg-hover', '#1f2937');
        root.style.setProperty('--text-primary', '#f9fafb');
        root.style.setProperty('--text-secondary', '#9ca3af');
        root.style.setProperty('--text-sidebar', '#ffffff');
        root.style.setProperty('--border-color', '#374151');
      } else {
        root.classList.remove('dark');
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f3f4f6');
        root.style.setProperty('--bg-sidebar', '#111827');
        root.style.setProperty('--bg-hover', '#fafafa');
        root.style.setProperty('--text-primary', '#111827');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--text-sidebar', '#ffffff');
        root.style.setProperty('--border-color', '#e5e7eb');
      }
    }
  }, [selectedTheme]);

  // Apply accent color changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', accentColor);
    root.style.setProperty('--accent-hover', adjustColor(accentColor, -20));
  }, [accentColor]);

  // Apply compact mode changes
  useEffect(() => {
    const root = document.documentElement;
    if (compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }
  }, [compactMode]);

  // Helper function to adjust color brightness
  const adjustColor = (color, amount) => {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Appearance</h2>
        <p>Customize the look and feel of your ContractIQ workspace</p>
      </div>

      {/* Theme */}
      <SettingsCard title="Theme">
        <div className="appearance-theme-grid">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              className={`appearance-theme-card ${selectedTheme === theme.id ? 'appearance-theme-card--active' : ''}`}
              onClick={() => selectTheme(theme.id)}
            >
              <div className="appearance-theme-icon">{theme.icon}</div>
              <div className="appearance-theme-label">{theme.label}</div>
              <div className="appearance-theme-desc">{theme.desc}</div>
              {selectedTheme === theme.id && (
                <div className="appearance-theme-check">✓</div>
              )}
            </button>
          ))}
        </div>
      </SettingsCard>

      {/* Accent Color */}
      <SettingsCard title="Accent Color">
        <div className="appearance-accent-section">
          <p className="appearance-accent-label">
            Choose your primary accent color used in buttons, active states, and highlights.
          </p>
          <div className="appearance-color-swatches">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.value}
                className={`appearance-swatch ${accentColor === color.value ? 'appearance-swatch--active' : ''}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
                onClick={() => setAccentColor(color.value)}
              >
                {accentColor === color.value && (
                  <span className="appearance-swatch-check">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="appearance-accent-preview">
            <span className="appearance-accent-dot" style={{ backgroundColor: accentColor }} />
            <span className="appearance-accent-name">
              {ACCENT_COLORS.find((c) => c.value === accentColor)?.name} selected
            </span>
          </div>
        </div>
      </SettingsCard>

      {/* Other preferences */}
      <SettingsCard title="Display Preferences">
        <SettingsRow
          icon={<FiLayout />}
          iconBg="#f3f4f6"
          iconColor="#6b7280"
          title="Compact Mode"
          subtitle="Reduce spacing and padding for denser information display"
          action={
            <ToggleSwitch
              id="compact-mode"
              checked={compactMode}
              onChange={() => setCompactMode((v) => !v)}
            />
          }
        />

        <div className="appearance-select-row">
          <SettingsRow
            icon={<FiGlobe />}
            iconBg="#eff6ff"
            iconColor="#3b82f6"
            title="Language"
            subtitle="Interface display language"
            action={
              <select
                className="settings-select appearance-inline-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English (US)</option>
                <option value="en-gb">English (UK)</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
              </select>
            }
          />
        </div>

        <div className="appearance-date-format-section">
          <SettingsRow
            icon={<FiCalendar />}
            iconBg="#f0fdf4"
            iconColor="#16a34a"
            title="Date Format"
            subtitle="How dates are displayed throughout the app"
          />
          <div className="appearance-date-format-grid">
            {DATE_FORMATS.map((format) => (
              <button
                key={format.value}
                className={`appearance-date-format-card ${dateFormat === format.value ? 'appearance-date-format-card--active' : ''}`}
                onClick={() => setDateFormat(format.value)}
              >
                <div className="appearance-date-format-label">{format.label}</div>
                <div className="appearance-date-format-example">{format.example}</div>
                {dateFormat === format.value && (
                  <div className="appearance-date-format-check">✓</div>
                )}
              </button>
            ))}
          </div>
          <div className="appearance-date-preview">
            <span className="appearance-date-preview-label">Current date preview:</span>
            <span className="appearance-date-preview-value">{getCurrentDatePreview()}</span>
          </div>
        </div>

        <div className="settings-form-actions">
          <button className="btn-primary" onClick={handleSave}>
            {saved ? '✓ Saved' : 'Save Preferences'}
          </button>
        </div>
      </SettingsCard>
    </div>
  );
};

export default Appearance;
