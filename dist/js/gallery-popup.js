export default function galleryPopup(arg) {

    let galleryPopupBlock = 
      `
      <div class="_gallery-popup _hidden">
          <div class="_gallery-popup-bg"></div>
          <div class="_gallery-popup-body _gallery-popup-max">
              <button type="button" class="_gallery-popup-close-btn">
                  ×
              </button>
              <img src="${arg.link.href}" class="_gallery-popup-img" loading="lazy">
          </div>
      </div>
      `;

      let html = arg.html, body = arg.body;
  
      body.insertAdjacentHTML('beforeend', galleryPopupBlock);
      html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
      body.classList.add('_popup-active');
      
      let galleryPopup = document.querySelector('._gallery-popup');
  
      setTimeout(function() {
        galleryPopup.classList.remove('_hidden');
      },200);
  
      function removeGalleryPopup() {
        galleryPopup.classList.add('_hidden');
        setTimeout(function() {
          body.removeChild(galleryPopup);
          body.classList.remove('_popup-active');
          html.style.setProperty('--popup-padding', '0px');
        },200);
      }
  
      galleryPopup.querySelector('._gallery-popup-close-btn').addEventListener('click', function() {
        removeGalleryPopup();
      });
      galleryPopup.querySelector('._gallery-popup-bg').addEventListener('click', function() {
        removeGalleryPopup();
      });
  
  }

