import { Channel } from '../types/channel';

function generateM3U8Playlist(channels: Channel[]): string {
  let playlist = '#EXTM3U\n';
  channels.forEach(channel => {
    playlist += `#EXTINF:-1 tvg-id="${channel.id}" tvg-name="${channel.name}" tvg-logo="" group-title="${channel.category}",${channel.name}\n`;
    playlist += `${channel.url}\n`;
  });
  return playlist;
}

function generateM3UPlaylist(channels: Channel[]): string {
  let playlist = '#EXTM3U\n';
  channels.forEach(channel => {
    playlist += `#EXTINF:0,${channel.name}\n`;
    playlist += `${channel.url}\n`;
  });
  return playlist;
}

function generateEnigma2Playlist(channels: Channel[]): string {
  let playlist = '#NAME StreamVerse\n';
  channels.forEach(channel => {
    playlist += `#SERVICE 1:0:1:${channel.id}:0:0:0:0:0:0:${encodeURIComponent(channel.url || '')}\n`;
    playlist += `#DESCRIPTION ${channel.name}\n`;
  });
  return playlist;
}

function generateKodiPlaylist(channels: Channel[]): string {
  let playlist = '<?xml version="1.0" encoding="UTF-8"?>\n';
  playlist += '<tv>\n';
  channels.forEach(channel => {
    playlist += `  <channel id="${channel.id}">\n`;
    playlist += `    <display-name>${channel.name}</display-name>\n`;
    playlist += `    <stream>${channel.url}</stream>\n`;
    playlist += `  </channel>\n`;
  });
  playlist += '</tv>';
  return playlist;
}

function generateSSIPTVPlaylist(channels: Channel[]): string {
  let playlist = '{\n  "channels": [\n';
  channels.forEach((channel, index) => {
    playlist += `    {\n`;
    playlist += `      "name": "${channel.name}",\n`;
    playlist += `      "url": "${channel.url}",\n`;
    playlist += `      "category": "${channel.category}"\n`;
    playlist += `    }${index < channels.length - 1 ? ',' : ''}\n`;
  });
  playlist += '  ]\n}';
  return playlist;
}

function generateHalvaPlaylist(channels: Channel[]): string {
  return JSON.stringify({
    name: "StreamVerse",
    channels: channels.map(channel => ({
      name: channel.name,
      stream_url: channel.url,
      category: channel.category,
      quality: channel.quality
    }))
  }, null, 2);
}

function generateSparkPlaylist(channels: Channel[]): string {
  let playlist = '#EXTM3U url-tvg="http://streamverse/epg.xml"\n';
  channels.forEach(channel => {
    playlist += `#EXTINF:-1 tvg-id="${channel.id}" tvg-name="${channel.name}" group-title="${channel.category}" tvg-logo="" quality="${channel.quality}",${channel.name}\n`;
    playlist += `${channel.url}\n`;
  });
  return playlist;
}

export function downloadPlaylist(channels: Channel[], format: string): void {
  let content: string;
  let filename: string;
  let mimeType: string;

  switch (format) {
    case 'm3u8':
      content = generateM3U8Playlist(channels);
      filename = 'streamverse.m3u8';
      mimeType = 'application/x-mpegurl';
      break;
    case 'm3u':
      content = generateM3UPlaylist(channels);
      filename = 'streamverse.m3u';
      mimeType = 'application/x-mpegurl';
      break;
    case 'enigma':
      content = generateEnigma2Playlist(channels);
      filename = 'streamverse.tv';
      mimeType = 'text/plain';
      break;
    case 'kodi':
      content = generateKodiPlaylist(channels);
      filename = 'streamverse.xml';
      mimeType = 'application/xml';
      break;
    case 'ssiptv':
      content = generateSSIPTVPlaylist(channels);
      filename = 'streamverse.json';
      mimeType = 'application/json';
      break;
    case 'halva':
      content = generateHalvaPlaylist(channels);
      filename = 'streamverse.json';
      mimeType = 'application/json';
      break;
    case 'spark':
      content = generateSparkPlaylist(channels);
      filename = 'streamverse.m3u';
      mimeType = 'application/x-mpegurl';
      break;
    default:
      content = generateM3U8Playlist(channels);
      filename = 'streamverse.m3u8';
      mimeType = 'application/x-mpegurl';
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}