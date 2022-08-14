$(document).ready(function() {
    var today = new Date().toISOString().split('T')[0];
    $(".minCurrentDate").attr('max', today);
});

function validatedate(inputText) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!inputText.match(regEx)) {
        return false;
    } else {
        return true;
    }
}

function getSum(n) {
    let sum = 0;
    while (n > 0 || sum > 9) {
        if (n == 0) {
            n = sum;
            sum = 0;
        }
        sum = sum + n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}

function getDeathYear(date) {
    let val = getSum(date.getFullYear()) + getSum(date.getMonth()) + getSum(date.getDate());
    let result = new Date().getFullYear() + getSum(val) * 3;
    return result;
}

function validateEmptyDateFormForDeath() {
    var a = document.forms["death-Form"]["inputDOB"].value;
    var b = document.forms["death-Form"]["inputGender"].value;
    var dateFormatCheck = validatedate(a);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("death-erm1");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("death-erm1");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < a) {
        var y = document.getElementById("death-erm1");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("death-erm1");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (b == "" || b == null) {
        var x = document.getElementById("death-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("death-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function isValidDeathForm() {
    var check = validateEmptyDateFormForDeath();
    if (check) {
        var date = document.forms["death-Form"]["inputDOB"].value;
        let birthday = new Date(date);
        deathyear = getDeathYear(birthday);
        document.getElementById('death-year').innerHTML = deathyear;
        target = $("#custom-death-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}


let glist = {
    Male: 1,
    Female: 2
}
let zlist = {
    Areis: 1,
    Taurus: 2,
    Gemini: 3,
    Cancer: 4,
    Leo: 5,
    Virgo: 6,
    Libra: 7,
    Scorpio: 8,
    Sagittarius: 9,
    Capricorn: 10,
    Aquarius: 11,
    Pisces: 12
}

function getFriendshipScore(name1, name2, gender1, gender2, zodiac1, zodiac2, date1, date2) {
    console.log(name1, name2, gender1, gender2, date1, date2, zodiac1, zodiac2);
    let score = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let nameA1 = name1.split('');
    let nameA2 = name2.split('');
    for (let i = 0; i < nameA1.length; i++) {
        if (vowels.includes(nameA1[i])) {
            score += 5;
        } else if ('friends'.split('').includes(nameA1[i])) {
            score += 10;
        } else if (name2.includes(nameA1[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    for (let i = 0; i < nameA2.length; i++) {
        if (vowels.includes(nameA2[i])) {
            score += 5;
        } else if ('friends'.split('').includes(nameA2[i])) {
            score += 10;
        } else if (name1.includes(nameA2[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    score = score + SumOnDate(date1) + SumOnDate(date2) + zlist[zodiac1] + zlist[zodiac2] + glist[gender1] + glist[gender2];
    while (score > 100) {
        score = score % 100;
    }
    return score;
}

function SumOnDate(date) {
    let val = getSumForFriendship(date.getFullYear()) + getSumForFriendship(date.getMonth()) + getSumForFriendship(date.getDate());
    let result = getSum(val);
    return result;
}

function getSumForFriendship(n) {
    let sum = 0;
    while (n > 0 || sum > 9) {
        if (n == 0) {
            n = sum;
            sum = 0;
        }
        sum = sum + n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}

function validateEmptyDateFormForFrienship() {
    var c = document.forms["friendship-Form"]["inputDOB"].value;
    var b = document.forms["friendship-Form"]["inputGender"].value;
    var a = document.forms["friendship-Form"]["inputName"].value;
    var d = document.forms["friendship-Form"]["inputZodiac"].value;
    var g = document.forms["friendship-Form"]["inputFriendDOB"].value;
    var f = document.forms["friendship-Form"]["inputFriendGender"].value;
    var e = document.forms["friendship-Form"]["inputFriendName"].value;
    var h = document.forms["friendship-Form"]["inputFriendZodiac"].value;

    var dateFormatCheck = validatedate(c);
    var dateFormatCheck2 = validatedate(g);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == "" || a == null) {
        var x = document.getElementById("frienship-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == "" || b == null) {
        var x = document.getElementById("frienship-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("frienship-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("frienship-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < c) {
        var y = document.getElementById("frienship-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (d == "" || d == null) {
        var x = document.getElementById("frienship-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == "" || e == null) {
        var x = document.getElementById("frienship-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (f == "" || f == null) {
        var x = document.getElementById("frienship-erm6");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm6");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (g == null || g == "") {
        var x = document.getElementById("frienship-erm7");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck2 === false) {
        var y = document.getElementById("frienship-erm7");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < g) {
        var y = document.getElementById("frienship-erm7");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm7");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (h == "" || h == null) {
        var x = document.getElementById("frienship-erm8");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm8");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function isValidFriendshipForm() {
    var check = validateEmptyDateFormForFrienship();
    if (check) {
        var user_dob = document.forms["friendship-Form"]["inputDOB"].value;
        user_dob = new Date(user_dob);
        var user_gender = document.forms["friendship-Form"]["inputGender"].value;
        var user_name = document.forms["friendship-Form"]["inputName"].value;
        var user_zodiac = document.forms["friendship-Form"]["inputZodiac"].value;
        var friend_dob = document.forms["friendship-Form"]["inputFriendDOB"].value;
        friend_dob = new Date(friend_dob);
        var friend_gender = document.forms["friendship-Form"]["inputFriendGender"].value;
        var friend_name = document.forms["friendship-Form"]["inputFriendName"].value;
        var friend_zodiac = document.forms["friendship-Form"]["inputFriendZodiac"].value;
        score = getFriendshipScore(user_name, friend_name, user_gender, friend_gender, user_zodiac, friend_zodiac, user_dob, friend_dob);
        document.getElementById('friendship-score').innerHTML = score + "%";
        document.getElementById('user-name').innerHTML = user_name;
        document.getElementById('friend-name').innerHTML = friend_name;
        target = $("#custom-friendship-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}
// namamk starts here
function getSumForNamank(n) {
    let sum = 0;
    while (n > 0 || sum > 9) {
        if (n == 0) {
            n = sum;
            sum = 0;
        }
        sum = sum + n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}

function getNamankOnDate(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSumForNamank(val);
    return result;
}


// for validating for if there is any empty field
function validateEmptyDateFormForNamank() {
    var a = document.forms["destiny-Form"]["day"].value;
    var b = document.forms["destiny-Form"]["month"].value;
    var c = document.forms["destiny-Form"]["year"].value;
    var x = document.getElementById("destiny-erm4");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("destiny-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("destiny-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("destiny-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("destiny-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("destiny-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("destiny-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function validDateForNamank() {
    var a = document.forms["destiny-Form"]["day"].value;
    var b = document.forms["destiny-Form"]["month"].value;
    var c = document.forms["destiny-Form"]["year"].value;
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("destiny-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("destiny-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("destiny-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("destiny-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("destiny-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function isValidDestinyForm() {
    var check = validateEmptyDateFormForNamank();
    var checkdate = validDateForNamank();
    if (check) {
        var checkdate = validDateForNamank();
        if (checkdate) {
            var a = document.forms["destiny-Form"]["day"].value;
            var b = document.forms["destiny-Form"]["month"].value;
            var c = document.forms["destiny-Form"]["year"].value;
            var result = getNamankOnDate(a, b, c);
            var id = result.toString();
            var d = document.getElementById("destiny-number");
            d.className = "active";
            document.getElementById('destiny-number').innerHTML = result;
            document.getElementById(id).click();
        }
    }
}
//   destiny form validation ends here
//   namank ends here

// sun sign starts here
function validateEmptyDateFormForSunSign() {
    var a = document.forms["sun-sign-Form"]["day"].value;
    var b = document.forms["sun-sign-Form"]["month"].value;
    var c = document.forms["sun-sign-Form"]["year"].value;
    var x = document.getElementById("sun-sign-erm4");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("sun-sign-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("sun-sign-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("sun-sign-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("sun-sign-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("sun-sign-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("sun-sign-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function validDateForSunSign() {
    var a = document.forms["sun-sign-Form"]["day"].value;
    var b = document.forms["sun-sign-Form"]["month"].value;
    var c = document.forms["sun-sign-Form"]["year"].value;
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("sun-sign-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("sun-sign-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("sun-sign-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("sun-sign-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("sun-sign-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function SunSignCalculator(day, month) {
    let astro_sign = "";
    // checks month and date within the
    // valid range of a specified zodiac
    if (month == 12) {
        if (day < 22)
            astro_sign = "Sagittarius";
        else
            astro_sign = "Capricorn";
    } else if (month == 1) {
        if (day < 20)
            astro_sign = "Capricorn";
        else
            astro_sign = "Aquarius";
    } else if (month == 2) {
        if (day < 19)
            astro_sign = "Aquarius";
        else
            astro_sign = "Pisces";
    } else if (month == 3) {
        if (day < 21)
            astro_sign = "Pisces";
        else
            astro_sign = "Aries";
    } else if (month == 4) {
        if (day < 20)
            astro_sign = "Aries";
        else
            astro_sign = "Taurus";
    } else if (month == 5) {
        if (day < 21)
            astro_sign = "Taurus";
        else
            astro_sign = "Gemini";
    } else if (month == 6) {
        if (day < 21)
            astro_sign = "Gemini";
        else
            astro_sign = "Cancer";
    } else if (month == 7) {
        if (day < 23)
            astro_sign = "Cancer";
        else
            astro_sign = "Leo";
    } else if (month == 8) {
        if (day < 23)
            astro_sign = "Leo";
        else
            astro_sign = "Virgo";
    } else if (month == 9) {
        if (day < 23)
            astro_sign = "Virgo";
        else
            astro_sign = "Libra";
    } else if (month == 10) {
        if (day < 23)
            astro_sign = "Libra";
        else
            astro_sign = "Scorpio";
    } else if (month == 11) {
        if (day < 22)
            astro_sign = "Scorpio";
        else
            astro_sign = "Sagittarius";
    }
    return astro_sign;
}

function isValidSunSignForm() {
    var check = validateEmptyDateFormForSunSign();
    var checkdate = validDateForSunSign();
    if (check) {
        var checkdate = validDateForSunSign();
        if (checkdate) {
            list = ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio'];
            for (let i = 0; i < list.length; i++) {
                id = list[i];
                var x = document.getElementById(id);
                if (x.style.display === "block") {
                    x.style.display = "none";
                }
            }
            var a = document.forms["sun-sign-Form"]["day"].value;
            var b = document.forms["sun-sign-Form"]["month"].value;
            var c = document.forms["sun-sign-Form"]["year"].value;
            var result = SunSignCalculator(a, b);
            document.getElementById('sun-sign').innerHTML = " " + result;
            var x = document.getElementById(result);
            if (x.style.display === "none") {
                x.style.display = "block";
            }
            target = $("#custom-sunsign-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}


// love calculator begins from here
function validateEmptyDateFormForLove(b, c, d, a, e, f, g, h, i, j, k, l) {
    var x = document.getElementById("love-erm11");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (k == null || k == "") {
        var x = document.getElementById("love-gender1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-gender1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("love-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (l == null || l == "") {
        var x = document.getElementById("love-gender2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-gender2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (f == null || f == "") {
        var x = document.getElementById("love-erm6");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm6");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (g == null || g == "") {
        var x = document.getElementById("love-erm7");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm7");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (h == null || h == "") {
        var x = document.getElementById("love-erm8");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm8");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (i == null || i == "") {
        var x = document.getElementById("love-erm13");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm9");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else if (i < 0 || i > 100) {
        var x = document.getElementById("love-erm9");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm13");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm9");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm13");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (j == null || j == "") {
        var x = document.getElementById("love-erm12");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm10");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else if (j < 0 || j > 100) {
        var x = document.getElementById("love-erm10");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm12");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm10");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm12");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function validDateForLoveTwins(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm12");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm12");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("love-erm12");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("love-erm12");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("love-erm12");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function validDateForLoveMale(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("love-erm11");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function validDateForLoveFemale(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("love-erm11");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getLoveScore(name1, name2, day1, month1, year1, day2, month2, year2, scale1, scale2) {
    let score = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let nameA1 = name1.split('');
    let nameA2 = name2.split('');
    for (let i = 0; i < nameA1.length; i++) {
        if (vowels.includes(nameA1[i])) {
            score += 5;
        } else if ('Love'.split('').includes(nameA1[i])) {
            score += 10;
        } else if (name2.includes(nameA1[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    for (let i = 0; i < nameA2.length; i++) {
        if (vowels.includes(nameA2[i])) {
            score += 5;
        } else if ('Love'.split('').includes(nameA2[i])) {
            score += 10;
        } else if (name1.includes(nameA2[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }

    score = score + getSum(day1) + getSum(month1) + getSum(year1) + getSum(day2) + getSum(month2) + getSum(year2) + parseInt(scale1) + parseInt(scale2);
    console.log(score);
    while (score > 100) {
        score = score % 100;
    }
    return score;
}

function isValidLoveForm() {
    var b = document.forms["love-Form"]["male-day"].value;
    var c = document.forms["love-Form"]["male-month"].value;
    var d = document.forms["love-Form"]["male-year"].value;
    var a = document.forms["love-Form"]["inputyourName"].value;
    var e = document.forms["love-Form"]["inputpartnerName"].value;
    var f = document.forms["love-Form"]["female-day"].value;
    var g = document.forms["love-Form"]["female-month"].value;
    var h = document.forms["love-Form"]["female-year"].value;
    var i = document.forms["love-Form"]["inputyourScore"].value;
    var j = document.forms["love-Form"]["inputpartnerScore"].value;
    var k = document.forms["love-Form"]["inputGender"].value;
    var l = document.forms["love-Form"]["partnerGender"].value;
    var check = validateEmptyDateFormForLove(b, c, d, a, e, f, g, h, i, j, k, l);
    var checkdate = validDateForLoveMale(b, c, d);
    checkdate = validDateForLoveFemale(f, g, h);
    if (check) {
        checkdate = validDateForLoveFemale(f, g, h);
        checkdate = validDateForLoveMale(b, c, d);
        if (checkdate) {
            score = getLoveScore(a, e, b, c, d, f, g, h, i, j);
            console.log(score);
            document.getElementById('love-score').innerHTML = score;
            target = $("#custom-love-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}

// love Compatibility
function validateEmptyDatecompatForLove(a, b, c, d, e, f) {
    var x = document.getElementById("love-erm11");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var x = document.getElementById("love-erm12");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("love-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (f == null || f == "") {
        var x = document.getElementById("love-erm6");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm6");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getloveCompatibility(date1, date2) {
    let d1 = getSum(date1);
    let d2 = getSum(date2);
    let val = Math.abs(d1 - d2);
    let score = val * 5;
    for (let i = 0; i < val; i++) {
        score += 5;
    }
    while (score > 100) {
        score = score % 100;
    }
    return score;
}

function isValidLoveCompatibilityForm() {
    var a = document.forms["love-Form"]["day"].value;
    var b = document.forms["love-Form"]["month"].value;
    var c = document.forms["love-Form"]["year"].value;
    var d = document.forms["love-Form"]["normal-girl-day"].value;
    var e = document.forms["love-Form"]["normal-girl-month"].value;
    var f = document.forms["love-Form"]["normal-girl-year"].value;
    var check = validateEmptyDatecompatForLove(a, b, c, d, e, f);
    var checkdate = validDateForLoveMale(a, b, c);
    var girlcheckdate = validDateForLoveTwins(d, e, f);
    if (check) {
        checkdate = validDateForLoveMale(a, b, c);
        girlcheckdate = validDateForLoveTwins(d, e, f);
        if (checkdate && girlcheckdate) {
            score = getloveCompatibility(a, d);
            document.getElementById('love-score').innerHTML = score;
            target = $("#custom-love-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}

function checkEmptyFlameForm(a, b) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("lucky-color-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-color-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("lucky-color-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-color-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function checkEmptyLuckyColorForm(a, b) {
    var dateFormatCheck = validatedate(b);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("lucky-color-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-color-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("lucky-color-erm2");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("lucky-color-erm2");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < b) {
        var y = document.getElementById("lucky-color-erm2");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-color-erm2");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    return flag;
}

function getLuckyColorCalc(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSum(val);
    switch (result) {
        case 1:
            return {
                'lucky': ['Orange', 'Yellow', 'Gold'],
                'unlucky': ['Black', 'Maroon']
            }
        case 2:
            return {
                'lucky': ['Green', 'Yellow', 'Silver'],
                'unlucky': ['Red', 'Black']
            }
        case 3:
            return {
                'lucky': ['Yellow', 'Orange', 'Pink'],
                'unlucky': ['Black', 'Dark Blue', 'Dark Green']
            }
        case 4:
            return {
                'lucky': ['Blue'],
                'unlucky': ['Black']
            }
        case 5:
            return {
                'lucky': ['Grey'],
                'unlucky': ['Dark Green', ' Black']
            }
        case 6:
            return {
                'lucky': ['Dark Blue', 'Dark Green'],
                'unlucky': ['White', 'Yellow Rose']
            }
        case 7:
            return {
                'lucky': ['Light Green', ' Light Yellow', ' Light Blue'],
                'unlucky': ['Black', 'Red']
            }
        case 8:
            return {
                'lucky': ['Yellow', 'Dark Green', 'Dark Blue'],
                'unlucky': ['Black', 'Red']
            }
        case 9:
            return {
                'lucky': ['Red'],
                'unlucky': ['White']
            }
    }
    return {}
}

function isValidLuckyColorForm() {
    b = document.forms["lucky-color-Form"]["inputDOB"].value;
    a = document.forms["lucky-color-Form"]["inputname"].value;
    check = checkEmptyLuckyColorForm(a, b);
    if (check) {
        b = new Date(b);
        var year = b.getFullYear();
        var month = b.getMonth();
        var day = b.getDay();
        var colors = getLuckyColorCalc(day, month, year);
        var lucky_colors_together = "";
        var unlucky_colors_together = "";
        var lucky_colors = colors['lucky'];
        var unlucky_colors = colors['unlucky'];
        for (let i = 0; i < lucky_colors.length; i++) {
            if (lucky_colors_together === "") {
                lucky_colors_together += lucky_colors[i];
            } else {
                lucky_colors_together = lucky_colors_together + " " + lucky_colors[i];
            }

        }
        for (let i = 0; i < unlucky_colors.length; i++) {
            if (unlucky_colors_together === "") {
                unlucky_colors_together += unlucky_colors[i];
            } else {
                unlucky_colors_together = unlucky_colors_together + " " + unlucky_colors[i];
            }
        }
        console.log(lucky_colors_together);
        console.log(unlucky_colors_together);

        document.getElementById('lucky-colors').innerHTML = lucky_colors_together;
        document.getElementById('unlucky-colors').innerHTML = unlucky_colors_together;
        target = $("#custom-lucky-color-modal").attr('data-target-custom');
        $(target).modal('show');

    }

}

function checkEmptyMarriageForm(a, b, c) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("marriage-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("marriage-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("marriage-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("marriage-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("marriage-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("marriage-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function checkValidDateForMarriage(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("marriage-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("marriage-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("marriage-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("marriage-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("marriage-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getMarriageCalc(date, month, year) {
    // console.log(date.getDate());
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSum(val);
    return result;
}

function getMarriageNumberResult(result) {
    switch (result) {
        case 1:
            return "This is relationship suggests dynamism, enthusiasm and determination between both partners and this will be matched with complete wisdom and understanding. This relationship has been built on a heated passion that will turn into a mutual agreement to leading a responsible life"
        case 2:
            return "Two is a number of the couple so you will probably discover in time that you match just like puzzle pieces as long as you lean on each other and spend as much time together as possible. However, a number 2 divorce might be under the risk of possesivity and jealousy if the two of you don't know how to balance your impulses. It's also important for you to synchronize your activies or even work in the same domain. This marriage is also based on home comfort and you both have the desire to have a house and a big family."
        case 3:
            return "The number 3 is representative of communication, general love, and communication with others, but also faith in self, others and the world around you. Congratulations on your marriage!"
        case 4:
            return "Four is a number of the relationship. It describes equality, balance and fairness. It stands for logic, reason and stability. The number four is usually rational and practical. This combination indicates a stable relationship and enduring love. Their love helps them prosper in life and their partnership is sound due to their mellow temperaments and commitment to each other."
        case 5:
            return "Two passionate people, both with interests and hobbies that take them far from each other. The ideal companion for those who thrive on change and new encounters. If you like to explore different concepts and cultures, this is the ideal person for you. In marriage based on passion, you can count on your beloved to satisfy all your needs and desires. Until the very end of life, this is your number one choice!"
        case 6:
            return "The number 6 symbolizes good health, powerful feelings and is usually a lucky number that indicates mutual powerful feelings and love. Whether it be lust or heart-felt love, the number 6 is passionate and romantic. It is also practical and usually works hard to build a family."
        case 7:
            return "Number 7 relationship partners face their life together with great responsibility and support. These people form a couple based on intellectual affinity and cooperate in good confidence. They may have some moments when they feel stuck but these people often try to maintain their individuality while they build something new together."
        case 8:
            return "The number eight is the symbol of infinity. It is the ultimate goal for everyone – everlasting and continuous existence. This number is also related to a sense of protection, power and authority. While the number seven is somewhat gloomy, the number eight is optimistic and promising."
        case 9:
            return "You might have heard that Number 9 is all about Romance. And it is. This number is your relationship number if you are looking for an ideal marriage partner. Number 9's have the ability to express their feelings in a beautiful way and mostly they are known to be philanthropic too."
    }
    return {}
}

function isValidMarriageForm() {
    var a = document.forms["marriage-Form"]["day"].value;
    var b = document.forms["marriage-Form"]["month"].value;
    var c = document.forms["marriage-Form"]["year"].value;
    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {
            var score = getMarriageCalc(a, b, c);
            document.getElementById('marriage-score').innerHTML = score;
            console.log(score);
            document.getElementById('data-result').innerHTML = getMarriageNumberResult(score);
            target = $("#custom-marriage-modal").attr('data-target-custom');
            $(target).modal('show');
        }

    }

}


function checkEmptyLifeNumberForm(a, b, c) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("life-number-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("life-number-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("life-number-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("life-number-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("life-number-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("life-number-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function checkValidDateForLifeNumber(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("life-number-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("life-number-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("life-number-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("life-number-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("life-number-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getLifeNumberCalc(date, month, year) {
    // console.log(date.getDate());
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSum(val);
    return result;
}

function getLifePathCalc(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    val = getSum(val);
    if (val === 2) {
        return 11;
    } else if (val === 0) {
        return 9;
    }
    return val;

}

function isValidLifeNumberForm() {
    var a = document.forms["life-number-Form"]["day"].value;
    var b = document.forms["life-number-Form"]["month"].value;
    var c = document.forms["life-number-Form"]["year"].value;
    var check = checkEmptyLifeNumberForm(a, b, c);
    var validdate = checkValidDateForLifeNumber(a, b, c);
    if (check) {
        validdate = checkValidDateForLifeNumber(a, b, c);
        if (validdate) {
            var score = getLifePathCalc(a, b, c);
            for (let i = 1; i <= 9; i++) {
                if (i === 2) {
                    id = "text-";
                    id = id + "11";
                    var x = document.getElementById(id);
                    if (x.style.display === "block") {
                        x.style.display = "none";
                    }
                } else {
                    id = "text-";
                    id = id + i.toString();
                    var x = document.getElementById(id);
                    if (x.style.display === "block") {
                        x.style.display = "none";
                    }
                }
            }

            document.getElementById('life-number-score').innerHTML = score;
            id = "text-";
            id = id + score.toString();
            var x = document.getElementById(id);
            console.log(id);
            if (x.style.display === "none") {
                x.style.display = "block";
            }
            target = $("#custom-life-number-modal").attr('data-target-custom');
            $(target).modal('show');
        }

    }

}



/************************************************************************************* */
// hate calculator begins from here
function validateEmptyDateFormForHate(a, b, c, d, e, f, g) {
    var dateFormatCheck = validatedate(c);
    var dateFormatCheck2 = validatedate(f);
    const todayDate = new Date().toLocaleDateString('af-ZA');

    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("hate-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("hate-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("hate-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("hate-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("hate-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("hate-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < c) {
        var y = document.getElementById("hate-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("hate-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("hate-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("hate-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("hate-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("hate-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (f == null || f == "") {
        var x = document.getElementById("hate-erm6");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck2 === false) {
        var y = document.getElementById("hate-erm6");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < f) {
        var y = document.getElementById("hate-erm6");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("hate-erm6");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (g == null || g == "") {
        var x = document.getElementById("hate-erm7");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("hate-erm7");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getHateScore(name1, gender1, date1, name2, gender2, date2, known) {
    let score = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let nameA1 = name1.split('');
    let nameA2 = name2.split('');
    for (let i = 0; i < nameA1.length; i++) {
        if (vowels.includes(nameA1[i])) {
            score += 5;
        } else if ('Hate'.split('').includes(nameA1[i])) {
            score += 10;
        } else if (name2.includes(nameA1[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    for (let i = 0; i < nameA2.length; i++) {
        if (vowels.includes(nameA2[i])) {
            score += 5;
        } else if ('Hate'.split('').includes(nameA2[i])) {
            score += 10;
        } else if (name1.includes(nameA2[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    score = score + SumOnHateDate(new Date(date1)) + SumOnHateDate(new Date(date2)) + glist[gender1] + glist[gender2] + parseInt(known);
    while (score > 100) {
        score = score % 100;
    }
    return score;
}

function SumOnHateDate(date) {
    let val = getHateDateSum(date.getFullYear()) + getHateDateSum(date.getMonth()) + getHateDateSum(date.getDate());
    let result = getSum(val);
    return result;
}

function getHateDateSum(n) {
    let sum = 0;
    while (n > 0 || sum > 9) {
        if (n == 0) {
            n = sum;
            sum = 0;
        }
        sum = sum + n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}

function isValidHateForm() {
    var a = document.forms["hate-Form"]["inputPerson1Name"].value;
    var d = document.forms["hate-Form"]["inputPerson2Name"].value;
    var b = document.forms["hate-Form"]["inputPerson1Gender"].value;
    var e = document.forms["hate-Form"]["inputPerson2Gender"].value;
    var c = document.forms["hate-Form"]["inputPerson1Dob"].value;
    var f = document.forms["hate-Form"]["inputPerson2Dob"].value;
    var g = document.forms["hate-Form"]["inputKnowYear"].value;

    var check = validateEmptyDateFormForHate(a, b, c, d, e, f, g);
    if (check) {
        score = getHateScore(a, b, c, d, e, f, g);
        document.getElementById('person-name-1').innerHTML = a;
        document.getElementById('person-name-2').innerHTML = d;
        document.getElementById('meter-score').innerHTML = score;
        target = $("#custom-hate-modal").attr('data-target-custom');
        $(target).modal('show');

        $(".hate-calculator-value").each(function() {
            var $bar = $(this).find(".bar");
            var $val = $(this).find("#meter-score");
            var perc = parseInt(score, 10);
            $({
                p: 0
            }).animate({
                p: perc
            }, {
                duration: 2000,
                easing: "swing",
                step: function(p) {
                    $bar.css({
                        transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
                    });
                    $val.text(p | 0);
                }
            });
        });
    }
}

// Flames Calculator begins from here

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

const flamesDataSet = {
    1: 'Friendship',
    2: 'Love',
    3: 'Affection',
    4: 'Marriage',
    5: 'Enemy',
    6: 'Sibling'
}

function isValidFlamesForm() {
    var a = document.forms["flames-Form"]["inputName"].value;
    var b = document.forms["flames-Form"]["inputPersonName"].value;
    var check = checkEmptyFlameForm(a, b);
    if (check) {
        let str1 = a.split('');
        let str2 = b.split('');
        let i = 0;
        while (str1.length > 0 && i < str1.length) {
            let val = str1[i];
            if (str2.includes(val)) {
                removeItemOnce(str2, val);
                removeItemOnce(str1, val);
            } else {
                i++;
            }
        }
        document.getElementById('flames-score').innerHTML = flamesDataSet[(str2.length + str1.length) % 6];
        document.getElementById('flames-score-name').innerHTML = a;
        document.getElementById('flames-score-person-name').innerHTML = b;
        target = $("#custom-flames-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}


// Secret Crush Calculator begins from here

function isValidSecretCrushForm() {
    var str1 = document.forms["secret-crush-Form"]["inputName"].value;
    var str2 = document.forms["secret-crush-Form"]["inputPersonName"].value;
    var check = checkEmptyFlameForm(str1, str2);
    if (check) {
        let a = str1.toLowerCase();
        let b = str2.toLowerCase();
        let score = 0;
        let vowels = ['a', 'e', 'i', 'o', 'u'];
        let nameA1 = a.split('');
        let nameA2 = b.split('');
        for (let i = 0; i < nameA1.length; i++) {
            if (vowels.includes(nameA1[i])) {
                score += 5;
            } else if ('Crush'.split('').includes(nameA1[i])) {
                score += 10;
            } else if (b.includes(nameA1[i])) {
                score += 15;
            } else {
                score += 0;
            }
        }
        for (let i = 0; i < nameA2.length; i++) {
            if (vowels.includes(nameA2[i])) {
                score += 5;
            } else if ('Crush'.split('').includes(nameA2[i])) {
                score += 10;
            } else if (a.includes(nameA2[i])) {
                score += 15;
            } else {
                score += 0;
            }
        }
        while (score > 100) {
            score = score % 100;
        }

        document.getElementById('secret-crush-score').innerHTML = score;
        document.getElementById('secret-crush-name').innerHTML = a;
        document.getElementById('secret-crush-person-name').innerHTML = b;
        target = $("#custom-secret-crush-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}

// Life Span Calculator begins from here

function getLifeSpanYear(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = ((new Date().getFullYear()) - year) + getSum(val) * 3;
    return result;
}

function isValidLifeSpanForm() {
    var a = document.forms["life-span-Form"]["day"].value;
    var b = document.forms["life-span-Form"]["month"].value;
    var c = document.forms["life-span-Form"]["year"].value;
    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {
            var score = getLifeSpanYear(a, b, c);
            document.getElementById('life-span-score').innerHTML = score;
            target = $("#custom-life-span-modal").attr('data-target-custom');
            $(target).modal('show');
        }

    }

}

// Minor Expression calculator begins from here
let dataset = {
    'a': 1,
    'j': 1,
    's': 1,
    'b': 2,
    'k': 2,
    't': 2,
    'c': 3,
    'l': 3,
    'u': 3,
    'd': 4,
    'm': 4,
    'v': 4,
    'e': 5,
    'n': 5,
    'w': 5,
    'f': 6,
    'o': 6,
    'x': 6,
    'g': 7,
    'p': 7,
    'y': 7,
    'h': 8,
    'q': 8,
    'z': 8,
    'i': 9,
    'r': 9,
    ' ': 0,
}

function validateEmptyExpressionForm(a) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("expression-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("expression-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getExpressionScore(name) {
    let score = 0;
    for (let i = 0; i < name.length; i++) {
        score = score + dataset[name.charAt(i)];
    }
    let result = getSum(score);
    return result;
}

function getExpressionNumberResult(result) {
    switch (result) {
        case 1:
            return "You're a born leader with great ambition, fearlessness, and influence. However, be careful of your perfectionist preferences, which may undermine your ability to be content in relationships."
        case 2:
            return "You're a pleasant, intuitive person with a sensitive soul and great at working with others. Your one downside is that you may be easily harmed due to your openness, so maintaining personal limitations is essential."
        case 3:
            return "You're inspiring, expressive, and energetic, quickly lifting the spirits of others and flourishing in any social situation. On the other hand, you're so innovative that you may find it hard to devote yourself to any one thing to get the best out of it!"
        case 4:
            return "You are an organised, caring person with an excellent eye for detail and sharpened problem-solving skills. The central spot for you to monitor is stubbornness. Don't let that characteristic stop you from forgiving or looking at alternative solutions."
        case 5:
            return "You are a person who loves excitement, freedom, and diversity of adventure. Excellent communication skills make you eligible for a vast range of careers, but you must work on self-discipline if you're going to accomplish all you're capable of."
        case 6:
            return "As one of the most affectionate, devoted, and responsible people, you are ideal for caring professions and encouraging others in relationships. However, this also means that you are at risk of overlooking your own needs, so make time for yourself."
        case 7:
            return "You are parched for knowledge, have a gift for exploring information, and maybe especially fit in scientific or technical fields. But don't let your rich inner life stop you from bonding with others. They have much to offer and will appreciate hearing your thoughts on it."
        case 8:
            return "No goal is beyond your abilities or drives due to your competitive streak and determination to get things done. You may be drawn to a materialistic lifestyle at first, but if you can understand the intangible and the spiritual value, you will thrive."
        case 9:
            return "You're a romantic person who gives everyone a fair chance and is motivated by the idea of the greater good. The primary struggle for your number grows to be authentic self-expression, so try to trust that others will react positively when you share your feelings."
        case 11:
            return "You have incredible power, but you probably don't know this (though you may always have had a sense of being 'different' somehow). You have intense empathy and are innately in tune with the world. This can be good for you, but you need to understand how to ground yourself (e.g., meditation and time alone)."
    }
    return {}
}

function isValidExpressionForm() {
    var textValue = document.forms["expression-Form"]["inputName"].value;
    let a = textValue.toLowerCase();
    var check = validateEmptyExpressionForm(a);
    if (check) {
        score = getExpressionScore(a);
        document.getElementById('expression-score').innerHTML = score;
        document.getElementById('data-result').innerHTML = getExpressionNumberResult(score);
        target = $("#custom-expression-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}

// Personality Number calculator begins from here

function getPersonalityScore(name) {
    let str = name.toLowerCase();
    let score = 0;
    for (let i = 0; i < str.length; i++) {
        let val = str.charAt(i);
        if (val !== "a" && val !== "e" && val !== "i" && val !== "o" && val !== "u") {
            score = score + dataset[str.charAt(i)];
        }
    }
    let result = getSum(score);
    return result;
}

function getPersonalityNumberResult(result) {
    switch (result) {
        case 1:
            return "Those with Personality Number 1 give off ambitious and dynamic energy. You appear determined, strong-willed, in control and capable of accomplishing whatever you set your mind to, so others are less likely to see you as a pushover. But, on the other hand, be cautious of being egotistical and intimidating."
        case 2:
            return "Those with Personality Number 2 are often perceived as friendly, trustworthy, reliable, unpretentious and warm. You appear more open and approachable, and as a result, people are likely to be drawn and ask you for help or assistance. On the other hand, be wary of being seen as indecisive and a pushover by a few."
        case 3:
            return "Those with Personality Number 3 are often believed to be creative and charming individuals, making them more appealing to the opposite sex. You are likely seen as witty, extroverted, and optimistic, with powerful energy. Be wary of exaggerating and emerging superficial to some."
        case 4:
            return "Ones with Personality Number 4 are called reliable, stable, organized, and efficient by others. Such people are more likely to put faith in you and your judgment and ability to get things done, particularly when making challenging business judgments. However, be wary of seeming too frugal, predictable and overly severe."
        case 5:
            return "Those with Personality Number 5 appear more adventurous, stimulating, passionate and witty. Your freedom-loving and adventurous personality is often the envy of others, and you can be an inspiring influence on those around you. However, because you can seem aloof, some may not think of you as a dependable person. Be wary of looking superficial, and be more grounded."
        case 6:
            return "People with Personality Number 6 are often seen as warm, compassionate, caring, self-sacrificing and willing to help others. People often come to you for a shoulder to cry on or tell you about their life's burdens. You are seen as easygoing, but many may try to take advantage of you because you are also more agreeable."
        case 7:
            return "People with Personality Number 7 appear more secretive, introverted and mysterious. Because they seem withdrawn, people find it harder to get to know the true you. On the other hand, you have a serious, independent and intelligent aura, and as such, others are likely to trust and respect you. However, be wary of emerging too opinionated and arrogant."
        case 8:
            return "Ones with Personality Number 8 are often seen as ambitious, competitive, competent, and confident. You can deliver an aura of authority and power, and people tend to see you as well-rounded and grounded, with good decision-making abilities and business sense. However, be wary of appearing too selfish and greedy."
        case 9:
            return "Those nine personality numbers give off a charismatic and aristocratic appearance. People see them as being in control, with optimistic and idealistic opinions, and as such, they can inspire and influence those around them, gaining following and admiration. However, be wary of seeming arrogant and above others."
    }
    return {}
}

function isValidPersonalityForm() {
    var a = document.forms["personality-Form"]["inputName"].value;
    var check = validateEmptyExpressionForm(a);
    if (check) {
        score = getPersonalityScore(a);
        document.getElementById('personality-score').innerHTML = score;
        document.getElementById('data-result').innerHTML = getPersonalityNumberResult(score);
        target = $("#custom-personality-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}

// hate calculator begins from here
// function validateEmptyDateFormForHate(a, b, c, d, e, f, g) {
//     var flag = true;
//     if (a == null || a == "") {
//         var x = document.getElementById("hate-erm1");
//         if (x.style.display === "none") {
//             x.style.display = "block";
//         }
//         flag = false;
//     } else {
//         var x = document.getElementById("hate-erm1");
//         if (x.style.display === "block") {
//             x.style.display = "none";
//         }
//     }
//     if (b == null || b == "") {
//         var x = document.getElementById("hate-erm2");
//         if (x.style.display === "none") {
//             x.style.display = "block";
//         }
//         flag = false;
//     } else {
//         var x = document.getElementById("hate-erm2");
//         if (x.style.display === "block") {
//             x.style.display = "none";
//         }
//     }
//     if (c == null || c == "") {
//         var x = document.getElementById("hate-erm3");
//         if (x.style.display === "none") {
//             x.style.display = "block";
//         }
//         flag = false;
//     } else {
//         var x = document.getElementById("hate-erm3");
//         if (x.style.display === "block") {
//             x.style.display = "none";
//         }
//     }
//     if (d == null || d == "") {
//         var x = document.getElementById("hate-erm4");
//         if (x.style.display === "none") {
//             x.style.display = "block";
//         }
//         flag = false;
//     } else {
//         var x = document.getElementById("hate-erm4");
//         if (x.style.display === "block") {
//             x.style.display = "none";
//         }
//     }
//     if (e == null || e == "") {
//         var x = document.getElementById("hate-erm5");
//         if (x.style.display === "none") {
//             x.style.display = "block";
//         }
//         flag = false;
//     } else {
//         var x = document.getElementById("hate-erm5");
//         if (x.style.display === "block") {
//             x.style.display = "none";
//         }
//     }
//     if (f == null || f == "") {
//         var x = document.getElementById("hate-erm6");
//         if (x.style.display === "none") {
//             x.style.display = "block";
//         }
//         flag = false;
//     } else {
//         var x = document.getElementById("hate-erm6");
//         if (x.style.display === "block") {
//             x.style.display = "none";
//         }
//     }
//     if (g == null || g == "") {
//         var x = document.getElementById("hate-erm7");
//         if (x.style.display === "none") {
//             x.style.display = "block";
//         }
//         flag = false;
//     } else {
//         var x = document.getElementById("hate-erm7");
//         if (x.style.display === "block") {
//             x.style.display = "none";
//         }
//     }
//     return flag;
// }

// function getHateScore(name1,gender1,date1,name2,gender2,date2,known){
//     let score=0;
//     let vowels=['a','e','i','o','u'];
//     let nameA1=name1.split('');
//     let nameA2=name2.split('');
//     for(let i=0;i<nameA1.length;i++){
//         if(vowels.includes(nameA1[i])){
//             score+=5;
//         }
//         else if('Hate'.split('').includes(nameA1[i])){
//             score+=10;
//         }
//         else if(name2.includes(nameA1[i])){
//             score+=15;
//         }
//         else{
//             score+=0;
//         }
//     }
//     for(let i=0;i<nameA2.length;i++){
//         if(vowels.includes(nameA2[i])){
//             score+=5;
//         }
//         else if('Hate'.split('').includes(nameA2[i])){
//             score+=10;
//         }
//         else if(name1.includes(nameA2[i])){
//             score+=15;
//         }
//         else{
//             score+=0;
//         }
//     }
//     score = score + SumOnHateDate(new Date(date1)) + SumOnHateDate(new Date(date2)) + glist[gender1] + glist[gender2] + parseInt(known);
// 	while(score>100){
//         score=score%100;
//     }
//     return score;
// }

// function SumOnHateDate(date){
//     let val=getHateDateSum(date.getFullYear())+getHateDateSum(date.getMonth())+getHateDateSum(date.getDate());
//     let result=getSum(val);
//     return result;
// }

// function getHateDateSum(n) {
//     let sum = 0;
//     while (n > 0 || sum > 9) {
//             if(n == 0) {
//             n = sum;
//             sum = 0;
//             }
//             sum = sum + n % 10;
//             n = Math.floor(n / 10);
//     }
//     return sum;
// }

// function isValidHateForm() {
//     var a = document.forms["hate-Form"]["inputPerson1Name"].value;
//     var d = document.forms["hate-Form"]["inputPerson2Name"].value;
//     var b = document.forms["hate-Form"]["inputPerson1Gender"].value;
//     var e = document.forms["hate-Form"]["inputPerson2Gender"].value;
//     var c = document.forms["hate-Form"]["inputPerson1Dob"].value;
//     var f = document.forms["hate-Form"]["inputPerson2Dob"].value;
//     var g = document.forms["hate-Form"]["inputKnowYear"].value;
//     var check = validateEmptyDateFormForHate(a, b, c, d, e, f, g);
//     if (check) {
//         score = getHateScore(a, b, c, d, e, f, g);
//         document.getElementById('person-name-1').innerHTML = a;
//         document.getElementById('person-name-2').innerHTML = d;
//         document.getElementById('meter-score').innerHTML = score;
//         target = $("#custom-hate-modal").attr('data-target-custom');
//         $(target).modal('show');

//         $(".meter-calculator-value").each(function(){
//             var $bar = $(this).find(".bar");
//             var $val = $(this).find("#meter-score");
//             var perc = parseInt( score, 10);
//             $({p:0}).animate({p:perc}, {
//                 duration: 2000,
//                 easing: "swing",
//                 step: function(p) {
//                 $bar.css({
//                     transform: "rotate("+ (45+(p*1.8)) +"deg)",
//                 });
//                 $val.text(p|0);
//                 }
//             });
//         });
//     }
// }

// Wife and Husband Calculator begins from here

function getWifeScore(str1, str2, ques1, ques2, weddingtype, anivdate, known) {
    let score = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let name1 = str1.toLowerCase();
    let name2 = str2.toLowerCase();
    let nameA1 = name1.split('');
    let nameA2 = name2.split('');
    for (let i = 0; i < nameA1.length; i++) {
        if (vowels.includes(nameA1[i])) {
            score += 5;
        } else if ('Love'.split('').includes(nameA1[i])) {
            score += 10;
        } else if (name2.includes(nameA1[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    for (let i = 0; i < nameA2.length; i++) {
        if (vowels.includes(nameA2[i])) {
            score += 5;
        } else if ('Love'.split('').includes(nameA2[i])) {
            score += 10;
        } else if (name1.includes(nameA2[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    score = score + (parseInt(ques1) * 3) + (parseInt(ques2) * 3) + parseInt(weddingtype) + SumOnAnyDate(anivdate) + parseInt(known);
    while (score > 100) {
        score = score % 100;
    }
    return score;
}

function SumOnAnyDate(dates) {
    var date = new Date(dates);
    let val = getSum(date.getFullYear()) + getSum(date.getMonth()) + getSum(date.getDate());
    let result = getSum(val);
    return result;
}


function checkEmptyWifeForm(a, b, c, d, e, f, g) {
    var dateFormatCheck = validatedate(f);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("wife-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("wife-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("wife-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("wife-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("wife-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("wife-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("wife-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("wife-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("wife-erm6");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("wife-erm6");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    var flag = true;
    if (f == null || f == "") {
        var x = document.getElementById("wife-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("wife-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < f) {
        var y = document.getElementById("wife-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("wife-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (g == null || g == "") {
        var x = document.getElementById("wife-erm7");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("wife-erm7");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function isValidWifeForm() {
    var a = document.forms["wife-Form"]["inputName"].value;
    var b = document.forms["wife-Form"]["inputPartnerName"].value;
    var c = document.forms["wife-Form"]["cheatOnPast"].value;
    var d = document.forms["wife-Form"]["loveFirstSight"].value;
    var e = document.forms["wife-Form"]["weddingType"].value;
    var f = document.forms["wife-Form"]["marriageDate"].value;
    var g = document.forms["wife-Form"]["relationship"].value;
    var check = checkEmptyWifeForm(a, b, c, d, e, f, g);
    if (check) {
        f = new Date(f);
        var score = getWifeScore(a, b, c, d, e, f, g);
        document.getElementById('meter-score').innerHTML = score;
        target = $("#custom-wife-modal").attr('data-target-custom');
        $(target).modal('show');

        $(".meter-calculator-value").each(function() {
            var $bar = $(this).find(".bar");
            var $val = $(this).find("#meter-score");
            var perc = parseInt(score, 10);
            $({
                p: 0
            }).animate({
                p: perc
            }, {
                duration: 2000,
                easing: "swing",
                step: function(p) {
                    $bar.css({
                        transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
                    });
                    $val.text(p | 0);
                }
            });
        });
    }
}


// Breakup Calculator begins from here

function checkEmptyBreakupForm(a, b, c, d, e) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("breakup-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("breakup-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("breakup-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("breakup-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("breakup-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("breakup-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("breakup-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("breakup-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("breakup-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("breakup-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getBreakUpScore(str1, str2, ques1, ques2, yearKnown) {
    let score = 0;
    let name1 = str1.toLowerCase();
    let name2 = str2.toLowerCase();
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let nameA1 = name1.split('');
    let nameA2 = name2.split('');
    for (let i = 0; i < nameA1.length; i++) {
        if (vowels.includes(nameA1[i])) {
            score += 5;
        } else if ('Love'.split('').includes(nameA1[i])) {
            score += 10;
        } else if (name2.includes(nameA1[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }

    for (let i = 0; i < nameA2.length; i++) {
        if (vowels.includes(nameA2[i])) {
            score += 5;
        } else if ('Love'.split('').includes(nameA2[i])) {
            score += 10;
        } else if (name1.includes(nameA2[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    score = score + (parseInt(ques1) * 10) + (parseInt(ques2) * 10) + parseInt(yearKnown);
    while (score > 100) {
        score = score % 100;
    }
    return score;
}

function isValidBreakupForm() {
    var a = document.forms["breakup-Form"]["inputName"].value;
    var b = document.forms["breakup-Form"]["inputPartnerName"].value;
    var c = document.forms["breakup-Form"]["cheatOnPast"].value;
    var d = document.forms["breakup-Form"]["loveFirstSight"].value;
    var e = document.forms["breakup-Form"]["relationship"].value;
    var check = checkEmptyBreakupForm(a, b, c, d, e);
    if (check) {
        var score = getBreakUpScore(a, b, c, d, e);
        document.getElementById('person-name-1').innerHTML = a;
        document.getElementById('person-name-2').innerHTML = b;
        document.getElementById('meter-score').innerHTML = score;
        target = $("#custom-breakup-modal").attr('data-target-custom');
        $(target).modal('show');

        $(".meter-calculator-value").each(function() {
            var $bar = $(this).find(".bar");
            var $val = $(this).find("#meter-score");
            var perc = parseInt(score, 10);
            $({
                p: 0
            }).animate({
                p: perc
            }, {
                duration: 2000,
                easing: "swing",
                step: function(p) {
                    $bar.css({
                        transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
                    });
                    $val.text(p | 0);
                }
            });
        });
    }
}

// Secret Crush Calculator begins from here
function isValidSecretCrushForm() {
    var str1 = document.forms["secret-crush-Form"]["inputName"].value;
    var str2 = document.forms["secret-crush-Form"]["inputPersonName"].value;
    var check = checkEmptyFlameForm(str1, str2);
    if (check) {
        let a = str1.toLowerCase();
        let b = str2.toLowerCase();
        let score = 0;
        let vowels = ['a', 'e', 'i', 'o', 'u'];
        let nameA1 = a.split('');
        let nameA2 = b.split('');
        for (let i = 0; i < nameA1.length; i++) {
            if (vowels.includes(nameA1[i])) {
                score += 5;
            } else if ('Crush'.split('').includes(nameA1[i])) {
                score += 10;
            } else if (b.includes(nameA1[i])) {
                score += 15;
            } else {
                score += 0;
            }
        }
        for (let i = 0; i < nameA2.length; i++) {
            if (vowels.includes(nameA2[i])) {
                score += 5;
            } else if ('Crush'.split('').includes(nameA2[i])) {
                score += 10;
            } else if (a.includes(nameA2[i])) {
                score += 15;
            } else {
                score += 0;
            }
        }
        while (score > 100) {
            score = score % 100;
        }

        document.getElementById('secret-crush-score').innerHTML = score;
        document.getElementById('secret-crush-name').innerHTML = a;
        document.getElementById('secret-crush-person-name').innerHTML = b;
        target = $("#custom-secret-crush-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}

// Name Compatibility begins from here

let compatibility_set = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 8,
    g: 3,
    h: 5,
    i: 1,
    j: 1,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    o: 7,
    p: 8,
    q: 1,
    r: 2,
    s: 3,
    t: 4,
    u: 6,
    v: 6,
    w: 6,
    x: 5,
    y: 1,
    z: 7,
    ' ': 9,
}

function validateEmptycompatibleForm(a, b) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("compatibility-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("compatibility-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("compatibility-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("compatibility-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function validateEmptycompatibilityForm(a, b) {
    var dateFormatCheck = validatedate(a);
    var dateFormatCheck2 = validatedate(b);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("compatibility-erm1");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("compatibility-erm1");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < a) {
        var y = document.getElementById("compatibility-erm1");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("compatibility-erm1");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("compatibility-erm2");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck2 === false) {
        var y = document.getElementById("compatibility-erm2");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < b) {
        var y = document.getElementById("compatibility-erm2");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("compatibility-erm2");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    return flag;
}

function getNameCompatibility() {
    var a = document.forms["name-compatibility-Form"]["inputBoyName"].value;
    var b = document.forms["name-compatibility-Form"]["inputGirlName"].value;
    var check = validateEmptycompatibleForm(a, b);
    if (check) {
        let d1 = getNamank(a);
        let d2 = getNamank(b);
        let val = Math.abs(d1 - d2);
        let score = val * 5;
        for (let i = 0; i < val; i++) {
            score += 5;
        }
        while (score > 100) {
            score = score % 100;
        }
        document.getElementById('compatibility-score').innerHTML = score;
        target = $("#custom-compatibility-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}

function getNamank(name) {
    let nameA = name.split('');
    let sum = 0;
    for (let i = 0; i < nameA.length; i++) {
        let val = nameA[i].toLowerCase();
        sum += compatibility_set[val];
    }
    let result = getSum(sum);
    return result;
}



// Challenge Number Calculator begins from here

function getChallengeNumberResult(result) {
    switch (result) {
        case 1:
            return "Number 1's are born leaders and determined persons. Therefore, they are inclined to grand leadership endeavours. The ideal careers for a number 1 personality are in management, business law, human resources, communications or innovation."
        case 2:
            return "The number 2s are both creative and diplomatic. They enjoy collective endeavours and making others happy."
        case 3:
            return "Number 3s are creative, good communicators and inclined to artistic endeavours. The ideal careers for a number 3 personality are in artistic fields: design, acting, music, photography; sports: athletism, swimming, tennis; law and accountancy."
        case 4:
            return "Number 4s are organised and responsible. They are inclined to building endeavours and careers in finance, IT and the building trades."
        case 5:
            return "Number 5s are inclined to versatile and mobile endeavours. The ideal careers for a number 5 personality are in: marketing, education, acting and commercial law."
        case 6:
            return "Are you a number 6? People with this personality type tend to be dependable and sensible. The ideal careers for a number personality are in:  - services: beautician, florist, caterer, law enforcement, clerk;  - arts: musician, designer, painter;  - architect, decorator, builder."
        case 7:
            return "Number 7s are inquisitive, they are curious. They would like to experience new things, new people and new ideas. They have the gift of imagination and have a great love of learning."
        case 8:
            return "People with a number 8 personality can have an inclination towards material endeavours, and so they trend towards careers in finance or law. They are competitive and dependable, which makes them ideal for many careers"
        case 9:
            return "Idealistic and compassionate, Number 9s often work in human sciences, social services or international affairs."
    }
    return {}
}

function isValidChallengeNumberForm() {
    var a = document.forms["challenge-number-Form"]["day"].value;
    var b = document.forms["challenge-number-Form"]["month"].value;
    var c = document.forms["challenge-number-Form"]["year"].value;

    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {
            let monthNum = getSum(b);
            let dateNum = getSum(a);
            let yearNum = getSum(c);

            let firstNum = Math.abs(monthNum - dateNum);
            let secNum = Math.abs(dateNum - yearNum);
            let thirdNum = Math.abs(firstNum - secNum);
            let forthNum = Math.abs(monthNum - yearNum);

            document.getElementById('first-challenge-number').innerHTML = firstNum;
            document.getElementById('challenge-1').innerHTML = getChallengeNumberResult(firstNum);
            document.getElementById('second-challenge-number').innerHTML = secNum;
            document.getElementById('challenge-2').innerHTML = getChallengeNumberResult(secNum);
            document.getElementById('third-challenge-number').innerHTML = thirdNum;
            document.getElementById('challenge-3').innerHTML = getChallengeNumberResult(thirdNum);
            document.getElementById('fourth-challenge-number').innerHTML = forthNum;
            document.getElementById('challenge-4').innerHTML = getChallengeNumberResult(forthNum);
            target = $("#custom-challenge-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}

//life period cycle number begin here

const datasetFirst = {
    '1': '26 or 27',
    '2': '25 or 26',
    '3': '33 or 34',
    '4': '32 or 33',
    '5': '31 or 32',
    '6': '30 or 31',
    '7': '29 or 30',
    '8': '28 or 29',
    '9': '27 or 28',
    '11': '25 or 26',
    '22': '32 or 33'
}

const datasetSecond = {
    '1': '53 or 54',
    '2': '52 or 53',
    '3': '60 or 61',
    '4': '59 or 60',
    '5': '58 or 59',
    '6': '57 or 58',
    '7': '56 or 57',
    '8': '55 or 56',
    '9': '54 or 55',
    '11': '52 or 53',
    '22': '59 or 60',
}

function getPeriodCycleNumberResult(result) {
    switch (result) {
        case 1:
            return "Those with Number 1 give off ambitious and dynamic energy. You appear determined, strong-willed, in control and capable of accomplishing whatever you set your mind to, so others are less likely to see you as a pushover. But, on the other hand, be cautious of being egotistical and intimidating."
        case 2:
            return "Those with Number 2 are often perceived as friendly, trustworthy, reliable, unpretentious and warm. You appear more open and approachable, and as a result, people are likely to be drawn and ask you for help or assistance. On the other hand, be wary of being seen as indecisive and a pushover by a few."
        case 3:
            return "Those with Number 3 are often believed to be creative and charming individuals, making them more appealing to the opposite sex. You are likely seen as witty, extroverted, and optimistic, with powerful energy. Be wary of exaggerating and emerging superficial to some."
        case 4:
            return "Ones with Number 4 are called reliable, stable, organized, and efficient by others. Such people are more likely to put faith in you and your judgment and ability to get things done, particularly when making challenging business judgments. However, be wary of seeming too frugal, predictable and overly severe."
        case 5:
            return "Those with Number 5 appear more adventurous, stimulating, passionate and witty. Your freedom-loving and adventurous personality is often the envy of others, and you can be an inspiring influence on those around you. However, because you can seem aloof, some may not think of you as a dependable person. Be wary of looking superficial, and be more grounded."
        case 6:
            return "People with Number 6 are often seen as warm, compassionate, caring, self-sacrificing and willing to help others. People often come to you for a shoulder to cry on or tell you about their life's burdens. You are seen as easygoing, but many may try to take advantage of you because you are also more agreeable."
        case 7:
            return "People with Number 7 appear more secretive, introverted and mysterious. Because they seem withdrawn, people find it harder to get to know the true you. On the other hand, you have a serious, independent and intelligent aura, and as such, others are likely to trust and respect you. However, be wary of emerging too opinionated and arrogant."
        case 8:
            return "Ones with Number 8 are often seen as ambitious, competitive, competent, and confident. You can deliver an aura of authority and power, and people tend to see you as well-rounded and grounded, with good decision-making abilities and business sense. However, be wary of appearing too selfish and greedy."
        case 9:
            return "Those nine numbers give off a charismatic and aristocratic appearance. People see them as being in control, with optimistic and idealistic opinions, and as such, they can inspire and influence those around them, gaining following and admiration. However, be wary of seeming arrogant and above others."
    }
    return {}
}

function isValidPerionCycleForm() {

    var a = document.forms["period-cycle-Form"]["day"].value;
    var b = document.forms["period-cycle-Form"]["month"].value;
    var c = document.forms["period-cycle-Form"]["year"].value;

    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {

            let LifNo = getSum(getSum(a) + getSum(b) + getSum(c));
            let monthNo = getSum(b);
            let fir = datasetFirst[LifNo];
            let dateNo = getSum(a);
            let sec = datasetSecond[LifNo];
            let yearNo = getSum(c);
            document.getElementById('lift-path-score').innerHTML = LifNo;
            document.getElementById('first-cycle-number').innerHTML = monthNo;
            document.getElementById('second-cycle-number').innerHTML = dateNo;
            document.getElementById('third-cycle-number').innerHTML = yearNo;
            document.getElementById('first-age-range-number').innerHTML = fir;
            document.getElementById('seond-age-range-number').innerHTML = sec;
            document.getElementById('number-1').innerHTML = getPeriodCycleNumberResult(monthNo);
            document.getElementById('number-2').innerHTML = getPeriodCycleNumberResult(dateNo);
            document.getElementById('number-3').innerHTML = getPeriodCycleNumberResult(yearNo);
            target = $("#custom-period-cycle-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}

// Soul Urge Number calculator begins from here
const soulset = {
    'a': 1,
    'u': 3,
    'e': 5,
    'o': 6,
    'y': 7,
    'i': 9,
    ' ': 0
}

function getSoulCalc(name) {
    let str = name.toLowerCase();
    let score = 0;
    for (let i = 0; i < str.length; i++) {
        let val = str.charAt(i);
        if (val === "a" || val === "e" || val === "i" || val === "o" || val === "u" || val === "y") {
            score = score + soulset[str.charAt(i)];
        }
    }
    let result = getSum(score);
    return result;
}


function getSoulUrgeNumberResult(result) {
    switch (result) {
        case 1:
            return "Soul urge number one symbolises independence and self-sufficiency. It is the sign of a great leader—confident in their abilities and unafraid to make challenging conclusions. If your heart's desire number is 1, your soul's urge is to be a boss. However, if your soul number is one, you may also have a competitive attitude that must be tamed."
        case 2:
            return "Do sad movies make you cry? Do you often switch off the news? If you've ended up with a soul number 2, you are an emotional soul. Your most tremendous urge is to feel secure and comfortable. While you may sometimes hate your sensitivity but behind it hides a beautiful asset—the powerful intuition. You must learn to trust it and stand up for what you feel is correct because your judgments are often spot on!"
        case 3:
            return "Are you drawn to art forms involving words? Are you an actor, writer, singer or a poet? Then your soul urges number spelt out 3. You're a born performer, and people love you for it. But it would help if you learned to express your more profound thoughts and emotions. You can do so through art. Thanks to your skills and charisma, you have all the makings of a truly thriving life."
        case 4:
            return "Do you prefer order than chaos? Do you crave stability and despise sudden change? You set an intelligent example of discipline and hard work for others. You approach any problem from a logical, measured and practical standpoint. But be careful not to make your companion or children feel inhibited by your desire for the system."
        case 5:
            return "If you got soul number 5, your soul urge is to learn and explore as much as possible. You have a charismatic character, and your enthusiasm is infectious. You might love to travel and explore new career paths. The main challenge is to face your fears. Though you have many admirers, you may be experiencing more anxiety in your life than they would."
        case 6:
            return "Soul number 6 represents harmony, balance, and diplomacy. You probably have a close and loyal friend circle if you came up with soul urge six. Caring for the well-being of your friends and family is a driving force for you. You do need to be appreciated. You give good advice and may reach your full potential in healing professions or the arts."
        case 7:
            return "You would be a very independent person if you got soul number 7 after adding each vowel. You despise beliefs that are based on 'thin air. There is a need for tangible evidence before you believe anything. You always seek the truth and ask deep, meaningful questions that take a lifetime to answer. It would be amazing to have a partner who would give you the space and independence you need, as neediness does not go well with you."
        case 8:
            return "Those with soul number 8 mainly focus on material assets. This can be anything from finances to legal matters to power and fortune. Though your purpose and ambition can help you flourish, they can also push you to take severe action. Even though you are great at making money, you may also be inclined to lose it just as quickly. To attain happiness, you must find a balance between your ambition and the bigger picture."
        case 9:
            return "If the vowels in your name show soul number 9, then you're greatly concerned with global consciousness. You might be motivated by serving others to your own needs. On the other hand, you have excellent mental clarity. The vibrational energy of the number 9 is substantial. Sometimes, it may conquer your more selfish drives. As a result, you may be more romantic, generous and unselfish than others."
        case 11:
            return "Soul number 11 is the master number. If your heart's desired number is 11, you are on a unique spiritual journey in this lifetime. 11 is a number with incredible strength and power. But acquiring it and growing into it can be not easy—most people with heart's desire number 11 start under challenging circumstances."
        case 22:
            return "A Soul number 22 inner desire is to somehow leave a mark on this world. In which area is entirely up to you. It may be in finances, spirituality, and even politics. Soul number 22 has the power and intuitive knowledge of the heart's desire number 11. But not only that. It also has the applicable aptitude of number 4. Together, these qualities make a potent mix. People will hold you up to scrutiny because of admiration and envy. But don't let that hold you back. You know why you're here, on this planet. So have the courage to follow what your heart's desire number tells you."
    }
    return {}
}

function isValidSoulUrgeForm() {
    var a = document.forms["soul-urge-Form"]["inputName"].value;
    var check = validateEmptyExpressionForm(a);
    if (check) {
        score = getSoulCalc(a);
        document.getElementById('soul-urge-score').innerHTML = score;
        document.getElementById('data-result').innerHTML = getSoulUrgeNumberResult(score);
        target = $("#custom-soul-urge-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}

function getCareerNumberResult(result) {
    switch (result) {
        case 1:
            return "Number 1's are born leaders and determined persons. Therefore, they are inclined to grand leadership endeavours. The ideal careers for a number 1 personality are in management, business law, human resources, communications or innovation."
        case 2:
            return "The number 2s are both creative and diplomatic. They enjoy collective endeavours and making others happy."
        case 3:
            return "Number 3s are creative, good communicators and inclined to artistic endeavours. The ideal careers for a number 3 personality are in artistic fields: design, acting, music, photography; sports: athletism, swimming, tennis; law and accountancy."
        case 4:
            return "Number 4s are organised and responsible. They are inclined to building endeavours and careers in finance, IT and the building trades."
        case 5:
            return "Number 5s are inclined to versatile and mobile endeavours. The ideal careers for a number 5 personality are in: marketing, education, acting and commercial law."
        case 6:
            return "Are you a number 6? People with this personality type tend to be dependable and sensible. The ideal careers for a number personality are in:  - services: beautician, florist, caterer, law enforcement, clerk;  - arts: musician, designer, painter;  - architect, decorator, builder."
        case 7:
            return "Number 7s are inquisitive, they are curious. They would like to experience new things, new people and new ideas. They have the gift of imagination and have a great love of learning."
        case 8:
            return "People with a number 8 personality can have an inclination towards material endeavours, and so they trend towards careers in finance or law. They are competitive and dependable, which makes them ideal for many careers"
        case 9:
            return "Idealistic and compassionate, Number 9s often work in human sciences, social services or international affairs."
    }
    return {}
}

// inner dream number code begins here

function getInnerDreamNumberResult(result) {
    switch (result) {
        case 1:
            return "Are you someone who is very bold and has an array of leadership qualities? Then the inner dream number 1, which is influenced by the Sun, is your number! You are straightforward, honest, confident, and fierce. Don’t feel sad if people think of you as dominating. Try to make positive changes and know that your dominating personality will help you grow in life."
        case 2:
            return "The ruler over this number is the Moon. You are efficient at maintaining peace and avoiding conflict. Your compassionate and cooperative nature makes you easily approachable to your loved ones."
        case 3:
            return "The planet Jupiter is the ruler of this inner dream number. People like you who possess this number have immense creativity and innovative ideas. You are one of the few people who can manage to leave a lasting impression on everyone you meet."
        case 4:
            return "This number is ruled by the planet Uranus. You are a rigorous worker and can manage many tasks at a time. Many people tend to look up to you for your disciplined personality."
        case 5:
            return "Mercury extends its powers over this number, and thus people like you are known to be sensual, loving, open, and extrovertive. Your funny personality helps you warm up to people very quickly."
        case 6:
            return "Venus’ influence is apparent on this number. People like you are responsible, supportive, and helpful. Your loving and empathetic energy makes everyone feel safe around you."
        case 7:
            return "Neptune influences the number 7. As much as you are elegant, you also possess a certain level of wariness. You may be unwilling to trust people immediately, but once you let your guard down, you’re one of the most pleasing people to be around."
        case 8:
            return "The inner dream number 8 is under the power of Saturn. This number constitutes the double characteristics of the number 4. You are honest, methodical, diligent, magnetic, and have a dynamic personality."
        case 9:
            return "Mars is the ruler of this number. You are knowledgeable and intellectual and possess good tolerance and even better communication skills."
        case 11:
            return "The Moon influences this number heavily. If you possess this number, then you have a very welcoming aura. Your warmth and cooperative attitude make you very likeable to others. You are also highly spiritually inclined."
        case 22:
            return "This number is influenced by the planet Uranus, therefore, making you thoughtful, honest, loyal, ambitious, and spiritual."
        case 33:
            return "Also ruled by the planet Venus, this number is known to enhance relationships. If your inner dream number is 33, you are someone who is friendly, amiable, kind and has a reputation for being a fierce protector of your loved ones."
    }
    return {}
}

function getNewSum(n) {
    let sum = 0;
    while (n > 0 || sum > 9) {
        if (n == 0) {
            n = sum;
            sum = 0;
        }
        if (n === sum) {
            if (n === 1) {
                return 11;
            }
            if (n === 2) {
                return 22;
            }
            if (n === 3) {
                return 33;
            }
        }
        sum = sum + n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}

function getInnerDreamCalc() {
    var a = document.forms["innerDream-Form"]["inputName"].value;
    var check = validateEmptyExpressionForm(a);
    if (check) {
        let str = a.toLowerCase();
        let score = 0;
        for (let i = 0; i < str.length; i++) {
            let val = str.charAt(i);
            if (val !== "a" && val !== "e" && val !== "i" && val !== "o" && val !== "u") {
                score += dataset[str.charAt(i)];
            }
        }
        let result = getNewSum(score);
        document.getElementById('inner-dream-score').innerHTML = result;
        document.getElementById('data-result').innerHTML = getInnerDreamNumberResult(result);
        target = $("#custom-inner-dream-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}


// Lucky Number Calculator begins from here

const sDataset = {
    'a': 1,
    'u': 3,
    'e': 5,
    'o': 6,
    'y': 7,
    'i': 9,
    ' ': 0
}

function getLuckyInnerDreamNumber(name) {
    let str = name.toLowerCase();
    let score = 0;
    for (let i = 0; i < str.length; i++) {
        let val = str.charAt(i);
        if (val !== "a" && val !== "e" && val !== "i" && val !== "o" && val !== "u") {
            score += dataset[str.charAt(i)];
        }
    }
    let result = getSum(score);
    return result;
}

function getLuckyPersonalityNo(name) {
    let str = name;
    let score = 0;
    for (let i = 0; i < str.length; i++) {
        let val = str.charAt(i);
        if (val !== "a" && val !== "e" && val !== "i" && val !== "o" && val !== "u") {
            score += dataset[str.charAt(i)];
        }
    }
    let result = getSum(score);
    return result;
}

function getLuckySoulCalc(name) {
    let str = name;
    let score = 0;
    for (let i = 0; i < str.length; i++) {
        let val = str.charAt(i);
        if (val === "a" || val === "e" || val === "i" || val === "o" || val === "u" || val === "y") {
            score += sDataset[str.charAt(i)];
        }
    }
    let result = getSum(score);
    return result;
}

function getLuckyDestiny(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSum(val);
    return result;
}

function getLuckyLifePathCalc(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSum(val);
    if (result === 2) {
        return 11;
    }
    return result;
}

function checkEmptyLuckyNumberForm(s, a, b, c) {
    var flag = true;
    if (s == null || s == "") {
        var x = document.getElementById("lucky-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (a == null || a == "") {
        var x = document.getElementById("lucky-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("lucky-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("lucky-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getLuckyNumber() {

    var s = document.forms["lucky-number-Form"]["inputName"].value;
    var a = document.forms["lucky-number-Form"]["day"].value;
    var b = document.forms["lucky-number-Form"]["month"].value;
    var c = document.forms["lucky-number-Form"]["year"].value;

    var check = checkEmptyLuckyNumberForm(s, a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {

            let str = s.toLowerCase();
            let innerDreamNumber = getLuckyInnerDreamNumber(str);
            let soulNumber = getLuckySoulCalc(str);
            let personalityNumber = getLuckyPersonalityNo(str);
            let destinyNumber = getLuckyDestiny(a, b, c);
            let lifePathNumber = getLuckyLifePathCalc(a, b, c);

            document.getElementById('lucky-name').innerHTML = s;
            document.getElementById('innerDreamNumber').innerHTML = innerDreamNumber;
            document.getElementById('soulNumber').innerHTML = soulNumber;
            document.getElementById('personalityNumber').innerHTML = personalityNumber;
            document.getElementById('destinyNumber').innerHTML = destinyNumber;
            document.getElementById('lifePathNumber').innerHTML = lifePathNumber;
            target = $("#custom-lucky-number-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }

}

// Birth Date Compatibility begins from here

function getBirthCompatibility() {
    var a = document.forms["birth-compatibility-Form"]["boyBirthDate"].value;
    var b = document.forms["birth-compatibility-Form"]["girlBirthDate"].value;
    var check = validateEmptycompatibilityForm(a, b);
    let c = new Date(a);
    let d = new Date(b);
    var e = getDayfromcalendar(c);
    var f = getDayfromcalendar(d);
    if (check) {
        let d1 = getSum(e);
        let d2 = getSum(f);
        let val = Math.abs(d1 - d2);
        let score = val * 5;
        for (let i = 0; i < val; i++) {
            score += 5;
        }
        while (score > 100) {
            score = score % 100;
        }
        document.getElementById('compatibility-score').innerHTML = score;
        target = $("#custom-compatibility-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}

function getDayfromcalendar(date) {
    let res = date.getDate();
    return res;
}


// Attitude Calculator begins from here

function getAttitudeNumberResult(result) {
    switch (result) {
        case 1:
            return "You are someone who is focused, self-driven, assertive, independent, and accessible. Although sometimes you can come off as dominating, aggressive and stand-offish. Don't worry about this perception of you. You know who you are, and that's all that matters. Also, don't forget to ask for help when needed."
        case 2:
            return "You are considered to be benevolent, kind, compromising, open, and wise. However, your most significant strength is your compassion and the ability to look beyond reality. Therefore, you are attracted to areas of mysticism and spirituality. It would be good to remember to take care of yourself, too, rather than spending your empathy and energy on everyone other than yourself."
        case 3:
            return "With your alluring, dynamic, clever and versatile personality, you can win people over immediately. Sometimes it is necessary not to lose your calm and enjoy life. Your humour, wit, and brilliance make you the party's life. Although you are in a good mood, try not to lash out at people in a foul mood."
        case 4:
            return "If your attitude number is 4, then you are a very deducted, reliable, faithful, honest, and dependable person. You come off as someone very open and loving in general. Try practising more listening than arguing to avoid being rude or obstinate."
        case 5:
            return "Bright, lively, brave, and fun, people like you are not easy to come across often. Your energy is something to be prized. Although you are highly reliable and loving, your self-sabotage techniques usually push people away from you. Treasure your energy and don't test people's boundaries."
        case 6:
            return "You are known to give high importance to your loved ones, protect your near and dear ones, and are generally quite possessive over your people. Therefore, it is advisable not to control freaks and let people explore things independently."
        case 7:
            return "Some of your traits are to be clever, scholarly, thoughtful, and analytical. While you wish to over-analyse every little detail, this can make you seem unapproachable. So go with the flow, and don't overthink everything!"
        case 8:
            return "You are a born leader, strong-willed, dedicated and intense. However, your brutal honesty can sometimes be taken as just brutality. Therefore, mind your words and try to express yourself more kindly."
        case 9:
            return "You are gentle, generous, and saintly. Your efforts to keep everyone happy and think of their welfare make you a wonderful human being! Although it is incredibly kind of you to always fight for others' happiness, sometimes let others stand up for you."
    }
    return {}
}

function getAttitude(date, month) {
    let val = getSum(date) + getSum(month);
    let result = getSum(val);
    return result;
}

function isValidAttitudeForm() {
    var a = document.forms["attitude-Form"]["day"].value;
    var b = document.forms["attitude-Form"]["month"].value;
    var c = document.forms["attitude-Form"]["year"].value;
    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {
            var score = getAttitude(a, b);
            document.getElementById('attitude-score').innerHTML = score;
            document.getElementById('data-result').innerHTML = getAttitudeNumberResult(score);
            target = $("#custom-attitude-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}

// Karmic Debt Number Calculator begins from here

function getKarmic(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSum(val);
    if (result == 4) {
        return {
            'lifepath': 4,
            'karmic': 13
        }
    } else if (result == 5) {
        return {
            'lifepath': 5,
            'karmic': 14
        }
    } else if (result == 7) {
        return {
            'lifepath': 7,
            'karmic': 16
        }
    } else if (result == 1) {
        return {
            'lifepath': 1,
            'karmic': 19
        }
    } else {
        return {
            'lifepath': result,
            'karmic': "You Don't have any Karmic debt number associated with life path number."
        }
    }
}

function getKarmicNumberResult(result) {
    switch (result) {
        case 13:
            return "This number relates to laziness, selfishness and narcissism in the past life. You are someone who finds it difficult to appreciate others and is quick to play the blame game. So, often you are perceived as stubborn and controlling. Your Karma is to hold yourself accountable, accept your shortcomings and work over the weak areas of your personality."
        case 14:
            return "If you have the karmic debt number 14 as your number, then you are someone who may be dominating, have a lack of self-control, and have commitment issues. Your past life may have seen you exploit freedom through overindulgence and breaking boundaries. Therefore, your Karma is to develop self-introspection, vulnerability, and self-discipline."
        case 16:
            return "This number can be the most challenging to overcome and relates to a powerful ego in the past life. You may have had quite a few failed relationships due to your severe disconnect with others. Your Karma is to stray away from your egotistical streak and become more loving and thoughtful to others."
        case 19:
            return "The number 19 in Karmic debt points towards abuse of power in the past life. This abuse of power may have caused a lot of suffering to many people. In addition, you may be very manipulative, narcissistic and selfish. Your Karma in this life is to become more compassionate to other people."
    }
    return {}
}

function isValidKarmicDbtForm() {
    var a = document.forms["karmic-debt-Form"]["day"].value;
    var b = document.forms["karmic-debt-Form"]["month"].value;
    var c = document.forms["karmic-debt-Form"]["year"].value;
    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {
            var score = getKarmic(a, b, c);
            document.getElementById('life-path-score').innerHTML = score.lifepath;
            if (isNaN(score.karmic)) {
                document.getElementById('checkContentShow').style.display = 'none';
                document.getElementById('karmic-debt-score').innerHTML = score.karmic;
                document.getElementById('data-result').innerHTML = '';
            } else {
                document.getElementById('checkContentShow').style.display = 'inline-block';
                document.getElementById('karmic-debt-score').innerHTML = score.karmic;
                document.getElementById('data-result').innerHTML = getKarmicNumberResult(score.karmic);
            }
            target = $("#custom-karmic-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }

}


// boyfriend & grilfriend Calculator begins from here

function getBoyfriendScore(str1, str2, ques1, ques2, yearKnown) {
    let score = 0;
    let name1 = str1.toLowerCase();
    let name2 = str2.toLowerCase();
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let nameA1 = name1.split('');
    let nameA2 = name2.split('');
    for (let i = 0; i < nameA1.length; i++) {
        if (vowels.includes(nameA1[i])) {
            score += 5;
        } else if ('Relationship'.split('').includes(nameA1[i])) {
            score += 10;
        } else if (name2.includes(nameA1[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    for (let i = 0; i < nameA2.length; i++) {
        if (vowels.includes(nameA2[i])) {
            score += 5;
        } else if ('Relationship'.split('').includes(nameA2[i])) {
            score += 10;
        } else if (name1.includes(nameA2[i])) {
            score += 15;
        } else {
            score += 0;
        }
    }
    score = score + (parseInt(ques1) * 3) + (parseInt(ques2) * 3) + parseInt(yearKnown);
    while (score > 100) {
        score = score % 100;
    }
    return score;
}

function isValidBoyfriendForm() {
    var a = document.forms["boyfriend-Form"]["inputName"].value;
    var b = document.forms["boyfriend-Form"]["inputPartnerName"].value;
    var c = document.forms["boyfriend-Form"]["cheatOnPast"].value;
    var d = document.forms["boyfriend-Form"]["loveFirstSight"].value;
    var e = document.forms["boyfriend-Form"]["relationship"].value;
    var check = checkEmptyBreakupForm(a, b, c, d, e);
    if (check) {
        var score = getBoyfriendScore(a, b, c, d, e);
        document.getElementById('person-name-1').innerHTML = a;
        document.getElementById('person-name-2').innerHTML = b;
        document.getElementById('meter-score').innerHTML = score;
        target = $("#custom-boyfriend-modal").attr('data-target-custom');
        $(target).modal('show');

        $(".meter-calculator-value").each(function() {
            var $bar = $(this).find(".bar");
            var $val = $(this).find("#meter-score");
            var perc = parseInt(score, 10);
            $({
                p: 0
            }).animate({
                p: perc
            }, {
                duration: 2000,
                easing: "swing",
                step: function(p) {
                    $bar.css({
                        transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
                    });
                    $val.text(p | 0);
                }
            });
        });
    }
}



//mionr expression number logic

function isValidMinorExpressionForm() {
    var textValue = document.forms["expression-Form"]["inputName"].value;
    let a = textValue.toLowerCase();
    var check = validateEmptyExpressionForm(a);
    if (check) {
        score = getExpressionScore(a);
        document.getElementById('expression-score').innerHTML = score;
        document.getElementById('data-result').innerHTML = getMinorExpressionNumberResult(score);
        target = $("#custom-expression-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}

//mionr expression result logic

function getMinorExpressionNumberResult(result) {
    switch (result) {
        case 1:
            return "<strong>Always Reliable and Responsible</strong><br/> Do you know how to decode minor expression number 1? The expression number 1 careers demonstrate that it would be brilliant to stick to your schedule and be more consistent. Accordingly, you will consistently be on the right track."
        case 2:
            return "<strong>Dependable In All Divine Matters</strong><br/> First things first, do you know how to encounter your minor expression number 2? The expression number 2 shows that you love to disconnect from the world's noises to pray and read the scriptures."
        case 3:
            return "<strong>Often Having a Positive Attitude</strong><br/> What does your minor expression number 3 mean? The expression number 3 numerology indicates that with the work pressures and hustle-bustle of the current world, it is easy to lose track or get despaired. However, allowing an overriding feeling of pessimism will affect your productivity negatively."
        case 4:
            return "<strong>They Love Cleanliness</strong><br/> What does your minor expression number 4 mean? First, the expression four numerology shows that you will make more significant progress and achievement if you become more organised."
        case 5:
            return "<strong>Zealous Game Changers</strong><br/> What does minor expression number 5 mean? The expression number 5 numerology indicates that keeping the bigger picture in mind would be excellent as you handle tasks daily. Therefore, the minor number 5 tells you to think about how you would wish your future to look."
        case 6:
            return "<strong>Easy Rapport with Everyone</strong><br/> What does minor expression number 6 mean? The expression number 6 numerology says that it would be helpful to be more attentive when talking with someone."
        case 7:
            return "<strong>Deep Logical Understanding</strong><br/> What does minor expression number 7 mean? The seven numerologies indicate that you love staying quiet, reserved, and introverted. You love being alone and like to socialise with a few people or none."
        case 8:
            return "<strong>Having Big Dreams and Visions</strong><br/> What does your minor expression number 8 mean? It would be excellent to be hardworking and always striving to be more successful. So, the expression number 8 careers say that let your passion for learning and progress be unmatched."
        case 9:
            return "<strong>Feeling for Others Wants and Needs</strong><br/> How to interpret minor expression number 9? The nine numerologies indicate that it would be excellent if you would strive to improve the livelihood of others as possible."
        case 11:
            return "<strong>Self-Aware and Alert for Details </strong><br/> How can you decipher minor expression number 11? The expression number 11 states that it would be excellent to give your ears to your gut feeling. Please attend to the voices within yourself. Also, expression 11 urges you to go beyond your worries and insecurities. Gladly embrace your intuition and live a more fulfilling life."
        case 22:
            return "<strong>A Passionate Self-Starter</strong><br/> How do you interpret minor expression number 22? The expression number 22 careers signal that you need to identify the best ways to advance your interest, studies, or learning. Indeed it would help if you were a proactive go-getter."
    }
    return {}
}


function isValidCareerForm() {
    var a = document.forms["career-Form"]["day"].value;
    var b = document.forms["career-Form"]["month"].value;
    var c = document.forms["career-Form"]["year"].value;
    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {
            var score = getMarriageCalc(a, b, c);
            document.getElementById('marriage-score').innerHTML = score;
            document.getElementById('data-result').innerHTML = getCareerNumberResult(score);
            target = $("#custom-marriage-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}


// Mangal Dosha calculator

function validateEmptyMangalDoshaForm(a, b, c, d, e) {
    var dateFormatCheck = validatedate(c);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("mangal-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("mangal-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("mangal-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("mangal-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < c) {
        var y = document.getElementById("mangal-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("mangal-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("mangal-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function isValidMangalDoshaForm() {
    var a = document.forms["mangal-dosha-Form"]["inputName"].value;
    var b = document.forms["mangal-dosha-Form"]["inputGender"].value;
    var c = document.forms["mangal-dosha-Form"]["inputBirthDate"].value;
    var d = document.forms["mangal-dosha-Form"]["inputBirthTime"].value;
    var e = document.forms["mangal-dosha-Form"]["id_birth_place"].value;
    var check = validateEmptyMangalDoshaForm(a, b, c, d, e);
    if (check) {
        window.location.href = "result/";
    }
}

// Nakshatra Finder Calculator

function isValidNakshatraFinderForm() {
    var a = document.forms["nakshatra-finder-Form"]["inputName"].value;
    var b = document.forms["nakshatra-finder-Form"]["inputGender"].value;
    var c = document.forms["nakshatra-finder-Form"]["inputBirthDate"].value;
    var d = document.forms["nakshatra-finder-Form"]["inputBirthTime"].value;
    var e = document.forms["nakshatra-finder-Form"]["id_birth_place"].value;
    var check = validateEmptyMangalDoshaForm(a, b, c, d, e);
    if (check) {
        // window.location.href="result/";
        return {
            "name": a,
            "gender": b,
            "dob": c,
            "time": d,
            "place": e
        }
    }
}

// Kaal Sarp Calculator

function isValidKaalSarpForm() {
    var a = document.forms["kaal-sarp-Form"]["inputName"].value;
    var b = document.forms["kaal-sarp-Form"]["inputGender"].value;
    var c = document.forms["kaal-sarp-Form"]["inputBirthDate"].value;
    var d = document.forms["kaal-sarp-Form"]["inputBirthTime"].value;
    var e = document.forms["kaal-sarp-Form"]["id_birth_place"].value;
    var check = validateEmptyMangalDoshaForm(a, b, c, d, e);
    if (check) {
        return {
            "name": a,
            "gender": b,
            "dob": c,
            "time": d,
            "place": e
        }
    }
}

// Sade Sati Calculator

function isValidSadeSatiForm() {
    var a = document.forms["sade-sati-Form"]["inputName"].value;
    var b = document.forms["sade-sati-Form"]["inputGender"].value;
    var c = document.forms["sade-sati-Form"]["inputBirthDate"].value;
    var d = document.forms["sade-sati-Form"]["inputBirthTime"].value;
    var e = document.forms["sade-sati-Form"]["id_birth_place"].value;
    var check = validateEmptyMangalDoshaForm(a, b, c, d, e);
    if (check) {
        window.location.href = "result/";
    }
}

// Maturity Number Calculator begins from here
function getMaturityNumberResult(result) {
    switch (result) {
        case 1:
            return "Number one defines leadership, power and responsibility. This implies that you will have excellent leadership skills and will take responsibility for the work that you will be doing."
        case 2:
            return "If you have maturity number 2, this depicts that in the later stage of your life, you will develop emotional intelligence and an understanding of nature. One another trait of having this number is that you will have enough time in the later stage of your life to work on your interest and discover your hidden talents."
        case 3:
            return "Creativity, art, music and spirituality will enter your life if you have maturity number 3. Your life will be happening and productive because your quality of work will be excellent."
        case 4:
            return "You will spend a lot of time building the life you want. You will show great dedication in your work if you are a person of maturity number 4. Your life will have some setbacks, but you will defeat everything that comes to a stop you, and in the latter part of your life, this will be your strength."
        case 5:
            return "Gaining experience is an integral part of your life if you are a person of maturity number 5. You will always be a hustler and benefit from this personality. Explore more to gain experience and travel to places that bring peace to your mind."
        case 6:
            return "In the later stages of life, you will shift your focus toward relationships with your family, friends and partner. You will have to dedicate some time to sorting out your stuff and maintaining a work-life balance if you are a person with maturity number 6."
        case 7:
            return "You will have strong fundamentals in your early life, but as time passes, you will develop an interest in the spiritual side of life, and you will start figuring out things with a spiritual aspect."
        case 8:
            return "In the later stage of your life, people with maturity number 8 will have a successful career and will be at their peak. They will work hard and win in every aspect of life."
        case 9:
            return "You will direct yourself to charity and make donations for the benefit of society."
        case 11:
            return ""
        case 22:
            return ""
        case 33:
            return ""
    }
    return {}
}

function checkEmptyMaturityForm(a, b, c, d) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("maturity-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("maturity-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("maturity-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("maturity-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("maturity-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("maturity-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("maturity-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("maturity-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getLifePathCalc(date, month, year) {
    let val = getNewSum(date) + getNewSum(month) + getNewSum(year);
    let result = getNewSum(val);
    if (result === 2) {
        return 11;
    }
    return result;
}

function getExpressionCalc(name) {
    let score = 0;
    for (let i = 0; i < name.length; i++) {
        score += dataset[name.charAt(i)];
    }
    let result = getNewSum(score);
    return result;
}

function maturityNumber(name, day, month, year) {
    return getNewSum(getExpressionCalc(name) + getLifePathCalc(day, month, year))
}

function isValidMaturityForm() {
    var a = document.forms["maturity-number-form"]["name"].value;
    var b = document.forms["maturity-number-form"]["day"].value;
    var c = document.forms["maturity-number-form"]["month"].value;
    var d = document.forms["maturity-number-form"]["year"].value;
    var check = checkEmptyMaturityForm(a, b, c, d);
    var validdate = checkValidDateForMarriage(b, c, d);
    if (check) {
        validdate = checkValidDateForMarriage(b, c, d);
        if (validdate) {
            var score = maturityNumber(a, b, c, d);
            document.getElementById('maturity-score').innerHTML = score;
            document.getElementById('data-result').innerHTML = getMaturityNumberResult(score);
            target = $("#custom-maturity-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }

}

// Love Partner Report Calculator

function validateEmptyLovePartnerForm(a, b, c, d, e, f) {
    var dateFormatCheck = validatedate(c);
    var dateFormatCheck2 = validatedate(f);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("love-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("love-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < c) {
        var y = document.getElementById("love-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (f == null || f == "") {
        var x = document.getElementById("love-erm6");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck2 === false) {
        var y = document.getElementById("love-erm6");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < f) {
        var y = document.getElementById("love-erm6");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm6");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    return flag;
}

function isValidLovePartnerForm() {
    var a = document.forms["love-partner-Form"]["inputName"].value;
    var b = document.forms["love-partner-Form"]["inputGender"].value;
    var c = document.forms["love-partner-Form"]["inputBirthDate"].value;
    var d = document.forms["love-partner-Form"]["partnerName"].value;
    var e = document.forms["love-partner-Form"]["partnerGender"].value;
    var f = document.forms["love-partner-Form"]["partnerBirthDate"].value;
    var check = validateEmptyLovePartnerForm(a, b, c, d, e, f);
    if (check) {
        window.location.href = "result/";
    }
}

// Lo Shu Grid Calculator

function getLuShoGridCalc(date, month, year) {
    let drivernumber = getSum(date);
    let conductor = getSum(getSum(date) + getSum(month) + getSum(year));
    let stringify = date.toString() + year.toString() + month.toString() + conductor.toString() + drivernumber.toString();
    let result = stringify.split('').filter(onlyUnique).sort();
    return result;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function isValidloShuGridForm() {
    var a = document.forms["lu-shu-grid-Form"]["day"].value;
    var b = document.forms["lu-shu-grid-Form"]["month"].value;
    var c = document.forms["lu-shu-grid-Form"]["year"].value;
    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {
            var score = getLuShoGridCalc(a, b, c);
            document.getElementById('lo_shu_result').value = [...score];
        }
    }
}