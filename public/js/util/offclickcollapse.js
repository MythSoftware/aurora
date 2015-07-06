$(document).ready(function () {
    $(document).click(function (event) {
        var bFlag = false;
        var clickover = $(event.target);
        var _opened = $("#navbar").hasClass("in");


        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $('#collapsebtn').click();
        }
    });
});
