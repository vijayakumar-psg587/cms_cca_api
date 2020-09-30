
let flag_mouseover_added = false;
let flag_toggle_click = false;
function sidenav_onClick(){
   console.log('side nav hamburger clicked', document.getElementById('hamburger_icon'));
   console.log('side nav hamburger clicked', document.getElementById('span_nav_id').style.visibility);
   const hamburgerIconEl = document.getElementById('hamburger_icon');
   if(hamburgerIconEl.classList.contains('hamburger_icon_focus')) {
       hamburgerIconEl.classList.remove('hamburger_icon_focus')
       hamburgerIconEl.classList.add('hamburger_icon_unfocus')
   } else {
    hamburgerIconEl.classList.add('hamburger_icon_focus')
    hamburgerIconEl.classList.remove('hamburger_icon_unfocus')
   }
   
   const sideNavEl = document.getElementById('span_nav_id');
   const bodyDiv = document.getElementsByClassName('formatDiv')[0];
   console.log(sideNavEl.style)
   if(!flag_toggle_click) {
       bodyDiv.classList.remove('formatDiv_undoTransition')
       sideNavEl.classList.add('nav_transition');
       bodyDiv.classList.add('formatDiv_transition')
       
       flag_toggle_click = true;
   } else {
       sideNavEl.classList.remove('nav_transition');
       bodyDiv.classList.remove('formatDiv_transition')
       bodyDiv.classList.add('formatDiv_undoTransition')
       flag_toggle_click = false;
   }
  
}

function sidenav_hover(){
    
    const hamburgerIconEl = document.getElementById('hamburger_icon');
    hamburgerIconEl.classList.add('hamburger_icon_focus') 
}

function sidenav_mouseout() {
  
    const hamburgerIconEl = document.getElementById('hamburger_icon');
    hamburgerIconEl.classList.remove('hamburger_icon_focus') 
}

