// home.js
// Toggle gallery visibility and smooth-scroll when the "View paintings" button is clicked
console.log('home.js loaded');
document.addEventListener('DOMContentLoaded', function(){
  var btn = document.getElementById('viewPaintingsBtn');
  var gallery = document.getElementById('gallery');
  if(!btn || !gallery) return;
  var firstFocusable;
  btn.addEventListener('click', function(){
    console.log('home.js click');
    var showing = gallery.classList.toggle('visible');
    gallery.classList.toggle('hidden', !showing);
    gallery.setAttribute('aria-hidden', !showing);
    btn.setAttribute('aria-expanded', showing);
    if(showing){
      // focus the first card for keyboard users
      setTimeout(function(){
        gallery.scrollIntoView({behavior:'smooth',block:'start'});
        firstFocusable = gallery.querySelector('.card a, .card button, .card [tabindex], .card');
        if(firstFocusable) firstFocusable.focus();
      }, 60);
    } else {
      window.scrollTo({top:0,behavior:'smooth'});
      btn.focus();
    }
  });

  // allow Esc to close
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' || e.key === 'Esc'){
      if(!gallery.classList.contains('hidden')){
        gallery.classList.add('hidden');
        gallery.classList.remove('visible');
        gallery.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    }
  });
});
