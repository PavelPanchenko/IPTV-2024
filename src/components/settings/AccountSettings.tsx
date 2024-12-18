import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AccountSettings() {
  const { t, i18n } = useTranslation();
  const [showAdultContent, setShowAdultContent] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang).catch(error => {
      console.error('Failed to change language:', error);
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword.length < 6) {
      setPasswordError(t('settings.account.passwordTooShort'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(t('settings.account.passwordMismatch'));
      return;
    }

    setPasswordSuccess(t('settings.account.passwordChanged'));
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{t('settings.account.language')}</h3>
        <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="ru">Русский</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{t('settings.account.content')}</h3>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={showAdultContent}
            onChange={(e) => setShowAdultContent(e.target.checked)}
            className="form-checkbox h-5 w-5 text-emerald-500 rounded border-gray-600 bg-gray-700"
          />
          <span>{t('settings.account.adultContent')}</span>
        </label>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{t('settings.account.changePassword')}</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder={t('settings.account.currentPassword')}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t('settings.account.newPassword')}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('settings.account.confirmPassword')}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          {passwordSuccess && <p className="text-emerald-500 text-sm">{passwordSuccess}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
          >
            {t('settings.account.updatePassword')}
          </button>
        </form>
      </div>
    </div>
  );
}