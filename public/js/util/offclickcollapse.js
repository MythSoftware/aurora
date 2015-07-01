$(document).ready(function () {
    $(document).click(function (event) {
        var bFlag = false;
        var clickover = $(event.target);
        console.log(clickover.context);
        //var exactbtn = !clickover.hasClass('tester');
        var _opened = $("#navbar").hasClass("in");


        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $('#collapsebtn').click();
        }
    });
});
