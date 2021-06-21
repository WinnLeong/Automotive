// 'use strict';

var state = '',
  favorite_partner = 'NO',
  area = '',
  type = '47102',
  type2 = '';
var car_plate_id = '',
  default_setting = '',
  helpdesk_id = '',
  item_code = '',
  item_qty = 1;
var links = "http://www.website.com/";

var prev = function prev() {
  var carousel = document.getElementById('carousel');
  carousel.prev();
};

var next = function next() {
  var carousel = document.getElementById('carousel');
  carousel.next();
};

/*var showDialog = function(id) {
  document
    .getElementById(id)
    .show();
};*/

var hideAutomallDialog = function hideAutomallDialog(id) {
  document.getElementById('dialog-3').hide();
  // alert(id);
  if (id == 'S') {
    prev();
  } else {
    // load_page6();
    next();
    next();
  }
};

var fromTemplate = function fromTemplate() {
  var dialog = document.getElementById('dialog-3');

  if (dialog) {
    dialog.show();
  } else {
    ons.createDialog('dialog.html').then(function(dialog) {
      dialog.show();
    });
  }
};

/*ons.ready(function() {
  var carousel = document.addEventListener('postchange', function(event) {
    console.log('Changed to ' + event.activeIndex)
  });
  check_helpdesk(user_id);
  load_page1();
  load_page2();
  load_page3('1');
  load_page4();
  load_page5();
  //  load_page6();
  load_page7();

});*/

document.addEventListener("show", function() {
  var carousel = document.addEventListener('postchange', function(event) {
    //  console.log('Changed to ' + event.activeIndex);
  });
  if (event.target.id === "automall-page") {
    Geolocate();

    check_helpdesk(gUserId);
    load_page1();
    load_page2();
    load_page3('1');
    load_page4();
    load_page5();
    //  load_page6();
    load_page7();
  }
});

function check_helpdesk(user_ids) {

  $.post("http://www.website.com/link/purchase/check_helpdesk.php", {
    user_id: user_ids
  }, function(data) {
    helpdesk_id = data;
    // alert("Load Helpdesk : " + helpdesk_id);
    console.log(helpdesk_id);

    sessionStorage.setItem('cartHelpdesk', helpdesk_id);
  });
}

function load_page1() {

  $.ajax({
    url: "http://www.website.com/link/purchase/load_page_1.php",
    method: "POST",
    data: {
      user_id: gUserId

    },
    //  tryCount: 0,
    //  retryLimit: 3,
    success: function success(data) {

      document.getElementById("purchase_page_1").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);
      console.log("Error: " + status);

      /*    if (status == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
              //try again
              $.ajax(this);
              return;
            } else {
              ons.notification.alert({
                title: "Connection issue",
                message: "Connection issue detected, please retry when you have connection",
                cancelable: false
              });

              modal.hide();
              fn.pop();
            }
            return;
          }*/
    },
    timeout: 4000
  });
}

function load_page2(car_id) {

  $.ajax({
    url: "http://www.website.com/link/purchase/load_page_2.php",
    method: "POST",
    data: {
      car_id: car_id

    },
    //  tryCount: 0,
    //  retryLimit: 3,
    success: function success(data) {

      document.getElementById("purchase_page_2").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      /*    if (status == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
              //try again
              $.ajax(this);
              return;
            }
            return;
          }

          ons.notification.alert({
            title: "Connection issue",
            message: "Connection issue detected, please retry when you have connection",
            cancelable: false
          });*/
    },
    timeout: 4000
  });
}

function load_page3(type) {

  $.ajax({
    url: "http://www.website.com/link/purchase/load_page_3.php",
    method: "POST",
    data: {
      user_id: gUserId,
      type: type,
      state: state,
      favorite: favorite_partner
    },
    //  tryCount: 0,
    //  retryLimit: 3,
    success: function success(data) {

      document.getElementById("purchase_page_3").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      /*   if (status == 'timeout') {
           this.tryCount++;
           if (this.tryCount <= this.retryLimit) {
             //try again
             $.ajax(this);
             return;
           }
           return;
         }

         ons.notification.alert({
           title: "Connection issue",
           message: "Connection issue detected, please retry when you have connection",
           cancelable: false
         });*/
    },
    timeout: 4000
  });
}

function load_page4() {
  console.log(gLat);
  console.log(gLong);
  console.log(area);
  console.log(type);
  console.log(type2);
  console.log(favorite_partner);
  console.log(car_plate_id);
  console.log(default_setting);

  modal = document.querySelector('ons-modal');

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal.show();

  if (type == "47102") {
    buttonClicked('tyre');
  } else if (type == "47101") {
    buttonClicked('battery');
  } else if (type == "47103") {
    buttonClicked('service');
  }

  if (car_plate_id) {
    // alert(area);
    $.ajax({
      url: "http://www.website.com/link/purchase/load_page_4.php",
      method: "POST",
      data: {
        area: area,
        type: type,
        types2: type2,
        favorite: favorite_partner,
        car_plate: car_plate_id,
        view: default_setting,
        lat: gLat,
        lng: gLong
      },
      //  tryCount: 0,
      //  retryLimit: 3,
      success: function success(data) {
        // alert(data);
        //  document.getElementById("purchase_page_4").innerHTML = data;
        $("#purchase_page_4").html(data);
        modal.hide();
      },
      error: function(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);

        /*  if (status == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
              //try again
              $.ajax(this);
              return;
            }
            return;
          }*/

        ons.notification.alert({
          title: "Connection issue",
          message: "Connection issue has been detected.",
          cancelable: false
        });

        modal.hide();
      },
      timeout: 4000
    });
  }
}

function load_page5() {

  $.ajax({
    url: "http://www.website.com/link/purchase/load_page_5.php",
    method: "POST",
    data: {
      helpdesk_id: helpdesk_id,
      item_code: item_code,
      user_id: gUserId,
      car_plate: car_plate_id,
      qty: item_qty
    },
    //  tryCount: 0,
    //  retryLimit: 3,
    success: function success(data) {
      //  alert(data); 
      document.getElementById("purchase_page_5").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      /*  if (status == 'timeout') {
          this.tryCount++;
          if (this.tryCount <= this.retryLimit) {
            //try again
            $.ajax(this);
            return;
          }
          return;
        }

        ons.notification.alert({
          title: "Connection issue",
          message: "Connection issue detected, please retry when you have connection",
          cancelable: false
        });*/
    },
    timeout: 4000
  });
}

function load_page6() {

  $.ajax({
    url: "http://www.website.com/link/purchase/load_page_6.php",
    method: "POST",
    data: {
      //  car_id : car_id

    },
    //  tryCount: 0,
    //  retryLimit: 3,
    success: function success(data) {

      document.getElementById("purchase_page_6").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      /*  if (status == 'timeout') {
          this.tryCount++;
          if (this.tryCount <= this.retryLimit) {
            //try again
            $.ajax(this);
            return;
          }
          return;
        }

        ons.notification.alert({
          title: "Connection issue",
          message: "Connection issue detected, please retry when you have connection",
          cancelable: false
        });*/
    },
    timeout: 4000
  });
}

function load_page7() {
  //  alert("helpdesk : " + user_id);
  //  $("#span_ids").text(" Loading....Please Wait...");
  modal = document.querySelector('ons-modal');

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal.show();
  $.ajax({
    url: "http://www.website.com/link/purchase/load_page_7.php",
    method: "POST",
    data: {
      helpdesk: helpdesk_id,
      option: '1',
      user: gUserId
    },
    //  tryCount: 0,
    //  retryLimit: 3,
    success: function success(data) {
      //   alert(data);
      document.getElementById("purchase_page_7_1").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      /*  if (status == 'timeout') {
          this.tryCount++;
          if (this.tryCount <= this.retryLimit) {
            //try again
            $.ajax(this);
            return;
          }
          return;
        }

        ons.notification.alert({
          title: "Connection issue",
          message: "There seems to be a network disruption, please try again",
          cancelable: false
        });*/

      modal.hide();
      fn.pop();
    },
    timeout: 4000
  });

  $.ajax({
    url: "http://www.website.com/link/purchase/load_page_7.php",
    method: "POST",
    data: {
      helpdesk: helpdesk_id,
      option: '2',
      user: gUserId
    },
    tryCount: 0,
    retryLimit: 3,
    success: function success(data) {

      document.getElementById("purchase_page_7_2").innerHTML = data;
      modal.hide();
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      if (status == 'timeout') {
        this.tryCount++;
        if (this.tryCount <= this.retryLimit) {
          //try again
          $.ajax(this);
          return;
        }
        return;
      }
    }
  });
}

function save_cart() {
  $.ajax({
    url: "http://www.website.com/link/purchase/add_to_cart.php",
    method: "POST",
    data: {
      helpdesk_id: helpdesk_id,
      item_code: item_code,
      user_id: gUserId,
      car_id: car_plate_id,
      qty: item_qty

    },
    success: function success(data) {
      // document.getElementById("dialog-1").show();
      //   showDialog("dialog-1");

      load_page7();
    }
  });
  //  fromTemplate();
  showModal('2');
  //  carousel.prev();
}

function page1_ctr(car_id) {

  car_plate_id = car_id;
  load_page2(car_id);
  //  document.getElementById("purchase_page_4").innerHTML = '';
  //  document.getElementById("purchase_page_3").innerHTML = '';

  carousel.next();
}

function page2_ctr() {
  load_page4();
  carousel.next();
}

function favorite_selection(partner_id) {

  favorite_partner = partner_id;
  load_page4();
  carousel.next();
}

function page3_ctr(selection) {

  switch (selection) {
    case '1':
      area = '';
      load_page3('1');
      break;
    case '2':
      state = '';
      load_page3('2');
      break;
    case '3':
      load_all_items();
      break;
    case '4':
      area = '';
      load_page3('3');
      break;
  }
}

function load_all_items() {
  state = '';
  favorite_partner = 'NO';
  area = '';
  type = '47102';
  type2 = '';
  load_page4();
  carousel.next();
}

function page4_ctr(selection) {
  //  alert(selection);
  console.log(selection);
  switch (selection) {
    case 'D':
      type2 = '';
      default_setting = selection;
      break;
    case 'A':
      type2 = '';
      default_setting = selection;
      break;
    case 'AP':
      control_additional_purchase();
      break;
    default:
      type = selection;
      console.log(type2);
      if (type2) {
        control_additional_purchase();
      };
      break;
  }

  load_page4();
  // carousel.next();
}

function control_additional_purchase() {
  default_setting = '';
  console.log(`control_additional_purchase`);
  switch (type) {
    case '47101':
      type2 = '00000';
      break;
    case '47102':
      type2 = '47104';
      break;
    case '47103':
      type2 = '47105';
      break;
  }
}

function state_selection(id) {

  state = id;
  page3_ctr('4');
}

function area_selection(areas) {
  //  alert(area);
  area = areas;
  favorite_partner = 'NO';
  load_page4();
  carousel.next();
}

function add_to_cart(select_item_id) {
  //  alert(helpdesk_id);
  item_code = select_item_id;

  load_page5();
  // save_cart();
  item_qty = 1;
  // load_page7();
  carousel.next();
}

function add() {

  item_qty = item_qty + 1;
  // alert(item_qty);
  load_page5();
}

function deduct() {

  if (item_qty == 1) {
    item_qty = 1;
  } else {
    item_qty = item_qty - 1;
  }
  load_page5();
}

function showModal(opt_select) {
  let modal = document.querySelector('ons-modal');
  let timing;
  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  switch (opt_select) {
    case '1':
      timing = 5000;
      break;
    case '2':
      timing = 0;
      break;
    case '3':
      modal.hide();
      return;
      break;
  }
  //link/misc/notification_wait.php
  if (opt_select == '1') {

    modal.show();
    if (timing > 0) {
      var mymodal = setTimeout(function() {
        modal.hide();

        load_page7();
      }, timing);
    }
  }

  if (opt_select == '2') {

    fromTemplate();
  }
}

function remove_from_cart(remove_item_id) {
  //  alert(remove_item_id);
  $.post(links + "link/purchase/remove_from_cart.php", {
    helpdesk: helpdesk_id,
    item_id: remove_item_id
  }, function(data) {
    if (data == 'Y') {
      //  alert(data);
      load_page7();
    }
  });
}

function buy_single_item(id, act) {
  // alert("IDS : " + id);

  console.log(id);
  console.log(act);

  $.post(links + "link/purchase/update_cart.php", {
    ids: id,
    actions: act
  }, function(data) {
    //  alert(data);
  });
  //  $("#span_ids").text(" Processing....");
  showModal('1');
  //  load_page7();
}

function load_coupon_page() {
  $.post(links + "link/purchase/load_coupon_page.php", {
    user: gUserId

  }, function(data) {
    document.getElementById("coupon_page").innerHTML = data;
  });
}

function show_coupon() {
  load_coupon_page();
  document.querySelector('#navigator').pushPage('coupon.html');
}

function close_coupon_page() {
  document.querySelector('#navigator').popPage();
}

function select_coupon(coupon_id) {
  // alert(coupon_id);

  if (helpdesk_id == '') {
    check_helpdesk(gUserId);
  }

  $.post(links + "link/purchase/save_coupon.php", {
    coupon: coupon_id,
    helpdesk: helpdesk_id
  }, function(data) {});
  document.querySelector('#navigator').popPage();
  load_page7();
}

function place_order(helpdesk, price) {
  //  alert(helpdesk);
  console.log('Helpdesk: ' + helpdesk);
  console.log('Price: ' + price);

  //  $("#span_ids").text("");
  modal = document.querySelector('ons-modal');

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal.show();

  /*  molpayTotal = price;
     sessionStorage.setItem(`molpayTotal`, molpayTotal.toFixed(2));
     cartMolpay();*/

  ons.notification.confirm({
    message: 'RM' + price + ' will be charged',
    buttonLabels: ["CANCEL", "BUY"],
    callback: function callback(response) {
      switch (response) {
        case 0:
          modal.hide();
          break;
        case 1:
          loadCustomerCredit(helpdesk, price);
          break;
      }
    }
  });

  /*  $.post(links + "link/purchase/place_order.php", {
      helpdesk: helpdesk_id
    }, function(data) {
      load_page7();
    })*/
}

var buttonClicked = function buttonClicked(selection) {
  switch (selection) {
    case "tyre":
      document.getElementById("tyre_icon").src = "http://www.website.com/link/icon/automall/tyre_clicked.png";
      document.getElementById("battery_icon").src = "http://www.website.com/link/icon/automall/battery_icon.png";
      document.getElementById("service_icon").src = "http://www.website.com/link/icon/automall/service_icon.png";
      console.log("tyre");
      break;

    case "battery":
      document.getElementById("battery_icon").src = "http://www.website.com/link/icon/automall/battery_clicked.png";
      document.getElementById("tyre_icon").src = "http://www.website.com/link/icon/automall/tyre_icon.png";
      document.getElementById("service_icon").src = "http://www.website.com/link/icon/automall/service_icon.png";
      console.log("battery");
      break;

    case "service":
      document.getElementById("service_icon").src = "http://www.website.com/link/icon/automall/service_clicked.png";
      document.getElementById("tyre_icon").src = "http://www.website.com/link/icon/automall/tyre_icon.png";
      document.getElementById("battery_icon").src = "http://www.website.com/link/icon/automall/battery_icon.png";
      console.log("service");
      break;
  }
}