$(window).scroll(function(){
    const scroll_top = $(this).scrollTop();  // scroll + free margin

    // create anchoer list
    const anchor_list = $(".drawer-menu-item").map((index, section)=>{
        const href = $(section).attr("href");
        if(href && href.indexOf("#") == 0) return href;
        else null;
    });

    // check anchor positions
    const positions = anchor_list.map((index, anchor)=>{
        if(!anchor) return -Infinity;
        return $(anchor).offset().top - scroll_top - $(window).height()/2;  // offset from screen org
    });

    // get large position's index in negative positions
    let max_pos = -Infinity;
    let max_index = -1;
    for(i = 0; i < positions.length; i++){
        if(max_index == i) continue;  // nothing to do
        if(positions[i] < 0){  // in negative potition
            if(positions[i] > max_pos){  // find large
                max_pos = positions[i];
                max_index = i;
            }
        }
    }

    // change history from scroll
    if(max_index == -1){
        history.replaceState(null, null, "#");
    }else{
        history.replaceState(null, null, anchor_list[max_index]);
    }
});