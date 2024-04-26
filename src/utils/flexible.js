(function flexible(window, document) {
  function resetFontSize() {
    let size = 0;
    size = (document.documentElement.clientWidth / 1920) * 16;
    document.documentElement.style.fontSize = `${size <= 12 ? 12 : size}px`;
  }
  resetFontSize();
  window.addEventListener('pageshow', resetFontSize);
  window.addEventListener('resize', resetFontSize);
})(window, document);
