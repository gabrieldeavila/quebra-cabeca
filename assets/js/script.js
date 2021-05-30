const NAMES = [
  "bitcoin",
  "dogecoin",
  "vechain",
  "chainlink",
  "binance",
  "harmony",
  "matic",
  "waves",
];
const BLOCKS = 4;
var jogadas = 0,
  pontos = 0;

for (let a = 0; a < BLOCKS; a++) {
  var div = `<div id='div-${a}'></div>`;
  $("#root").append($(div));
  for (let b = 0; b < BLOCKS; b++) {
    $("#div-" + a).append(
      `<p class='memory' data-number='${a + "-" + b}'></p>`
    );
  }
}

function find_position(name) {
  var pos = () => Math.round(Math.random() * 10) % BLOCKS,
    block = $(`p[data-number= ${pos() + "-" + pos()}]`);
  if (!($(block).data("card") == undefined)) {
    find_position(name);
  } else {
    $(block).attr("data-card", name);
    $(block).html("");
    $(block).append('<img src="./assets/images/' + name + '.svg"/>');
  }
}

NAMES.forEach((name) => {
  find_position(name);
  find_position(name);
});

//click
var first = "",
second = "",
already = false,
kill
$(".memory").click((e) => {
  if (!already) {
    already = true
     kill = setInterval(() => {
      if (sec === 59) {
        $(".min").text(checkNumber(++min));
        sec = 0;
      } else {
        $(".sec").text(checkNumber(++sec));
      }
    }, 1000);
  }
  var clicked = e.target;
  if (
    $(clicked).hasClass("show") ||
    $(e.target).is("img") ||
    $(clicked).hasClass("right") ||
    (second != "" && first != "")
  )
    return 0;
  checkCards(clicked);
});

function checkCards(clicked) {
  if (first == "") {
    $(clicked).addClass("show");
    first = $("p[data-number='" + $(clicked).data("number") + "'");
  } else {
    $(".jogadas").text(++jogadas);
    second = clicked;
    if ($(clicked).data("card") == $(first).data("card")) {
      $(clicked).addClass("right");
      $(first).addClass("right");
      $(".pontos").text(++pontos);
      first = "";
      second = "";
      if (pontos === 8) {
        clearInterval(kill);
        $(".modal-background").css("display", "flex");
      }
    } else {
      $(clicked).addClass("wrong");
      $(first).addClass("wrong");
      $(first).removeClass("show");
      $(clicked).removeClass("show");
      setTimeout(() => {
        $(first).addClass("disappear");
        $(clicked).addClass("disappear");

        $(first).removeClass("wrong");
        $(clicked).removeClass("wrong");
        setTimeout(() => {
          $(first).removeClass("disappear");
          $(clicked).removeClass("disappear");
          second = "";
          first = "";
        }, 1);
      }, 1000);
    }
  }
}

//time
var sec = 00;
var min = 00;

function checkNumber(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}

$("button").click(() => {
  location.reload();
});
