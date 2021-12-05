/* export default function lazyLoadForVideo(videoBlock, videoSource, src) {

    if ("IntersectionObserver" in window) {
      var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(video) {
          if (video.isIntersecting) {
            videoSource.src = src;
    
            video.target.load();
            video.target.classList.remove("lazy");
    
            video.target.addEventListener('loadeddata', function() {
    
                video.target.classList.add("_visible");
    
            });

            lazyVideoObserver.unobserve(video.target);
          }
        });
      });
    
      lazyVideoObserver.observe(videoBlock);

    }
  
}

 */