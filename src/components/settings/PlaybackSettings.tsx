import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PlaybackSettings() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{t('settings.playback.quality')}</h3>
        <select
          defaultValue="auto"
          className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="auto">Auto</option>
          <option value="4k">4K</option>
          <option value="1080p">1080p</option>
          <option value="720p">720p</option>
          <option value="480p">480p</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{t('settings.playback.autoplay')}</h3>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            defaultChecked={false}
            className="form-checkbox h-5 w-5 text-emerald-500 rounded border-gray-600 bg-gray-700"
          />
          <span>{t('settings.playback.enableAutoplay')}</span>
        </label>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{t('settings.playback.notifications')}</h3>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            defaultChecked={false}
            className="form-checkbox h-5 w-5 text-emerald-500 rounded border-gray-600 bg-gray-700"
          />
          <span>{t('settings.playback.enableNotifications')}</span>
        </label>
      </div>
    </div>
  );
}