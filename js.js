//menu togle //
$(".burger").on("click", function () {
    $("#global").toggleClass("open");
    $(".burger").toggleClass("openb");
});

$(function () {
    $("#site-header-main").data("size", "big");
});

$(window).scroll(function () {
    console.log($(window).width());
    if ($(window).width() > 748) {
        if ($(document).scrollTop() > 0) {
            if ($("#site-header-main").data("size") == "big") {
                $("#site-header-main").data("size", "small");
                $("#site-header-main").stop().animate(
                    {
                        height: "10vh",
                    },
                    200
                );
            }
            $("header a:first")
                .stop()
                .css({ padding: "0.5rem", margin: "0.5rem ", width: "160px" });
        } else {
            if ($("#site-header-main").data("size") == "small") {
                $("#site-header-main").data("size", "big");
                $("#site-header-main ").stop().animate(
                    {
                        height: "50vh",
                    },
                    200
                );
                $("header a:first")
                    .stop()
                    .css({ padding: "2%", margin: "3%" })
                    .animate({ width: "38%" }, 200);
            }
        }
    }
});
