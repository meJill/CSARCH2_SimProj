$(document).ready(function () {
    var Set = /** @class */ (function () {
        function Set(s_size, b_size) {
            this.set_blocks = [];
            this.set_size = s_size;
            for (var i = 0; i < b_size; i++) {
            }
        }
        return Set;
    }());
    var Block = /** @class */ (function () {
        function Block() {
        }
        return Block;
    }());
    $(".dropdown-toggle").next(".dropdown-menu").children().on("click", function () {
        $(this).closest(".dropdown-menu").prev(".dropdown-toggle").text($(this).text());
    });
    $("[name='bsa-table']").submit(function (event) {
        var loginForm = document.forms['bsa-table'];
        console.log(loginForm.elements.mm_size.value);
        console.log(loginForm.elements.mm_type.innerText);
        console.log(loginForm.elements.cache_size.value);
        console.log(loginForm.elements.cache_type.innerText);
        console.log(loginForm.elements.block_size.value);
        console.log(loginForm.elements.set_size.value);
        event.preventDefault();
    });
});
