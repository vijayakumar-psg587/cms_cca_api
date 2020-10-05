
let flag_mouseover_added = false;
let flag_toggle_click = false;

function sidenav_onClick(){
   console.log('side nav hamburger clicked', document.getElementById('hamburger_icon'));
   console.log('side nav hamburger clicked -visi', document.getElementById('span_nav_id').style);
   const hamburgerIconEl = document.getElementById('hamburger_icon');
   if(hamburgerIconEl.classList.contains('hamburger_icon_focus')) {
       hamburgerIconEl.classList.remove('hamburger_icon_focus')
       hamburgerIconEl.classList.add('hamburger_icon_unfocus')
   } else {
    hamburgerIconEl.classList.add('hamburger_icon_focus')
    hamburgerIconEl.classList.remove('hamburger_icon_unfocus')
   }
   
   const sideNavEl = document.getElementById('span_nav_id');
   console.log('sideNav el:', sideNavEl, sideNavEl.classList)
   console.log('falg toogle click:', flag_toggle_click)
   const bodyDiv = document.getElementsByClassName('formatDiv')[0];
   if(!flag_toggle_click) {
       console.log('coming in if toggle clikc:',flag_toggle_click);
       bodyDiv.classList.remove('formatDiv_undoTransition');
       sideNavEl.classList.add('nav_transition');
       bodyDiv.classList.add('formatDiv_transition');
       console.log('before setting true')
       flag_toggle_click = true;
   } else {
        console.log('coming in else toggle clikc:',flag_toggle_click);
       sideNavEl.classList.remove('nav_transition');
       bodyDiv.classList.remove('formatDiv_transition');
       bodyDiv.classList.add('formatDiv_undoTransition');
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

