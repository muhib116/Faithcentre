/* top navigation start */
let top_navigation_toggles = document.querySelectorAll('.top_navigation_toggle');
top_navigation_toggles.forEach((top_navigation_toggle)=>{
    top_navigation_toggle.addEventListener('click', function()
    {
        top_navigation_toggles.forEach((top_navigation_toggle)=>
        {
            toggle_class(top_navigation_toggle, 'active');
        });


        let navigation = document.querySelector('.top_navigation .navigation');
        toggle_class(navigation, 'active');
    });
});

function toggle_class(This, className){
    void(0);
    This.classList.toggle(className);
}
/* top navigation end */


/* statistics counter start */
let counters = document.querySelectorAll('.counter');
if(counters)
{
    counters.forEach(counter=>
    {
        start_count(counter, counter.dataset.limit)
    });
}

function start_count(element, upperLimit)
{
  let step         = 50,
      speed        = 60,
      stepValue    =  Math.ceil(upperLimit/step),
      currentValue = 0;
  
  let interval_id = setInterval(function()
  {
    if((currentValue+stepValue) <= upperLimit)
    {
      currentValue += stepValue;
    }else{
      currentValue = upperLimit;
      clearInterval(interval_id);
    }
    element.innerText = currentValue;
  }, speed);
}
/* statistics counter end */