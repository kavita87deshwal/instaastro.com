$(document).ready(function() {
    $("body").append(`<style>
    .bottom-menu{
      position: fixed;
      text-align: center;
      bottom: 0;
      left:0;
      width: 100%;
      overflow: hidden;
      margin-bottom: 0px;
      padding: 15px;
      background-color: #F4F4F4;
      display: none;
      border-top: 2px solid #676b6e;
    }

    .bottom-menu{
      float: right;
      font-size: 14px;
      z-index: 410000;
      font-weight: bold;
      margin-bottom: 0px;
    }

    .bottom-menu div{
      display: inline-block;
    }

    .bottom-menu div, .bottom-menu img{
      margin-right: 10px;
    }

    .chat-circle{
      padding: 5px;
      background-color: #EAEAEA;
      border-radius: 100%;
      /* border: 1px solid grey; */
    }

    #download-button{
      padding: 5px 10px;
      font-size: 12px;
      border-radius: 5px;
      color: white;
      display: none;
      background-color: #343A40;
      font-weight: bold;
    }
    .bottom-button{
      height:30px
    }
  </style>
  <div class="bottom-menu">
      <img class="chat-circle" src="https://staging-instaastro-static-files.s3.ap-south-1.amazonaws.com/static/img/chat-icon.svg"/>
      <div>Chat with Astrologers at ₹ 1</div>
      <div>
        <a href="https://instaastro.app.link/VvaBFpdsGob" class="download-button">
          <img src="https://instaastro-static-files.s3.amazonaws.com/static/img/android-app.png" class="bottom-button"/>
        </a>
      </div>
  </div>`);
});

function getMobileOperatingSystem() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (
        userAgent.match(/iPad/i) ||
        userAgent.match(/iPhone/i) ||
        userAgent.match(/iPod/i)
    ) {
        return "ios";
    } else if (userAgent.match(/Android/i)) {
        return "android";
    } else {
        return "unknown";
    }
}

function changeURL(deviceType) {
    if (deviceType == "unknown" || screen.width > 800) {
        $(".download-button").hide()
    } else {
        if (deviceType == "android") {
            $(".bottom-button").prop("src", "https://instaastro-static-files.s3.amazonaws.com/static/img/android-app.png")
        } else {
            $(".bottom-button").prop("src", "https://instaastro-static-files.s3.amazonaws.com/static/img/apple-app.png")
        }
        $(".download-button").show()
    }
}


$(document).ready(function() {
    let deviceType = getMobileOperatingSystem();
    $(document).scroll(function() {
        let topPosition = $(this).scrollTop();
        if (topPosition > 200 && deviceType != "unknown") {
            $(".bottom-menu").css("position", "fixed").fadeIn();
            changeURL(deviceType);
        } else {
            $(".bottom-menu").fadeOut();
        }
    });
    changeURL(deviceType);
});