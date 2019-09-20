window.onload = () => {
  //global day declaration
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  //date given by user
  const year = document.getElementById("getYear");
  //current year
  const getDate = new Date();
  const showYear = document.getElementById("showYear");
  // for handeling current date and time
  setInterval(() => {
    let ourDate = new Date();
    //to show current date and time in the DOM
    let timeHere = document.querySelector(".timeHere");
    let hrs = timeHere.querySelector(".hrs");
    let min = timeHere.querySelector(".min");
    let sec = timeHere.querySelector(".sec");
    let meridian = timeHere.querySelector(".meridian");
    let dateHere = document.querySelector(".dateHere");
    let year = dateHere.querySelector(".year");
    let month = dateHere.querySelector(".month");
    let day = dateHere.querySelector(".day");
    let dayName = dateHere.querySelector(".showDay");
    //for time records
    let hour = ourDate.getHours();
    let minute = ourDate.getMinutes();
    let second = ourDate.getSeconds();
    let passTime = "AM";
    //for date records
    let currentDate = ourDate.getUTCDate();
    let currentMonth = ourDate.getMonth() + 1;
    let currentYear = ourDate.getFullYear();
    let currentDay = ourDate.getDay();
    if (hour > 12) {
      hour = hour % 12;
      passTime = "PM";
      meridian.innerHTML = passTime;
    } else {
      passTime = "AM";
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (second < 10) {
      second = "0" + second;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (currentDate < 10) {
      currentDate = "0" + currentDate;
    }
    if (currentMonth < 10) {
      currentMonth = "0" + currentMonth;
    }
    //time
    hrs.innerHTML = hour;
    min.innerHTML = minute;
    sec.innerHTML = second;
    meridian.innerHTML = passTime;
    //date
    year.innerHTML = currentYear;
    month.innerHTML = currentMonth;
    day.innerHTML = currentDate;
    dayName.innerHTML = days[currentDay];
  }, 30);
  //current date in year
  let currentYear = getDate.getFullYear();
  //content datas
  const datas = document.querySelector(".datas");
  let fillDatas = document.createElement("h4"),
    fillHolidays = document.createElement("p"),
    fillType = document.createElement("h4");
  //error in internet
  let lackInternet = document.querySelector(".lackInternet");

  year.addEventListener("keydown", e => {
    if (e.keyCode == "13") {
      if (year.value >= 2015 && year.value < 2022) {
        if (year.value.length == 4) {
          currentYear = year.value;
          showYear.textContent = currentYear;
          year.value = "";

          //getting current fields to fill up data
          fetch(
            `https://calendarific.com/api/v2/holidays?&api_key=242b72bd26ee41a82598db1890a6150a1dc6d247&country=np&year=${currentYear}`
          )
            .then(response => response.json())
            .then(data => {
              let totalHolidays = data.response.holidays;

              for (var i = 0; i < totalHolidays.length; i++) {
                datas.appendChild(fillDatas).innerHTML += `${totalHolidays[
                  i
                ].date.iso.slice(0, 10)} <br/>`;
                datas.appendChild(
                  fillHolidays
                ).innerHTML += `${totalHolidays[i].name} <br/>`;
                datas.appendChild(
                  fillType
                ).innerHTML += `${totalHolidays[i].type}<br/>`;
              }
              lackInternet.style.display = "none";
            })
            //sending error
            .catch((lackInternet.style.display = "block"));
        }
        datas.children[0].textContent = "";
        datas.children[1].textContent = "";
        datas.children[2].textContent = "";
      } else {
        alert("invalid date");
      }
    }
  });

  // show current year holiday when dom loads
  fetch(
    `https://calendarific.com/api/v2/holidays?&api_key=242b72bd26ee41a82598db1890a6150a1dc6d247&country=np&year=${currentYear}`
  )
    .then(response => response.json())
    .then(data => {
      let totalHolidays = data.response.holidays;
      lackInternet.style.display = "none";
      for (var i = 0; i < totalHolidays.length; i++) {
        datas.appendChild(fillDatas).innerHTML += `${totalHolidays[
          i
        ].date.iso.slice(0, 10)} <br/>`;
        datas.appendChild(
          fillHolidays
        ).innerHTML += `${totalHolidays[i].name} <br/>`;
        datas.appendChild(
          fillType
        ).innerHTML += `${totalHolidays[i].type}<br/>`;
      }
    })
    .catch((lackInternet.style.display = "block"));
};
