var ulat = gLat;
var ulng = gLong;
var special_option = '3';
var opt;

var map;

var refScheduler; // Scheduler interval

document.addEventListener("show", function() {
  if (event.target.id === "schedule-page") {
    var carousel2 = document.addEventListener('postchange', function(event) {
      console.log('Changed to ' + event.activeIndex);
    });

    load_scheduler_page();
    refScheduler = setInterval(function() { load_scheduler_page(); }, 10000);
    //  setInterval(load_scheduler_page, 6000);

    map = new GMaps({
      el: '#map',
      lat: 5.3250,
      lng: 100.2716491,
      zoomControl: true,
      zoomControlOpt: {
        style: 'SMALL',
        position: 'TOP_LEFT'
      },
      panControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      overviewMapControl: false
    });

    GMaps.geolocate({
      success: function success(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude);
        map.setZoom(14);

      },
      error: function error(_error) {
        ons.notification.toast({
          message: _error.message,
          timeout: 3500
        });
      },
      not_supported: function not_supported() {
        ons.notification.toast({
          message: "Geolocation is not supported",
          timeout: 3500
        });
      }
    });

    /*  map.addMarker({
        lat: $("#getPartnerLat").val(),
        lng: $("#getPartnerLng").val(),
        title: 'Partner',
        infoWindow: {
          content: "Partner Location"
        }
      });*/

    map.addMarker({
      lat: gLat,
      lng: gLong,
      title: 'You',
      infoWindow: {
        content: "Your Location"
      }
    });

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
      clearInterval(refScheduler);
    }
  }
});

function load_scheduler_page() {
  //  alert("hello");

  $.ajax({
    url: sampleLink2 + "link/scheduler/load_scheduler.php",
    data: { user: gUserId },
    method: "POST",
    success: function(data) {
      document.getElementById("scheduler_page").innerHTML = data;
      console.log("scheduler page 1");
      modal.hide();
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });

      clearInterval(refScheduler);
      fn.pop();
      modal.hide();
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/load_scheduler.php", {
      user: gUserId
    }, function(data) {
      // alert(data);
      document.getElementById("scheduler_page").innerHTML = data;
    });*/
}

function show_list(options) {
  //   alert("hello");
  /*  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

    modal = document.querySelector('ons-modal');
    modal.show();*/

  switch (options) {
    case '1':
      special_option = '3';
      break;
    case '2':
      special_option = '3';
      break;
    case '3':
      special_option = '3';
      break;
    case '4':
      special_option = '4';
      break;
    case '6':
      special_option = '3';
      break; //new
    case '7':
      special_option = '3';
      break;
  }

  $.ajax({
    url: sampleLink2 + "link/scheduler/load_scheduler_item.php",
    data: { option: options, user: gUserId },
    method: "POST",
    success: function(data) {
      document.getElementById("scheduler_page2").innerHTML = data;

      //  modal.hide();
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });

      //  modal.hide();
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/load_scheduler_item.php", {
      option: options,
      user: gUserId
    }, function(data) {
      // alert(data);
      document.getElementById("scheduler_page2").innerHTML = data;
    });*/

  carousel2.next();
}

function show_scheduler_detail(id) {
  // alert(id); 

  $.ajax({
    url: sampleLink2 + "link/scheduler/load_scheduler_info.php",
    data: { option: '1', ids: id },
    method: "POST",
    success: function(data) {
      document.getElementById("scheduler_page3").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/load_scheduler_info.php", {
      option: '1',
      ids: id
    }, function(data) {
      document.getElementById("scheduler_page3").innerHTML = data;
    });*/

  $.ajax({
    url: sampleLink2 + "link/scheduler/load_scheduler_info.php",
    data: { option: '2', ids: id, lat: ulat, lng: ulng },
    method: "POST",
    success: function(data) {
      document.getElementById("disp_bkd3").innerHTML = data;

      map.addMarker({
        lat: $("#getPartnerLat").val(),
        lng: $("#getPartnerLng").val(),
        title: 'Partner',
        infoWindow: {
          content: "Partner Location"
        }
      });

      //  alert($("#getPartnerLat").val());
      //  alert($("#getPartnerLng").val());
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/load_scheduler_info.php", {
      option: '2',
      ids: id,
      lat: ulat,
      lng: ulng
    }, function(data) {
      document.getElementById("disp_bkd3").innerHTML = data;
    });*/

  $.ajax({
    url: sampleLink2 + "link/scheduler/load_scheduler_info.php",
    data: { option: special_option, ids: id },
    method: "POST",
    success: function(data) {
      document.getElementById("scheduler_page5").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/load_scheduler_info.php", {
      option: special_option,
      ids: id
    }, function(data) {
      document.getElementById("scheduler_page5").innerHTML = data;
    });*/

  carousel2.next();
}

function show_list(options) {
  // alert(options);

  switch (options) { //new
    case '1':
      special_option = '3';
      break;
    case '2':
      special_option = '3';
      break;
    case '3':
      special_option = '3';
      break;
    case '4':
      special_option = '4';
      break;
    case '6':
      special_option = '3';
      break; //new
    case '7':
      special_option = '3';
      break;
  }

  $.ajax({
    url: sampleLink2 + "link/scheduler/load_scheduler_item.php",
    data: { option: options, user: gUserId },
    method: "POST",
    success: function(data) {
      document.getElementById("scheduler_page2").innerHTML = data;

      //  modal.hide();
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });

      //  modal.hide();
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/load_scheduler_item.php", {
      option: options,
      user: gUserId
    }, function(data) {
      //  alert(data);
      document.getElementById("scheduler_page2").innerHTML = data;
    });*/

  carousel2.next();
}

function check_datetime(id) {
  if ($("#re_date").val() == "") {
    alert("Please Select date");
    return;
  }

  if ($("#re_time").val() == "") {
    alert("Please Select Hour");
    return;
  }

  //  alert($("#schedule_btn").text().trim().length);
  switch ($("#schedule_btn").text().trim()) {
    case "Schedule":
      //  alert("test");
      opt = '1';
      $("#dialogs").text("Please Wait for Workshop to Confirm");
      break;
    case 'Cancel':
      opt = '2';
      $("#dialogs").text("Please Re-Schedule Your Date and Time");
      break;
    case 'Re-Schedule':
      opt = '7';
      $("#dialogs").text("Please Wait for Workshop to Confirm");
      break;
  }

  //  alert($("#schedule_btn").text());
  //  alert(`${opt}, ${id}`);

  $.ajax({
    url: sampleLink2 + "link/scheduler/save_schedule.php",
    data: { option: opt, ids: id, schedule_date: $("#re_date").val(), schedule_time: $("#re_time").val().substring(0, 2) },
    method: "POST",
    success: function(data) {
      if (data == 'Y') {
        showDialog("dialog-1");
        carousel2.setActiveIndex(0);
      }
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/save_schedule.php", {
      option: opt,
      ids: id,
      schedule_date: $("#re_date").val(),
      schedule_time: $("#re_time").val().substring(0, 2)
    }, function(data) {
      //  alert(data);
      if (data == 'Y') {
        showDialog("dialog-1");
        carousel2.setActiveIndex(0);
      }
    });*/
}

function close_item_info() {
  document.querySelector('#navigator').popPage();
}

function accept_reschedule(selection) {
  //  alert(selection);

  /*    if($("#reschedule_date").val() == ""){
            alert("Please Select A date");
            return;
        }
        
        if($("#reschedule_time").val() == ""){
            alert("Please Select A Hour");
            return;
        }    */

  //alert($("#reschedule_date").val() + " " + $("#reschedule_time").val());

  $.ajax({
    url: sampleLink2 + "link/scheduler/save_schedule.php",
    data: { option: '8', ids: selection, reschedule_date: $("#reschedule_date").val(), reschedule_time: $("#reschedule_time").val().substring(0, 2) },
    method: "POST",
    success: function(data) {
      if (data == 'Y') {
        $("#dialogs").text("Reschedule Successful...Thank you.");
        showDialog("dialog-1");
        carousel2.setActiveIndex(0);
      }
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/save_schedule.php", {
      option: '8',
      ids: selection,
      reschedule_date: $("#reschedule_date").val(),
      reschedule_time: $("#reschedule_time").val().substring(0, 2)
    }, function(data) {
      // alert(data);
      if (data == 'Y') {
        $("#dialogs").text("Reschedule Successful...Thank you.");
        showDialog("dialog-1");
        carousel2.setActiveIndex(0);
      }
    });*/
}

function reject_reschedule(selection) {
  //  alert(selection);

  if ($("#reschedule_date").val() == "") {
    alert("Please Select date");
    return;
  }

  if ($("#reschedule_time").val() == "") {
    alert("Please Select Hour");
    return;
  }

  $.ajax({
    url: sampleLink2 + "link/scheduler/save_schedule.php",
    data: { option: '9', ids: selection, reschedule_date: $("#reschedule_date").val(), reschedule_time: $("#reschedule_time").val().substring(0, 2) },
    method: "POST",
    success: function(data) {
      if (data == 'Y') {
        $("#dialogs").text("New Reschedule Date Time Will Need Workshop to Confirm Again");
        showDialog("dialog-1");
        carousel2.setActiveIndex(0);
      }
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/save_schedule.php", {
      option: '9',
      ids: selection,
      reschedule_date: $("#reschedule_date").val(),
      reschedule_time: $("#reschedule_time").val().substring(0, 2)
    }, function(data) {
      //   alert(data);
      if (data == 'Y') {
        $("#dialogs").text("New Reschedule Date Time Will Need Workshop to Confirm Again");
        showDialog("dialog-1");
        carousel2.setActiveIndex(0);
      }
    });*/
}

function setPage() {
  carousel2.next();
  carousel2.next();
}

function locationPage() {
  carousel2.next();
}

function secondPage(stype, ids) {
  //new

  //  alert(stype + " : " + ids);
  if (stype == 'A') {
    //  alert("Acknowledged");

    $.ajax({
      url: sampleLink2 + "link/scheduler/load_ack.php",
      data: { id: ids },
      method: "POST",
      success: function(data) {
        document.getElementById("ack_display").innerHTML = data;
      },
      error: function(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);

        ons.notification.alert({
          title: "Connection issue",
          message: "Connection issue detected, please retry when you have connection",
          cancelable: false
        });
      },
      timeout: 4000
    });

    /*  $.post("http://www.website.com/link/scheduler/load_ack.php", {
        id: ids
      }, function(data) {
        // alert(data);
        document.getElementById("ack_display").innerHTML = data;
      });*/

    document.querySelector('#navigator').pushPage('ack_page.html');
  } else {
    carousel2.next();
  }
  //  
}

var showDialog = function showDialog(id) {
  document.getElementById(id).show();
};

var hideDialog = function hideDialog(id) {
  document.getElementById(id).hide();
};

var prevSchedule = function prevSchedule() {
  var carousel = document.getElementById('carousel2');
  carousel.prev();
};

var nextSchedule = function nextSchedule() {
  var carousel = document.getElementById('carousel2');
  carousel.next();
};

//Calendar

function load_calendar_day(dates, partner_ids) {
  //  alert(partner_id);

  if (dates.substr(0, 4) == "0000") {
    //   year.getFullYear();
    //   month.getMonth();
    var d = new Date();
    month = d.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }

    day = d.getDate();
    if (day < 10) {
      day = '0' + day;
    }

    var year = d.getFullYear();

    dates = year + "-" + month + "-" + day;
    // alert(dates); 
  }

  $.ajax({
    url: sampleLink2 + "link/load_calendar_day.php",
    data: { partner_id: partner_ids, date: dates },
    method: "POST",
    success: function(data) {
      document.getElementById("calendar_day_display").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/load_calendar_day.php", {
      partner_id: partner_ids,
      date: dates
    }, function(data) {
      //  alert(data);
      document.getElementById("calendar_day_display").innerHTML = data;
    });*/

  document.querySelector('#navigator').pushPage('day_page.html');
}

function load_calendar_hour(partner_ids) {
  var selected_date = $("#re_date").val();
  // alert(partner_ids + " " + selected_date);
  if (selected_date == '') {
    alert("Please Select date First");
  } else {
    $.ajax({
      url: sampleLink2 + "link/load_calendar_hour.php",
      data: { partner_id: partner_ids, dates: selected_date },
      method: "POST",
      success: function(data) {
        document.getElementById("calendar_hour_display").innerHTML = data;
      },
      error: function(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);

        ons.notification.alert({
          title: "Connection issue",
          message: "Connection issue detected, please retry when you have connection",
          cancelable: false
        });
      },
      timeout: 4000
    });

    /*  $.post("http://website.com/link/load_calendar_hour.php", {
        partner_id: partner_ids,
        dates: selected_date
      }, function(data) {
        //   alert(data);
        document.getElementById("calendar_hour_display").innerHTML = data;
      });*/
    document.querySelector('#navigator').pushPage('hour_page.html');
  }
}

function check_time() {

  $.ajax({
    url: sampleLink2 + "link/load_calendar_hour.php",
    data: { partner_id: $("#memberid").val(), dates: $("#re_date").val() },
    method: "POST",
    success: function(data) {
      document.getElementById("calendar_hour_display").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });
    },
    timeout: 4000
  });

  /* $.post("http://www.website.com/link/load_calendar_hour.php", {
     partner_id: $("#memberid").val(),
     dates: $("#re_date").val()
   }, function(data) {

     document.getElementById("calendar_hour_display").innerHTML = data;
   });*/

  document.querySelector('#navigator').pushPage('hour_page.html');
}

function get_time(time) {

  schedule_time = time;
  document.querySelector('#navigator').popPage();
  $("#re_time").val(schedule_time + ":00");
  $("#reschedule_time").val(schedule_time + ":00");
}

function get_date(partner_id, date) {
  schedule_date = date;
  document.querySelector('#navigator').popPage();
  $("#re_date").val(schedule_date);
  $("#reschedule_date").val(schedule_date);
  $("#re_time").val("");
  $("#reschedule_time").val("");
}

function save_comment(rate, ids) {

  $.ajax({
    url: sampleLink2 + "link/scheduler/save_schedule.php",
    data: { option: '14', id: ids, ratings: rate, comments: $("#rate_text").val() },
    method: "POST",
    success: function(data) {
      document.querySelector('#navigator').popPage();
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please retry when you have connection",
        cancelable: false
      });
    },
    timeout: 4000
  });

  /*  $.post("http://www.website.com/link/scheduler/save_schedule.php", {
      option: '14',
      id: ids,
      ratings: rate,
      comments: $("#rate_text").val()
    }, function(data) {});
    document.querySelector('#navigator').popPage();*/
}

/*function markPartner(partnerAdd) {

  console.log(partnerAdd);

  GMaps.geocode({
    address: partnerAdd,
    callback: function(results, status) {
      if (status == 'OK') {
        var latlng = results[0].geometry.location;
        map.setCenter(latlng.lat(), latlng.lng());
        map.addMarker({
          lat: latlng.lat(),
          lng: latlng.lng()
        });
      }
    }
  });
}*/