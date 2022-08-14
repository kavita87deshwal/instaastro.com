function myFunction() {
    var x = document.getElementById("otp-modal");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
myFunction();

function myFunction1() {
    var x = document.getElementById("phone-modal");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
let phonenumber;
$(document).on('submit', '#post-form', function(e) {
    e.preventDefault();
    phonenumber = phoneInput.getNumber();
    console.log(phonenumber);
    $.ajax({
        type: 'POST',
        url: '/v1/users/phone/login/',
        data: {
            phone_number: phonenumber,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(data) {
            if (data.message == "success") {
                myFunction1();
                myFunction();
                document.getElementById("phone-number").innerHTML = phonenumber
                document.getElementById("phone_number").value = phonenumber;
            }

        },
        error: function(request, status, error) {
            if (status == "error") {
                var x = document.getElementById("incorrectnumber");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
            }
        }
    });
});
$(document).on('submit', '#post-form-otp', function(e) {
    e.preventDefault();
    code1 = $('#otp-1').val();
    code2 = $('#otp-2').val();
    code3 = $('#otp-3').val();
    code4 = $('#otp-4').val();
    code5 = $('#otp-5').val();
    code6 = $('#otp-6').val();
    code = code1 + code2 + code3 + code4 + code5 + code6;
    $.ajax({
        type: 'POST',
        url: '/v1/users/phone/otp_verify/',
        data: {
            phone_number: $('#phone_number').val(),
            otp_key: code,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(data) {
            if (data.message == "Phone_verfied") {
                window.location.href = "/";
            }
        },
        error: function(request, status, error) {
            if (status == "error") {
                var x = document.getElementById("incorrectotp");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
            }
        }
    });
});
$('#resend-otp').click(function(event) {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/v1/users/phone/login/',
        data: {
            phone_number: phonenumber,
        },
        success: function(data) {},
    });
    $("#resend-otp").attr("disabled", "disabled");
    setTimeout(function() {
        $("#resend-otp").removeAttr("disabled");
    }, 30000);
    var countdownNum = 30;
    incTimer();

    function incTimer() {
        setTimeout(function() {
            if (countdownNum != 0) {
                countdownNum--;
                document.getElementById('timer').innerHTML = 'Resend Otp in ' + countdownNum + ' seconds';
                incTimer();
            } else {
                document.getElementById('timer').innerHTML = '';
            }
        }, 1000);
    }
});

function move(e, p, c, n) {
    var length = document.getElementById(c).value.length;
    var maxlength = document.getElementById(c).getAttribute("maxlength");
    if (length == maxlength) {
        if (n !== "") {
            document.getElementById(n).focus();
        }
    }
    if (e.key === "Backspace") {
        if (p !== "") {
            document.getElementById(p).focus();
        }
    }
}

function call() {
    var f = document.getElementById('content');
    if (f.innerHTML != null)
        document.getElementById("submit").disabled = false; //off
    if (f.innerHTML == '')
        document.getElementById("submit").disabled = true;
}