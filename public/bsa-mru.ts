$(document).ready(()=> {
    class Set {
        set_size: number;
        set_blocks: Array<Block> = [];
        constructor(s_size: number, b_size: number){
            this.set_size = s_size
            for (let i = 0; i < b_size; i++) {
                this.set_blocks.push(new Block)
                
            }
        }
    }

    class Block {

    }
    
    $(".dropdown-toggle").next(".dropdown-menu").children().on("click",function(){
        $(this).closest(".dropdown-menu").prev(".dropdown-toggle").text($(this).text());
    });


    $( "[name='bsa-table']" ).submit(function( event ) {
        const loginForm = document.forms['bsa-table'];
        console.log(loginForm.elements.mm_size.value);
        console.log(loginForm.elements.mm_type.innerText);
        console.log(loginForm.elements.cache_size.value);
        console.log(loginForm.elements.cache_type.innerText);
        console.log(loginForm.elements.block_size.value);
        console.log(loginForm.elements.set_size.value);
        event.preventDefault();
      });
});