'use strict';
const config = window.VEMR_CONFIG || {};
const dialog = document.querySelector('#join-dialog');
const details = document.querySelector('#connection-details');
const status = document.querySelector('#copy-status');
document.querySelector('#year').textContent = new Date().getFullYear();
if (config.supportedVersions) {
  document.querySelector('.hero-note').textContent = `Minecraft ${config.supportedVersions}`;
  const versionNote = document.createElement('p');
  versionNote.textContent = `Supported Minecraft versions: ${config.supportedVersions}.`;
  details.append(versionNote);
}

function addConnection(edition, address, extra) {
  if (typeof address !== 'string' || !address.trim()) return false;
  const section = document.createElement('section');
  section.className = 'connection';
  const title = document.createElement('h3');
  title.textContent = edition;
  const code = document.createElement('code');
  code.textContent = address.trim();
  const copy = document.createElement('button');
  copy.className = 'button';
  copy.textContent = 'Copy address';
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(address.trim());
      status.textContent = 'Server address copied!';
    } catch {
      status.textContent = 'Select and copy the address shown above.';
    }
  });
  section.append(title, code);
  if (extra) {
    const note = document.createElement('p');
    note.textContent = extra;
    section.append(note);
  }
  section.append(copy);
  details.append(section);
  return true;
}
const java = addConnection('JAVA EDITION', config.javaAddress, config.javaVersion ? `Version: ${config.javaVersion}` : 'Multiplayer → Add Server → Server Address');
const bedrock = addConnection('BEDROCK EDITION', config.bedrockAddress, `Port: ${config.bedrockPort || 19132}`);
if (!java && !bedrock) {
  const note = document.createElement('p');
  note.textContent = 'Connection details are coming soon. Check back here for the server address and supported editions.';
  details.append(note);
  document.querySelector('.dialog-tip').hidden = true;
} else {
  const editions = [java && 'Java', bedrock && 'Bedrock'].filter(Boolean).join(' and ');
  document.querySelector('#faq-editions').textContent = `Connection details are available for ${editions}. Use the address listed for your edition.`;
}
try {
  const url = new URL(config.discordUrl);
  if (url.protocol === 'https:' && ['discord.gg', 'discord.com', 'www.discord.com'].includes(url.hostname)) {
    const link = document.createElement('a');
    link.href = url.href;
    link.textContent = 'Join the VEMR Discord community';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.querySelector('#faq-discord').replaceChildren(link);
  }
} catch { /* No valid community link is configured yet. */ }
document.querySelectorAll('[data-open-join]').forEach(button => {
  button.addEventListener('click', () => { status.textContent = ''; dialog.showModal(); });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
