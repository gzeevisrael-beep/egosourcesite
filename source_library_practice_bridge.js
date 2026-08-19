(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const sourceId = params.get('source');
  if (!sourceId) return;
  const reveal = () => {
    const card = document.querySelector(`[data-source="${CSS.escape(sourceId)}"]`);
    if (!card) return false;
    card.classList.remove('hidden');
    card.scrollIntoView({behavior:'smooth',block:'center'});
    card.style.boxShadow = '0 0 0 1px rgba(215,181,109,.65),0 20px 70px rgba(0,0,0,.28)';
    setTimeout(()=>card.style.boxShadow='',2200);
    return true;
  };
  if (!reveal()) setTimeout(reveal,120);
})();