/* button ripple effects start */
    window.addEventListener('click', (e)=>buttonRipple(e));
    function buttonRipple(event){
        let target = event.target;
        if(target.classList.contains("click_ripple_shine"))
        {
            let btn_info = target.getBoundingClientRect();
            let x = (event.clientX-btn_info.left),
                y = (event.clientY-btn_info.top);

            // now let's creat a span element
            let ripple_element = document.createElement('span');

            ripple_element.setAttribute('class', 'ripple_this');
            ripple_element.style.left = `${x}px`;
            ripple_element.style.top  = `${y}px`;

            target.appendChild(ripple_element);

            setTimeout(() => {
                ripple_element.remove();
            }, 800);
        }
    }
/* button ripple effects end */


/* modal start */
    /* this method for open modal start */
        window.addEventListener('click', (e)=>{
            if(e.target.dataset.modal)
            {
                open_modal(e.target.dataset.modal)
            }
        });
        
        function open_modal(modal_selector){
            let modals = document.querySelectorAll(modal_selector);
            modals.forEach(function(modal)
            {
                modal.classList.add('active');
            });
        }
    /* this method for open modal end */


    /* this method for close modal start */
        window.addEventListener('click', function(e){
            let status = false,
                modal  = '';
            
            if(e.target.classList.contains('modal_wraper')){
                status = true;
                modal  = e.target;
            }

            if(e.target.classList.contains('close') && e.target.closest('.modal_header,.modal_footer')){
                status = true;
                modal  = e.target.closest('.modal_wraper.active');
            }
            
            if(status)
            {
                modal.classList.add("modal_close_animation");

                let modal_container = modal.querySelector('.modal_container');
                if(modal_container)
                {
                    modal_container.addEventListener('animationend', function(e){
                        if(e.animationName == 'modal_close_animation')
                        {
                            modal.classList.remove('modal_close_animation');
                            modal.classList.remove('active');
                        }
                    });
                }
            }
            
        });
    /* this method for close modal end */
/* modal end */

/* alert close start */
let alert_close_icons = document.querySelectorAll('.alert>.close');
if(alert_close_icons)
{
    alert_close_icons.forEach((alert_close_icon)=>{
        alert_close_icon.addEventListener('click', function()
        {
            this.closest('.alert').classList.add('close');
            
            this.closest('.alert').addEventListener('transitionend', function(event){
                if(event.propertyName=='transform')
        {
            this.remove();
        }
      });
    });
});
}
/* alert close end */