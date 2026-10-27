// Safe Toast notification dispatcher for OMP Deals Suite
export const toast = {
  success: (msg) => {
    console.log('[OMP Toast Success]:', msg);
    // Custom DOM event or banner notification
    const banner = document.createElement('div');
    banner.textContent = '✓ ' + msg;
    banner.style.position = 'fixed';
    banner.style.bottom = '24px';
    banner.style.right = '24px';
    banner.style.backgroundColor = '#10b981';
    banner.style.color = '#ffffff';
    banner.style.padding = '10px 18px';
    banner.style.borderRadius = '8px';
    banner.style.fontSize = '0.85rem';
    banner.style.fontWeight = '600';
    banner.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
    banner.style.zIndex = '99999';
    banner.style.transition = 'all 0.25s ease';
    document.body.appendChild(banner);
    setTimeout(() => {
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 250);
    }, 3000);
  },
  info: (msg) => {
    console.log('[OMP Toast Info]:', msg);
    const banner = document.createElement('div');
    banner.textContent = 'ℹ ' + msg;
    banner.style.position = 'fixed';
    banner.style.bottom = '24px';
    banner.style.right = '24px';
    banner.style.backgroundColor = '#0284c7';
    banner.style.color = '#ffffff';
    banner.style.padding = '10px 18px';
    banner.style.borderRadius = '8px';
    banner.style.fontSize = '0.85rem';
    banner.style.fontWeight = '600';
    banner.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
    banner.style.zIndex = '99999';
    banner.style.transition = 'all 0.25s ease';
    document.body.appendChild(banner);
    setTimeout(() => {
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 250);
    }, 3000);
  },
  error: (msg) => {
    console.log('[OMP Toast Error]:', msg);
    const banner = document.createElement('div');
    banner.textContent = '⚠ ' + msg;
    banner.style.position = 'fixed';
    banner.style.bottom = '24px';
    banner.style.right = '24px';
    banner.style.backgroundColor = '#ef4444';
    banner.style.color = '#ffffff';
    banner.style.padding = '10px 18px';
    banner.style.borderRadius = '8px';
    banner.style.fontSize = '0.85rem';
    banner.style.fontWeight = '600';
    banner.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
    banner.style.zIndex = '99999';
    banner.style.transition = 'all 0.25s ease';
    document.body.appendChild(banner);
    setTimeout(() => {
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 250);
    }, 3000);
  },
};
