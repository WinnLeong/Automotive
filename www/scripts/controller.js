'use strict';

//Splitter function
ons.ready(function() {
  console.log("Onsen UI is ready!");
  RequestLocation();
  //  ons.enableDeviceBackButtonHandler();
});

window.fn = {};
window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};
window.fn.load = function(page, data) {
  var content = document.getElementById('navigator');
  var menu = document.getElementById('menu');
  content.pushPage(page, data)
    //      .load(page)
    .then(menu.close.bind(menu));
};

window.fn.pop = function() {
  var content = document.getElementById('navigator');
  content.popPage();
};

window.fn.reset = function(page, data) {
  var content = document.getElementById('navigator');
  var menu = document.getElementById('menu');
  content.resetToPage(page, data).then(menu.close.bind(menu));
};

window.fn.replace = function(page, data) {
  var content = document.getElementById('navigator');
  var menu = document.getElementById('menu');
  content.replacePage(page, data).then(menu.close.bind(menu));
};

//Navigator integration
// Page init event
document.addEventListener('init', function(event) {
  var page = event.target;
  //  console.log($(page).text());
  //  console.log(JSON.stringify(page.id));
  //  console.log($(this.target).text());

  if (page.matches('#login-page')) {

    page.querySelector('#register-button').onclick = function() {
      document.querySelector('#navigator').pushPage('terms.html', { data: { title: 'Agreement' } });
    };

    //  localStorage.removeItem('helpdesk_id');

    ons.setDefaultDeviceBackButtonListener(function() {
      if (navigator.notification.confirm("Do you want to quit?",
          function(index) {
            if (index === 1) { // OK button
              sessionStorage.clear();
              navigator.app.exitApp(); // Close the app
            }
          }
        ));
    });
  } else if (page.matches('#dashboard-page')) {
    page.querySelector('#myVehicle-button').onclick = function() {
      document.querySelector('#navigator').pushPage('myVehicle.html', { data: { title: 'My Vehicle' } });
      GetMyVehicleList();
    };
    /*  page.querySelector('#tyre-button').onclick = () => {
        document.querySelector('#navigator').pushPage('tyrePurchase.html', { data: { title: 'Tyre' } });
      };
      page.querySelector('#battery-button').onclick = () => {
        document.querySelector('#navigator').pushPage('battPurchase.html', { data: { title: 'Battery' } });
      };
      page.querySelector('#carService-button').onclick = () => {
        document.querySelector('#navigator').pushPage('carService.html', { data: { title: 'Car Service' } });
      };*/
    page.querySelector('#breakdown-button').onclick = function() {
      document.querySelector('#navigator').pushPage('breakdown.html', { data: { title: 'Breakdown' } });
    };
    page.querySelector('#schedule-button').onclick = function() {
      document.querySelector('#navigator').pushPage('schedule.html', { data: { title: 'Schedule' } });
    };
    page.querySelector('#credit-button').onclick = function() {
      document.querySelector('#navigator').pushPage('credit.html', { data: { title: 'E-Voucher' } });

      modal = document.querySelector('ons-modal');

      $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

      modal.show();
    };
    page.querySelector('#reward-button').onclick = function() {
      document.querySelector('#navigator').pushPage('startup.html', { data: { title: 'ride Reward' } });
    };
  } else if (page.matches('#myProfile-page')) {
    page.querySelector('#changePassword-button').onclick = function() {
      document.querySelector('#navigator').pushPage('chgPassword.html', { data: { title: 'Change Password' } });
    };
  } else if (page.matches('#myVehicle-page')) {
    page.querySelector('#addNewVeh-button').onclick = function() {
      document.querySelector('#navigator').pushPage('addNewVeh.html', { data: { title: 'Add Vehicle' } });
    };

    /*    page.querySelector('#carSpec-button').onclick = ()=> {
          document.querySelector('#navigator').pushPage('carSpec.html', {data: {title: 'Car Specs'}});
        }*/
  } else if (page.matches('#rideCredit-page')) {
    page.querySelector('#topUp-button').onclick = function() {
      document.querySelector('#navigator').pushPage('topUp.html', { data: { title: 'E-Voucher' } });
    };
  } else if (page.matches('#rideReward-page')) {
    page.querySelector('#redeem-button').onclick = function() {
      document.querySelector('#navigator').pushPage('redeem.html', { data: { title: 'Redeem' } });
    };
  }
});

//Molpay payment object
var paymentDetails;
var molpayCallback;

/*document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

  console.log(`deviceReady`);
  console.log(molpayTotal.toFixed(2));

  paymentDetails = {
    // Mandatory String. A value more than '1.00'
    'mp_amount': '1.10',

    // Mandatory String. Values obtained from MOLPay
    'mp_username': 'api_samplelink',
    'mp_password': 'api_SyN3*2803',
    'mp_merchant_ID': 'samplelink_Dev',
    'mp_app_name': 'samplelink',
    'mp_verification_key': '5564e7e8694fd3bb6dd194d831e2debc',

    // Mandatory String. Payment values
    'mp_order_ID': 'testing',
    'mp_currency': 'MYR',
    'mp_country': 'MY',
    //'mp_sandbox_mode': true,

    // Optional String.
    'mp_channel': 'multi', // Use 'multi' for all available channels option. For individual channel seletion, please refer to "Channel Parameter" in "Channel Lists" in the MOLPay API Spec for Merchant pdf. 
    'mp_bill_description': 'testing this payment',
    'mp_bill_name': 'test',
    'mp_bill_email': 'name@samplelink.com',
    'mp_bill_mobile': '0174448888',
    'mp_channel_editing': false, // Option to allow channel selection.
    'mp_editing_enabled': false, // Option to allow billing information editing.
    //'mp_sandbox_mode': true
  };

  molpayCallback = function(transactionResult) {
    console.log(transactionResult);
  };

  //  window.molpay.startMolpay(paymentDetails, molpayCallback);
}*/

//declare variables for ride_sharing URL and samplelink URL
//const rideUrl = "http://www.ride_sharing.com/ride/";
var sampleLink = "http://www.samplelink.com/";
var sampleLink2 = "http://www.website.com/";

//parameters used in registration
var regDataParameters;

//user id, name and phone number stored in global variable
var gUserId;
var gName;
var gMobile;

//ons-modal
var modal = document.querySelector('ons-modal');

//registration data that is input by user will be stored in this function
function GetRegData() {

  if ($("#titleSelection option:selected").text() == "Title") {
    $("#titleSelection option:selected").text("");
    //  console.log("Title Selection value: " + $("#titleSelection option:selected").text());
  }

  var regName = $("#titleSelection option:selected").text() + $('#name').val();
  var pwd = $("#pwd").val();
  var hpNo = $("#hpNo").val();

  if ($("#phoneCode").val().includes("60")) {
    if ($("#hpNo").val().startsWith("0")) {
      //  console.log($("#hpNo").val().substring(1));
      hpNo = $("#hpNo").val().substring(1);
    }
  }

  var regMobile = $("#phoneCode").val() + hpNo;

  //  console.log(regMobile);
  //  $("#nric").val()

  /*  var parameters = {
      name: regName,
      password: pwd,
      email_add: $("#email").val(),
      ic: "",
      dob: $("#birthday").val(),
      mobile: regMobile,
      car_plate_num: $("#regVehPlate").val().toUpperCase(),
      car_type: $("#regVehType option:selected").text(),
      car_maker: $("#regVehMaker option:selected").text(),
      car_model: $("#regVehModel option:selected").text(),
      color: $("#regVehColor option:selected").text(),
      car_variant: $("#regVehVariant option:selected").text(),
      car_transmission: $("#regVehTransmission option:selected").text(),
      fuel_type: $("#regVehFuel option:selected").text(),
      car_battery: $("#regBattModel option:selected").text(),
      tyre_width: $("#regTyreWidth option:selected").text(),
      tyre_ratio: $("#regTyreRatio option:selected").text(),
      tyre_rim: $("#regTyreRim option:selected").text(),
      year: $("#regVehYear").val(),
      tyre_code: $("#regTyreWidth option:selected").text() + '/' + $("#regTyreRatio option:selected").text() + 'R' + $("#regTyreRim option:selected").text()
    };*/

  var birthday = $("#birthyear").val() + "-" + $("#birthmonth").val() + "-" + $("#birthday").val();

  console.log(birthday);

  var parameters = {

    name: regName,
    password: pwd,
    dob: birthday,
    mobile: regMobile,
    address: $("#address-input").val(),
    state: $("#stateSelect option:selected").text(),
    postcode: $("#postcodeSelect option:selected").text()
  };

  console.log($("#postcodeSelect option:selected").text());
  regDataParameters = parameters;

  //document.querySelector('#navigator').pushPage('referral.html');
  /*
    if ($("#personalDetWrapper input[type='text'").val() !== "" &&
      $("#personalDetWrapper input[type='password'").val() !== "" &&
      $("#nric").val() !== "" &&
      $("#titleSelection option:selected").val() !== "title" &&
      $("#phoneCode option:selected").val() !== "blank") */

  if ($("#register-page input[type='text']").val() !== "" && $("#register-page input[type='tel']").val() !== "" && $("#register-page input[type='password']").val() !== "" && $("#phoneCode option:selected").val() !== "blank") {
    //  $("#titleSelection option:selected").val() !== "title" &&
    //  $("#phoneCode option:selected").val() !== "blank" && $("#regVehType option:selected").val() !== "blank" && $("#regVehMaker option:selected").val() !== "blank" && $("#regVehModel option:selected").val() !== "blank" && $("#regVehYear option:selected").val() !== "blank" && $("#regVehVariant option:selected").val() !== "blank" && $("#regVehColor option:selected").val() !== "blank" && $("#regVehTransmission option:selected").val() !== "blank" && $("#regVehFuel option:selected").val() !== "blank" && $("#regBattModel option:selected").val() !== "blank" && $("#regTyreWidth option:selected").val() !== "blank" && $("#regTyreRatio option:selected").val() !== "blank" && $("#regTyreRim option:selected").val() !== "blank") {
    console.log("1");
    Register();
  } else {
    ons.notification.toast({
      message: 'All fields are required',
      timeout: 2500
    });
  }
}

//Connect to PHP file for registration
function Register() {

  console.log(JSON.stringify(regDataParameters));

  /*  $.post(sampleLink2 + "customer_registration.php",regDataParameters,function(data){
      alert(data);
      console.log("Successfully Called AJAX");
      console.log("JSON:" + JSON.stringify(data));
      content.load("dashboard.html"); 
    });*/

  $.ajax({
    url: sampleLink2 + "ride_v2/customer_registration.php",
    data: regDataParameters,
    method: "POST",
    success: function success(data) {
      //  console.log(data);

      var jData = JSON.parse(data);

      //registration was successful 
      if (data.includes("Y")) {
        console.log("Data:" + data);

        console.log(jData[0].user_id);
        gUserId = jData[0].user_id;
        //  fn.reset("login.html");
        fn.replace("regVehicle.html");

        ons.notification.toast({
          message: "Please register your vehicle",
          timeout: 1500
        });
      }
      //Following means registration has failed
      else if (data.includes("E1")) {
        console.log("JSON:" + JSON.stringify(data));

        ons.notification.toast({
          message: "Phone number already exist",
          timeout: 1500
        });

        //  document.querySelector('#navigator').popPage();
      } else if (data.includes("E2")) {
        console.log("Data:" + data);

        ons.notification.toast({
          message: "Phone number already exist",
          timeout: 1500
        });

        //  document.querySelector('#navigator').popPage();
      } else if (data.includes("E3")) {
        console.log("Data:" + data);

        ons.notification.toast({
          message: "Phone number already exist",
          timeout: 1500
        });

        //  document.querySelector('#navigator').popPage();
      }
      /*      else if(data.includes("N")) //N appears to be unnecessary
              console.log("Data:" + data);
              console.log("N occured");
               ons.notification.alert({
                message: "Unexpected failure occured, please try again",
                title: "Error encountered",
                cancelable: false
              });*/

      //        content.load("register.html");
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "There seems to be a network disruption, please try again",
        cancelable: false
      });
    },
    timeout: 4000
  });
}

/*function GetRegVehData() {


  $.ajax({
    url: sampleLink2 + "ride_v2/customer_registration.php",
    data: parameters,
    method: "POST",
    success: function success(data) {

    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);
    }
  });
}*/

function Malaysian() {
  //  $("#nricPassportText").text("NRIC");
  $("#phoneCode").val("+60");
}

function Foreigner() {
  //  $("#nricPassportText").text("Passport");
  $("#phoneCode").val("blank");
}

//Connect to PHP file for Login
function Login() {
  //var email = $("#loginEmail").val(),
  var mobile = "+6" + $("#loginPhone").val(),
    password = $("#loginPassword").val();

  var loginParameters = {
    mobile: mobile,
    password: password
  };

  modal = document.querySelector('ons-modal');

  $("#modalContainer").empty();
  $("#modalContainer").append('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal.show();

  //  console.log(email);
  console.log(mobile);
  console.log(password);

  //  if (email != "" && password != "") {

  if (mobile != "" && password != "") {
    $.ajax({
      url: sampleLink2 + "ride_v2/Login.php",
      data: loginParameters,
      method: "POST",
      success: function success(data) {

        //  console.log(data);
        Geolocate();

        var jData = JSON.parse(data);
        var i = 0;

        if (jData[i].new_user_id.includes("Wrong Password")) {

          modal.hide();

          ons.notification.toast({ message: 'Password is incorrect', timeout: 4000 });
        } else if (jData[i].new_user_id.includes("This is an unregistered email")) {

          modal.hide();
          ons.notification.toast({ message: 'Invalid Phone Number', timeout: 4000 });
        } else {
          gUserId = jData[i].new_user_id;
          gName = jData[i].name;
          gMobile = jData[i].mobile_number;
          console.log(jData[i].new_user_id);

          //  localStorage.setItem('loginEmail', $("#loginEmail").val());
          localStorage.setItem('loginName', jData[i].name);
          localStorage.setItem('loginEmail', jData[i].email_add);
          localStorage.setItem('loginPhone', $("#loginPhone").val());
          localStorage.setItem('loginPassword', $("#loginPassword").val());

          /*  if ($('input[name="rememberMe"]').is(':checked')) {
              localStorage.setItem(`loginEmail`, $("#loginEmail").val());
              localStorage.setItem(`loginPassword`, $("#loginPassword").val());
            }*/

          modal.hide();

          document.querySelector('#navigator').replacePage('dashboard.html', { data: { title: 'Dashboard' } });
          // fn.load("dashboard.html");
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);

        ons.notification.alert({
          title: "Connection issue",
          message: "There seems to be a network disruption, please try again",
          cancelable: false
        });

        modal.hide();

      },
      timeout: 6000
    });
  } else {
    ons.notification.toast({
      message: 'Fields cannot be empty',
      timeout: 3000
    });

    modal.hide();
  }
}

function Logout() {

  fn.reset("login.html");
  sessionStorage.clear();
  localStorage.clear();
}

function ResetPassword() {
  fn.load("resetPassword.html");
}

function ResetEmail() {

  var parameters = {
    email: $("#resetEmail").val(),
    ic_num: "",
    type: "E",
    password: ""
  };

  $.ajax({
    url: sampleLink2 + "ride/reset_password.php",
    data: parameters,
    method: "POST",
    success: function success(data) {
      //  console.log(data);

      var jData = JSON.parse(data);

      if (jData[0].result == "Email Found") {

        document.getElementById("resetEmail").disabled = "true";
        document.getElementById("checkEmail").disabled = "true";

        document.getElementById("resetIcWrapper").style.visibility = "visible";
      }

      ons.notification.toast({
        message: jData[0].result,
        timeout: 2500
      });
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);
    }
  });
}

function ResetIc() {

  var parameters = {
    email: $("#resetEmail").val(),
    ic_num: $("#resetIc").val(),
    type: "IC",
    password: ""
  };

  $.ajax({
    url: sampleLink2 + "ride/reset_password.php",
    data: parameters,
    method: "POST",
    success: function success(data) {
      //  console.log(data);

      var jData = JSON.parse(data);

      if (jData[0].result == "IC Found") {

        document.getElementById("resetIc").disabled = "true";
        document.getElementById("checkIc").disabled = "true";

        document.getElementById("resetPwdWrapper").style.visibility = "visible";
      }

      ons.notification.toast({
        message: jData[0].result,
        timeout: 2500
      });
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);
    }
  });
}

function ResetUpdate() {

  if ($("#resetPwd").val() === $("#re-enterPwd").val()) {

    var parameters = {
      email: $("#resetEmail").val(),
      ic_num: $("#resetIc").val(),
      type: "RESET",
      password: $("#resetPwd").val()
    };

    $.ajax({
      url: sampleLink2 + "ride/reset_password.php",
      data: parameters,
      method: "POST",
      success: function success(data) {
        //  console.log(data);

        var jData = JSON.parse(data);

        fn.pop();

        ons.notification.toast({
          message: jData[0].result,
          timeout: 2500
        });
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);
      }
    });
  } else {
    ons.notification.toast({
      message: 'Password does not match',
      timeout: 2000
    });
  }
}

//Get List of user vehicles in My Vehicles page
function GetMyVehicleList() {

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal = document.querySelector('ons-modal');
  modal.show();

  $.ajax({
    url: sampleLink2 + "ride_v2/get_user_VehicleInfo.php",
    data: { user_id: gUserId },
    method: "POST",
    success: function success(data) {

      //  console.log(data);
      var jData = JSON.parse(data);

      var i = 0;

      while (i < jData.length) {

        $("#loadMyVehicles").append('<ons-list-item tappable id="vehList' + i + '" modifier="chevron longdivider" onclick="GetCarSpecs(this.id)">\n            <span class="list-item__title">' + jData[i]["Model"] + '</span>\n            <span class="list-item__subtitle">' + jData[i]["Car Plate"] + '</span>\n          </ons-list-item>');

        //  console.log(i);
        i += 1;
      }

      modal.hide();
    },
    error: (jqxhr, status, errorThrown) => {
      console.log("Error: " + errorThrown);

      ons.notification.alert({
        title: "Connection issue",
        message: "Network issue detected, please try again when you have connection",
        cancelable: false
      });

      fn.pop();
      modal.hide();
    },
    timeout: 5000
  });
}

//Get car specifications data for carSpecs.html from get_user_VehicleInfo.php
function GetCarSpecs(vehList) {

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal = document.querySelector('ons-modal');
  modal.show();

  fn.load("carSpecs.html");

  var i = vehList.substring(7);
  console.log(i);

  //ListVehBatt();

  $.ajax({
    url: sampleLink2 + "ride_v2/get_user_VehicleInfo.php",
    data: { user_id: gUserId },
    method: "POST",
    success: function success(data) {
      modal.hide();

      //  console.log(data);

      var jData = JSON.parse(data);

      //append car specifications to labels

      sessionStorage.setItem('carplate', jData[i]["Car Plate"]);
      /*  sessionStorage.setItem(`battery`, jData[i].Battery);
        sessionStorage.setItem(`width`, jData[i]["Tayar Width"]);
        sessionStorage.setItem(`ratio`, jData[i]["tayar ratio"]);
        sessionStorage.setItem(`rim`, jData[i]["Tayar Rim"]);*/

      sessionStorage.setItem('brand', jData[i].Brand);
      sessionStorage.setItem('model', jData[i].Model);
      sessionStorage.setItem('year', jData[i].Year);

      $("#carSpecsWrapper").empty();

      $("#carSpecsWrapper").append('<table id="carSpecsTable">\n          <tr>\n            <th colspan="2" style="background-color:#ffdd00; text-align:left; padding-left: 4%">Vehicle Details</th>\n          </tr>\n          <tr>\n            <td>\n              <label>Veh. Reg. No.</label>\n              <label class="specData">' + jData[i]["Car Plate"] + '</label>\n            </td>\n            <td>\n              <label>Vehicle Type</label>\n              <label class="specData">' + jData[i]["Car Type"] + '</label>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <label>Maker</label>\n              <label class="specData">' + jData[i].Brand + '</label>\n            </td>\n            <td>\n              <label>Model</label>\n              <label class="specData">' + jData[i].Model + '</label>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <label>Year</label>\n              <label class="specData">' + jData[i].Year + '</label>\n            </td>\n            <td>\n              <label>Variants</label>\n              <label class="specData">' + jData[i].Variant + '</label>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <label>Transmission</label>\n              <label class="specData">' + jData[i].Transmission + '</label>\n            </td>\n    <td>\n              <label>Battery Model</label>\n              <input type="text" id="battModel" value=' + jData[i].Battery + ' disabled>\n\n              <select id="listBattModel" class="select-input" style="display:none">\n              </select>\n            </td>\n      </tr>\n         <tr>\n            <td>\n              <label>Color</label>\n              <label class="specData">' + jData[i].Color + '</label>\n            </td>\n          <tr>\n            <th colspan="2">Tyre Dimension <button class="btnDef" onclick="showTyreGuide(this)">View Tyre Guide</button></th>\n          </tr>\n     <tr>\n            <td colspan="2"><label>Tyre Code</label> \n <input type="text" style="max-width: 50%" id="tyreCode" value=' + jData[i].Tyre + ' disabled>\n</td>\n          </tr>\n     <tr>\n            <td id="widthColumn">\n              <label>Tyre Width</label>\n              <input type="text" id="tyreWidth" value=' + jData[i]["Tayar Width"] + ' disabled>\n\n              <select id="listTyreWidth" class="select-input" style="display:none">\n                <option value="blank" selected disabled></option>\n              </select>\n            </td>\n            <td id="ratioColumn">\n              <label>Aspect Ratio</label>\n              <input type="text" id="tyreRatio" value=' + jData[i]["tayar ratio"] + ' disabled>\n\n              <select id="listTyreRatio" class="select-input" style="display:none">\n                <option value="blank" selected disabled></option>\n              </select>\n            </td>\n          </tr>\n          <tr>\n            <td id="rimColumn">\n              <label>Rim Size</label>\n              <input type="text" id="tyreRim" value=' + jData[i]["Tayar Rim"] + ' disabled>\n\n              <select id="listTyreRim" class="select-input" style="display:none">\n                <option value="blank" selected disabled></option>\n              </select>\n            </td>\n          </tr>\n        </table>\n        \n        <div style="text-align:center">\n          <ons-button id="saveCarSpec" onclick="SaveCarSpec()">Update</ons-button>\n        </div>');
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please try again when you have internet connection",
        cancelable: false
      });

      modal.hide();
    },
    timeout: 4000
  });
}

function carSpecsEdit(battModel_val, tyreWidth_val, aspectRatio_val, rimSize_val) {

  //  console.log(battModel_val + ", " + tyreWidth_val + ", " + aspectRatio_val + ", " + rimSize_val);

  setTimeout(function() {

    /*  console.log(sessionStorage.getItem(`brand`));
      console.log(sessionStorage.getItem(`model`));
      console.log(sessionStorage.getItem(`year`));*/

    $.ajax({
      url: sampleLink2 + "ride/get_battery_code.php",
      method: "GET",
      success: function success(data) {

        //  console.log(data);

        var jData = JSON.parse(data);

        var x = 0;

        console.log(battModel_val);

        $("#listBattModel").empty();

        $("#listBattModel").append('<option value=' + battModel_val + ' selected disabled>' + battModel_val + '</option>');

        while (x < jData.length) {

          $("#listBattModel").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
          x += 1;
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);
      },
      timeout: 4000
    });

    //Tyre Width
    $.ajax({
      url: sampleLink2 + "ride/get_vehicle_TyreWidth.php",
      method: "GET",
      success: function success(data) {
        var jData = JSON.parse(data);

        var x = 0;

        console.log(tyreWidth_val);

        $("#listTyreWidth").empty();

        $("#listTyreWidth").append('<option value=' + tyreWidth_val + ' selected disabled>' + tyreWidth_val + '</option>');

        while (x < jData.length) {

          $("#listTyreWidth").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
          x += 1;
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);
      },
      timeout: 4000
    });

    //Tyre Aspect Ratio
    $.ajax({
      url: sampleLink2 + "ride/get_vehicle_TyreAspectRatio.php",
      method: "GET",
      success: function success(data) {
        var jData = JSON.parse(data);

        var x = 0;

        console.log(aspectRatio_val);

        $("#listTyreRatio").empty();

        $("#listTyreRatio").append('<option value=' + aspectRatio_val + ' selected disabled>' + aspectRatio_val + '</option>');

        while (x < jData.length) {

          $("#listTyreRatio").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
          x += 1;
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);
      },
      timeout: 4000
    });

    //Tyre Rim Size
    $.ajax({
      url: sampleLink2 + "ride/get_vehicle_TyreRimSize.php",
      method: "GET",
      success: function success(data) {
        var jData = JSON.parse(data);

        var x = 0;

        console.log(rimSize_val);

        $("#listTyreRim").empty();

        $("#listTyreRim").append('<option value=' + rimSize_val + ' selected disabled>' + rimSize_val + '</option>');

        while (x < jData.length) {

          $("#listTyreRim").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
          x += 1;
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);

        ons.notification.alert({
          title: "Connection issue",
          message: "Unable to load tyre data, please retry",
          cancelable: false
        });

        fn.pop();
      },
      timeout: 4000
    });
  }, 500);
}

function EnableEditVehicle() {
  /*  document.getElementById("battModel").disabled = false;
    document.getElementById("tyreWidth").disabled = false;
    document.getElementById("tyreRatio").disabled = false;
    document.getElementById("tyreRim").disabled = false;*/

  document.getElementById("battModel").style.display = "none";
  document.getElementById("tyreWidth").style.display = "none";
  document.getElementById("tyreRatio").style.display = "none";
  document.getElementById("tyreRim").style.display = "none";

  document.getElementById("editVehicle-button").style.display = "none";

  /*  document.getElementById("battModel").style.fontWeight = "bold";
    document.getElementById("tyreWidth").style.fontWeight = "bold";
    document.getElementById("tyreRatio").style.fontWeight = "bold";
    document.getElementById("tyreRim").style.fontWeight = "bold";*/

  document.getElementById("saveCarSpec").style.visibility = "visible";

  document.getElementById("listBattModel").style.display = "inline";
  document.getElementById("listTyreWidth").style.display = "inline";
  document.getElementById("listTyreRatio").style.display = "inline";
  document.getElementById("listTyreRim").style.display = "inline";

  document.getElementById("widthColumn").style.visibility = "visible";
  document.getElementById("ratioColumn").style.visibility = "visible";
  document.getElementById("rimColumn").style.visibility = "visible";
}

function SaveCarSpec() {

  console.log("Battery Model: " + $("#battModel").val());
  console.log("Tyre width: " + $("#tyreWidth").val());
  console.log("Tyre Ratio: " + $("#tyreRatio").val());
  console.log("Tyre Rim: " + $("#tyreRim").val());

  /*  let parameters = {
      user_id: gUserId,
      carplate: sessionStorage.getItem(`carplate`),
      battery: $("#battModel").val(),
      width: $("#tyreWidth").val(),
      ratio: $("#tyreRatio").val(),
      rim: $("#tyreRim").val()
    };*/

  var battery = $("#listBattModel option:selected").text();
  var tyreWidth = $("#listTyreWidth option:selected").text();
  var tyreRatio = $("#listTyreRatio option:selected").text();
  var tyreRim = $("#listTyreRim option:selected").text();

  var parameters = {
    user_id: gUserId,
    carplate: sessionStorage.getItem('carplate'),
    battery: battery,
    width: tyreWidth,
    ratio: tyreRatio,
    rim: tyreRim
  };

  if (battery !== "" && tyreWidth !== "" && tyreRatio !== "" && tyreRim !== "") {
    $.ajax({
      url: sampleLink2 + 'ride_v2/update_vehicle_info.php',
      data: parameters,
      method: "POST",
      success: function success(data) {
        //  console.log(data);

        var jData = JSON.parse(data);

        if (jData[0].status == "Success") {
          ons.notification.toast({
            message: 'Update successful',
            timeout: 2000
          });

          fn.reset("dashboard.html");
        } else {
          ons.notification.toast({
            message: 'Something went wrong, please try again',
            timeout: 2000
          });
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log('Error: ' + errorThrown);
        console.log('Error: ' + jqxhr.responseText);
      }
    });
  } else {
    ons.notification.toast({
      message: 'Fields cannot be empty',
      timeout: 3000
    });
  }
}

//show Popover Tyre Guide in Add New Vehicles page
var showTyreGuide = function showTyreGuide(target) {
  document.getElementById('popover').show(target);
};

var hideTyreGuide = function hideTyreGuide() {
  document.getElementById('popover').hide();
};

document.addEventListener("show", function() {

  if (event.target.id === "carService-page") {
    $.ajax({
      url: sampleLink2 + "ride_v2/get_user_VehicleInfo.php",
      data: { user_id: gUserId },
      method: "POST",
      //      dataType: "json",
      success: function success(data) {
        var jData = JSON.parse(data);

        //    console.log(data);

        var i = 0;
        //      $.each(jData[i], function(){

        while (i < jData.length) {

          $("#selectVehicle").append('<option value="0' + i + '">' + jData[i].Model + '</option>');

          i += 1;
        }
        //      });
      }
    });
  } else if (event.target.id == "register-page") {

    $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

    modal = document.querySelector('ons-modal');
    modal.show();

    //Phone Code
    $.ajax({
      url: sampleLink2 + 'ride/get_phone_code.php',
      method: "GET",
      success: function success(data) {
        //  console.log(data);

        var jData = JSON.parse(data);
        var i = 0;

        //  console.log(jData[2].name);

        while (i < jData.length) {
          $("#phoneCode").append('<option value="' + jData[i].phone_code + '">' + jData[i].phone_code + ' ' + jData[i].name + '</option>');

          i += 1;
        }

        $("#phoneCode").val("+60");
      },
      error: function(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);

        ons.notification.alert({
          title: "Connection issue",
          message: "Failed to load phone code, please check your internet connection",
          cancelable: false
        });
      },
      timeout: 4000
    });

    //State
    $.ajax({
      url: sampleLink2 + "ride_v2/load_state.php",
      method: "GET",
      success: function success(data) {
        //  console.log(data);

        //  var jData = JSON.parse(data);

        //  var x = 0;

        //  while (x < jData.length) {

        $("#stateWrapper").append(data);
        //    x += 1;
        //  }
        modal.hide();
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);

        ons.notification.alert({
          title: "Connection issue",
          message: "Connection issue detected, please try again when you have internet connection",
          cancelable: false
        });

        fn.pop();
        modal.hide();
      },
      timeout: 4000
    });

    //Vehicle Type
    /*  $.ajax({
        url: sampleLink2 + "ride/get_vehicle_Type.php",
        method: "GET",
        success: function success(data) {

          var jData = JSON.parse(data);

          var x = 0;

          while (x < jData.length) {

            $("#regVehType").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
            x += 1;
          }
        },
        error: function error(jqxhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Error: " + jqxhr.responseText);
        }
      });

      //Vehicle Variant
      $.ajax({
        url: sampleLink2 + "link/registration/vehicle_variant.php",
        method: "GET",
        success: function success(data) {

          var jData = JSON.parse(data);

          var x = 0;

          while (x < jData.length) {

            $("#regVehVariant").append('<option value=' + jData[x].id + '>' + jData[x].name + '</option>');
            x += 1;
          }
        },
        error: function error(jqxhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Error: " + jqxhr.responseText);
        }
      });

      //Vehicle Color
      $.ajax({
        url: sampleLink2 + "ride/get_vehicle_Color.php",
        method: "GET",
        success: function success(data) {
          var jData = JSON.parse(data);

          var x = 0;

          while (x < jData.length) {

            $("#regVehColor").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
            x += 1;
          }
        },
        error: function error(jqxhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Error: " + jqxhr.responseText);
        }
      });

      //Vehicle Transmission
      $.ajax({
        url: sampleLink2 + "ride/get_vehicle_Transmission.php",
        method: "GET",
        success: function success(data) {
          var jData = JSON.parse(data);

          var x = 0;

          while (x < jData.length) {

            $("#regVehTransmission").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
            x += 1;
          }
        },
        error: function error(jqxhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Error: " + jqxhr.responseText);
        }
      });

      //Vehicle Fuel
      $.ajax({
        url: sampleLink2 + "ride/get_vehicle_Fuel.php",
        method: "GET",
        success: function success(data) {
          var jData = JSON.parse(data);

          var x = 0;

          while (x < jData.length) {

            $("#regVehFuel").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
            x += 1;
          }
        },
        error: function error(jqxhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Error: " + jqxhr.responseText);
        }
      });

      //Tyre Width
      $.ajax({
        url: sampleLink2 + "ride/get_vehicle_TyreWidth.php",
        method: "GET",
        success: function success(data) {
          var jData = JSON.parse(data);

          var x = 0;

          while (x < jData.length) {

            $("#regTyreWidth").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
            x += 1;
          }
        },
        error: function error(jqxhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Error: " + jqxhr.responseText);
        }
      });

      //Tyre Aspect Ratio
      $.ajax({
        url: sampleLink2 + "ride/get_vehicle_TyreAspectRatio.php",
        method: "GET",
        success: function success(data) {
          var jData = JSON.parse(data);

          var x = 0;

          while (x < jData.length) {

            $("#regTyreRatio").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
            x += 1;
          }
        },
        error: function error(jqxhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Error: " + jqxhr.responseText);
        }
      });

      //Tyre Rim Size
      $.ajax({
        url: sampleLink2 + "ride/get_vehicle_TyreRimSize.php",
        method: "GET",
        success: function success(data) {
          var jData = JSON.parse(data);

          var x = 0;

          while (x < jData.length) {

            $("#regTyreRim").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
            x += 1;
          }
        },
        error: function error(jqxhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Error: " + jqxhr.responseText);
        }
      });*/
  } else if (event.target.id == "regVehicle-page") {
    loadVehBrand();
    getVehicleColor();

  } else if (event.target.id == "dashboard-page") {
    //  localStorage.removeItem(`helpdesk_id`);
    //  console.log(localStorage.getItem(`oneSignal`));
    /*  $("#menu").attr("swipeable", "swipeable");
      $("#menu").attr("swipe-target-width", "50px");*/

    //cart helpdesk for cart icon badge 
    check_helpdesk(gUserId);

    setTimeout(function() {
      $.ajax({
        url: sampleLink2 + "link/purchase/cart_qty.php",
        data: { helpdesk: sessionStorage.getItem('cartHelpdesk') },
        method: "POST",
        success: function(data) {
          //  console.log(data);

          var jData = JSON.parse(data);
          console.log(jData[0].cart_qty);

          $("#dashboard-right").html(
            `<ons-toolbar-button onclick="fn.load('cart.html')" style="padding: 10% 10% 0 0">
              <img src="img/Cart.png" style="max-width:85%; max-height:85%">
              <span class="notification notification--material">${jData[0].cart_qty}</span>
            </ons-toolbar-button>`
          );

          //  $("#dashboard-right").append('<span class="notification notification--material">' + jData[0].cart_qty + '</span>');
        },
        error: function(jqxhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Error: " + jqxhr.responseText);
        },
        timeout: 4000
      });
    }, 500);

    //end cart helpdesk

    var myProfileParameters = {
      user_id: gUserId,
      Update: "get",
      new_name: "",
      new_ic: "",
      new_mobile: "",
      dob: ""
    };

    $.ajax({
      url: sampleLink2 + "ride_v2/get_user_Profile.php",
      data: myProfileParameters,
      method: "POST",
      success: function success(data) {
        //  console.log(data);

        var jData = JSON.parse(data);

        $("#getMenuName").empty();

        $("#getMenuName").append('Welcome ' + jData[0].name + '!');

        /*  sessionStorage.setItem("profileName", jData[0].name);
          sessionStorage.setItem("profileEmail", jData[0].email);
          sessionStorage.setItem("profileMobile", jData[0].mobile_number);*/
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log(errorThrown);
        console.log('' + jqxhr.responseText);
      }

    });

    ons.setDefaultDeviceBackButtonListener(function() {
      if (navigator.notification.confirm("Do you want to quit?",
          function(index) {
            if (index === 1) { // OK button
              sessionStorage.clear();
              navigator.app.exitApp(); // Close the app
            }
          }
        ));
    });
  } else if (event.target.id == "myProfile-page") {

    $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

    modal = document.querySelector('ons-modal');
    modal.show();

    var myProfileParameters = {
      user_id: gUserId,
      Update: "get",
      new_name: "",
      new_ic: "",
      new_mobile: "",
      dob: ""
    };

    $.ajax({
      url: sampleLink2 + "ride_v2/get_user_Profile.php",
      data: myProfileParameters,
      method: "POST",
      success: function success(data) {
        //  console.log(data);

        var jData = JSON.parse(data);

        //append user details to my profile textfields
        $("#profileName").val(jData[0].name);
        //  $("#nric").val(jData[0].ic_num);
        $("#profileBirthday").val(jData[0].dob);
        $("#profileMobile").val(jData[0].mobile_number);
        //  $("#profileEmail").val(jData[0].email_add);
        $("#profileAddress").val(jData[0].address);

        var i = 0;

        $("#loadProfileVehicles").empty();

        $("#loadProfileVehicles").append('<ons-list-header>Your Vehicle</ons-list-header>');

        while (i < jData.length) {

          $("#loadProfileVehicles").append('<ons-list-item modifier="longdivider" tappable id="vehList' + i + '" onclick="GetCarSpecs(this.id)">\n                <div class="left">\n                  <img class="list-item__thumbnail" src=' + jData[i].url + '>\n                </div>\n                <div class="center" style="padding-left: 5%">\n                  <span class="list-item__title">' + jData[i]["car_plate"] + '</span><span class="list-item__subtitle"> </span>\n                </div>\n              </ons-list-item>');

          i += 1;
        }

        modal.hide();
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);

        ons.notification.alert({
          title: "Connection issue",
          message: "Connection issue has been detected.",
          cancelable: false
        });

        modal.hide();
      },
      timeout: 4000

    });
  } else if (event.target.id == "carSpecs-page") {

    setTimeout(function() { carSpecsEdit($("#battModel").val(), $("#tyreWidth").val(), $("#tyreRatio").val(), $("#tyreRim").val()); }, 300);

  } else if (event.target.id == "addVehicle-page") {

    loadVehBrand();
    getVehicleColor();

    //Vehicle Type
    /*    $.ajax({
          url: sampleLink2 + "ride/get_vehicle_Type.php",
          method: "GET",
          success: function success(data) {

            var jData = JSON.parse(data);

            var x = 0;

            while (x < jData.length) {

              $("#regVehType").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
              x += 1;
            }
          },
          error: function error(jqxhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Error: " + jqxhr.responseText);
          }
        });

        //Vehicle Variant
        $.ajax({
          url: sampleLink2 + "link/registration/vehicle_variant.php",
          method: "GET",
          success: function success(data) {

            var jData = JSON.parse(data);

            var x = 0;

            while (x < jData.length) {

              $("#regVehVariant").append('<option value=' + jData[x].id + '>' + jData[x].name + '</option>');
              x += 1;
            }
          },
          error: function error(jqxhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Error: " + jqxhr.responseText);
          }
        });

        //Vehicle Color
        $.ajax({
          url: sampleLink2 + "ride/get_vehicle_Color.php",
          method: "GET",
          success: function success(data) {
            var jData = JSON.parse(data);

            var x = 0;

            while (x < jData.length) {

              $("#regVehColor").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
              x += 1;
            }
          },
          error: function error(jqxhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Error: " + jqxhr.responseText);
          }
        });

        //Vehicle Transmission
        $.ajax({
          url: sampleLink2 + "ride/get_vehicle_Transmission.php",
          method: "GET",
          success: function success(data) {
            var jData = JSON.parse(data);

            var x = 0;

            while (x < jData.length) {

              $("#regVehTransmission").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
              x += 1;
            }
          },
          error: function error(jqxhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Error: " + jqxhr.responseText);
          }
        });

        //Vehicle Fuel
        $.ajax({
          url: sampleLink2 + "ride/get_vehicle_Fuel.php",
          method: "GET",
          success: function success(data) {
            var jData = JSON.parse(data);

            var x = 0;

            while (x < jData.length) {

              $("#regVehFuel").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
              x += 1;
            }
          },
          error: function error(jqxhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Error: " + jqxhr.responseText);
          }
        });

        //Tyre Width
        $.ajax({
          url: sampleLink2 + "ride/get_vehicle_TyreWidth.php",
          method: "GET",
          success: function success(data) {
            var jData = JSON.parse(data);

            var x = 0;

            while (x < jData.length) {

              $("#regTyreWidth").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
              x += 1;
            }
          },
          error: function error(jqxhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Error: " + jqxhr.responseText);
          }
        });

        //Tyre Aspect Ratio
        $.ajax({
          url: sampleLink2 + "ride/get_vehicle_TyreAspectRatio.php",
          method: "GET",
          success: function success(data) {
            var jData = JSON.parse(data);

            var x = 0;

            while (x < jData.length) {

              $("#regTyreRatio").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
              x += 1;
            }
          },
          error: function error(jqxhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Error: " + jqxhr.responseText);
          }
        });

        //Tyre Rim Size
        $.ajax({
          url: sampleLink2 + "ride/get_vehicle_TyreRimSize.php",
          method: "GET",
          success: function success(data) {
            var jData = JSON.parse(data);

            var x = 0;

            while (x < jData.length) {

              $("#regTyreRim").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
              x += 1;
            }
          },
          error: function error(jqxhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Error: " + jqxhr.responseText);
          }
        });*/
  } else if (event.target.id == "breakdown-page") {

    $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

    modal = document.querySelector('ons-modal');
    modal.show();

    $.ajax({
      url: sampleLink2 + "ride_v2/get_user_VehicleInfo.php",
      data: { user_id: gUserId },
      method: "POST",
      success: function success(data) {

        var jData = JSON.parse(data);

        //  console.log(data);

        var i = 0;
        //  var time = 30;
        $("#loadBreakdownVehicles").empty();

        if (localStorage.getItem('helpdesk_id') == null || localStorage.getItem('helpdesk_id') == "null") {
          //  console.log(localStorage.getItem(`helpdesk_id`));

          while (i < jData.length) {

            $("#loadBreakdownVehicles").append('<ons-list-item tappable id=' + jData[i]["Car Plate"] + ' modifier="chevron longdivider" onclick="GetBreakdownCategory(this.id)">\n                <span class="list-item__title">' + jData[i]["Model"] + '</span>\n                <span class="list-item__subtitle">' + jData[i]["Car Plate"] + '</span>\n              </ons-list-item>');

            i += 1;
          }
        } else {
          console.log(localStorage.getItem('helpdesk_id'));

          ons.notification.alert({
            title: 'Pending order found',
            message: 'Pending order detected, proceeding to the order',
            cancelable: false
          });

          sessionStorage.setItem('helpdesk_id', localStorage.getItem('helpdesk_id'));

          fn.load("getBreakdownTeam.html");

          GetBreakdownTeamResponse();

          /*  $.ajax({
            url: `${sampleLink2}ride/get_breakdownteam_Response.php`,
            data: { helpdesk_id: sessionStorage.getItem("helpdesk_id") },
            method: "POST",
            success: data => {
                     if (jData[0].status == "10002") {
                       PaymentAgreement();
                     } else if (jData[0].status == "10014") {
                i = 0;
                 ons.notification.toast({
                  message: `Partner has cancelled your order, please re-try`,
                  timeout: 3000
                });
                       while (i < jData.length) {
                  
                  $("#loadBreakdownVehicles").append(
                    `<ons-list-item tappable id=${jData[i]["Car Plate"]} modifier="chevron longdivider" onclick="GetBreakdownCategory(this.id)">
                      <span class="list-item__title">${jData[i]["Model"]}</span>
                      <span class="list-item__subtitle">${jData[i]["Car Plate"]}</span>
                    </ons-list-item>`
                  );
                         i += 1;
                }
              } else if (jData[0].status == "10008") {
                       i = 0;
              //  let time = 30;
                time = 30;
                 const bDownResponse = setInterval(() => {
                  time -= 1;
                  
                  $("#modalContainer").html(`<ons-icon icon="md-spinner" size="28px" spin></ons-icon> Partner is currently processing your order ${time}`);
                           if (time == 0) {
                    clearInterval(bDownResponse);
                    modal.hide();
                             UpdateStatusNotAccepted();
                             ons.notification.toast({
                      message: `Partner did not accept your request`,
                      timeout: 3000
                    });
                     while (i < jData.length) {
                      
                      $("#loadBreakdownVehicles").append(
                        `<ons-list-item tappable id=${jData[i]["Car Plate"]} modifier="chevron longdivider" onclick="GetBreakdownCategory(this.id)">
                          <span class="list-item__title">${jData[i]["Model"]}</span>
                          <span class="list-item__subtitle">${jData[i]["Car Plate"]}</span>
                        </ons-list-item>`
                      );
          
                      i += 1;
                    }
                  }
                }, 1000);
                     } else if (jData[0].status == "10003") {
                i = 0;
                 ons.notification.toast({
                  message: `Partner has rejected your order request`,
                  timeout: 2000
                });
                       while (i < jData.length) {
                  
                  $("#loadBreakdownVehicles").append(
                    `<ons-list-item tappable id=${jData[i]["Car Plate"]} modifier="chevron longdivider" onclick="GetBreakdownCategory(this.id)">
                      <span class="list-item__title">${jData[i]["Model"]}</span>
                      <span class="list-item__subtitle">${jData[i]["Car Plate"]}</span>
                    </ons-list-item>`
                  );
                         i += 1;
                }
              } else {
                 i = 0;
                time = 30;
                 const bDownResponse = setInterval(() => {
                  
                  console.log(jData[0].status);
                  time -= 1;
                           $("#modalContainer").html(`<ons-icon icon="md-spinner" size="28px" spin></ons-icon> Awaiting response from partner ${time}`);
                           modal.show();
                   if (time == 0) {
                    clearInterval(bDownResponse);
                    modal.hide();
                             UpdateStatusNotAccepted();
                             ons.notification.toast({
                      message: `Partner did not accept your request`,
                      timeout: 3000
                    });
                     while (i < jData.length) {
                      
                      $("#loadBreakdownVehicles").append(
                        `<ons-list-item tappable id=${jData[i]["Car Plate"]} modifier="chevron longdivider" onclick="GetBreakdownCategory(this.id)">
                          <span class="list-item__title">${jData[i]["Model"]}</span>
                          <span class="list-item__subtitle">${jData[i]["Car Plate"]}</span>
                        </ons-list-item>`
                      );
          
                      i += 1;
                    }
                  }
                }, 1000);
              }
                   },
            error: (jqxhr, status, errorThrown) => {
              console.log(`Error: ${errorThrown}`);
              console.log(`Error: ${jqxhr.responseText}`);
            }
          });*/
        }

        modal.hide();
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);
        console.log("Error: " + status);

        ons.notification.alert({
          title: "Connection issue",
          message: "Connection issue has been detected.",
          cancelable: false
        });

        modal.hide();
      },
      timeout: 4000
    });
  } else if (event.target.id === "rideCredit-page") {

    $.ajax({
      url: sampleLink2 + "ride/load_customer_credit.php",
      data: { user_id: gUserId },
      method: "POST",
      success: function success(data) {

        //  console.log(gUserId);
        console.log(data);

        var jData = JSON.parse(data);

        var i = 0;

        //  $("#rideCredit").text("");

        //  $("#rideCredit").append(`RM <span style="font-weight: bold">${jData[i].balance_amt}</span>`);

        sessionStorage.setItem('ride_credit', jData[i].balance_amt);
      }
    });

    /*  $.ajax({
        url: sampleLink2 + "ride/purchase/load_ride_credit.php",
        data: { user_id: gUserId },
        method: "POST",
        success: (data) => {
           //  console.log(data);
           var jData = JSON.parse(data);
           var i = 0;
           //  console.log(jData[i].name);
           $("#creditTable").empty();
           $("#creditTable").append(
            `<tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>`);
           while (i < jData.length) {
            $("#creditTable").append(
              `<tbody>
                <tr>
                  <td>${jData[i].name}</td>
                  <td>${jData[i].amt}</td>
                  <td>${jData[i].creation_date}</td>
                </tr>
              </tbody>`);
             i += 1;
          }
           if (jData[0].name == "NO") {
            $("#creditTable").empty();
             $("#creditTable").append(
              `<tr>
                <td style="padding: 5%; font-weight: bold">No transaction history found</td>
              </tr>`);
          }
         }
      });*/

    $.ajax({
      url: sampleLink2 + 'link/purchase/evoucher.php',
      data: { user_id: gUserId },
      method: "POST",
      success: function success(data) {
        $("#voucherList").html(data);
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);
      },
      complete: function complete(jqxhr, status) {
        modal.hide();
      }
    });
  } else if (event.target.id === "rideReward-page") {
    $.ajax({
      url: sampleLink2 + "ride/load_customer_credit.php",
      data: { user_id: gUserId },
      method: "POST",
      success: function success(data) {

        console.log(data);

        var jData = JSON.parse(data);

        var i = 0;

        $("#ridePoint").html('<span style="font-weight:bold">' + jData[i].ride_point + '</span>');

        //  $("#rideCredit").append(jData[i].balance_amt); 
      }
    });
  } else if (event.target.id == "favWorkshop-page") {

    FavWorkshopMap();

    $.ajax({
      url: sampleLink2 + "ride/purchase/load_favorite_workshop.php",
      data: { user_id: gUserId },
      method: "POST",
      success: function success(data) {

        console.log(data);

        var jData = JSON.parse(data);
        var i = 0;

        $("#favWorkshopList").empty();

        $("#favWorkshopList").append('<h4>Favorite Workshops</h4>\n            <ons-list>');

        if (JSON.stringify(jData) !== "null") {
          while (i < jData.length) {
            $("#favWorkshopList").append('<ons-list-item modifier="chevron longdivider" onclick="LocateFav(' + jData[i].latitude + ', ' + jData[i].longitude + ')" tappable>' + jData[i].name + '</ons-list-item>');

            i += 1;
          }
        } else {
          $("#favWorkshopList").append('<ons-list-item modifier="nodivider">You do not have a favorite workshop</ons-list-item>')
        }

        $("#favWorkshopList").append('</ons-list>');
      }
    });
  } else if (event.target.id === "tyrePurchase-page") {

    $.ajax({
      url: sampleLink2 + "ride_v2/get_user_VehicleInfo.php",
      data: { user_id: gUserId },
      method: "POST",
      success: function success(data) {
        var jData = JSON.parse(data);

        var i = 0;

        while (i < jData.length) {

          $("#tyreSelect").append('<option value=' + "car" + i + '">' + jData[i]["Car Plate"] + '</option>');

          i += 1;
        }
      }
    });

    $.ajax({
      url: sampleLink2 + "ride/purchase/load_favorite_workshop.php",
      data: { user_id: gUserId },
      method: "POST",
      success: function success(data) {
        console.log(data);

        var jData = JSON.parse(data);

        var i = 0;

        $("#favShopOptions").empty();

        while (i < jData.length) {

          $("#favShopOptions").append('<input type=' + "radio" + ' name=' + "favWorkshop" + ' value=' + "fav" + i + ' id=' + "fav" + i + ' onclick=hideDialog("favShopDialog")>' + '<label for=' + "fav" + i + ' class=' + "center>" + jData[i].name + '</label>');

          i += 1;
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);
      }
    });

    $.ajax({
      url: sampleLink2 + "link/itemPurchase.php",
      method: "GET",
      success: function success(data) {
        $("#itemList").append(data);

        //  console.log(data);
      }
    });
  } else if (event.target.id === "redeem-page") {
    RedeemGift();
  } else if (event.target.id === "tyreBreakdown-page") {
    var parameters = {
      helpdesk_id: sessionStorage.getItem("helpdesk_id"),
      fromwhere: "user"
    };

    tyre1 = "00000";
    tyre2 = "00000";
    tyre3 = "00000";
    tyre4 = "00000";

    document.getElementById("frontLeftBtn").style.backgroundColor = "transparent";
    document.getElementById("frontRightBtn").style.backgroundColor = "transparent";
    document.getElementById("rearLeftBtn").style.backgroundColor = "transparent";
    document.getElementById("rearRightBtn").style.backgroundColor = "transparent";

    document.getElementById("frontLeftBtn").style.color = "#fff";
    document.getElementById("frontRightBtn").style.color = "#fff";
    document.getElementById("rearLeftBtn").style.color = "#fff";
    document.getElementById("rearRightBtn").style.color = "#fff";

    $.ajax({
      url: sampleLink2 + "ride/partner_breakdown_tyre_checklist.php",
      data: parameters,
      method: "POST",
      success: function success(data) {
        console.log(data);

        var jData = JSON.parse(data);

        var i = 0;

        $("#tyreOptionFL").empty();
        $("#tyreOptionFR").empty();
        $("#tyreOptionRL").empty();
        $("#tyreOptionRR").empty();

        while (i < jData.length) {

          $("#tyreOptionFL").append('<input type=' + "checkbox" + ' name="frontLeft"' + ' class="fl_check"' + ' value=' + i + ' id=' + "flTyre" + i + '>' + '<label for=' + "flTyre" + i + '>' + jData[i].name + '</label>' + '<br>');

          $("#tyreOptionFR").append('<input type=' + "checkbox" + ' name=' + "frontRight" + ' value=' + i + ' id=' + "frTyre" + i + '>' + '<label for=' + "frTyre" + i + '>' + jData[i].name + '</label>' + '<br>');

          $("#tyreOptionRL").append('<input type=' + "checkbox" + ' name=' + "rearLeft" + ' value=' + i + ' id=' + "rlTyre" + i + '>' + '<label for=' + "rlTyre" + i + '>' + jData[i].name + '</label>' + '<br>');

          $("#tyreOptionRR").append('<input type=' + "checkbox" + ' name=' + "rearRight" + ' value=' + i + ' id=' + "rrTyre" + i + '>' + '<label for=' + "rrTyre" + i + '>' + jData[i].name + '</label>' + '<br>');

          i += 1;
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);
      }
    });
  }
  /*else if (event.target.id === "getBreakdownTeam-page") {
     //  BreakdownMap();
     //  LoadPcrTeam();
     document.addEventListener("backbutton", function() {
       UserCancelledOrder();
       setTimeout(function() { removeHelpdeskStorage(); }, 500);
       alert("SAD");
     }, false);
   }*/
  else if (event.target.id === "login-page") {
    //  RequestLocation();
    //  $("#menu").removeAttr("swipeable");

    var emailStorage = localStorage.getItem('loginPhone');
    var pwdStorage = localStorage.getItem('loginPassword');

    if (emailStorage !== "" && emailStorage != null && pwdStorage !== "" && pwdStorage != null) {
      $("#loginPhone").val(localStorage.getItem('loginPhone'));
      $("#loginPassword").val(localStorage.getItem('loginPassword'));

      Login();
    }
  } else if (event.target.id === "partnerLocation-page") {

    PartnerMap();
  } else if (event.target.id === "rating-page") {

    localStorage.removeItem('helpdesk_id');

    //  console.log(localStorage.getItem(`helpdesk_id`));
  } else if (event.target.id === "invoice-page") {

    $.ajax({
      url: sampleLink2 + 'ride/get_user_invoice.php',
      data: { user_id: gUserId },
      method: "POST",
      success: function success(data) {
        console.log(data);
        //  console.log($(data).text());

        var jData = JSON.parse(data);

        var i = 0;
        var x = 1;

        if (jData[i].Type !== "No Data") {

          document.getElementById("invoiceTableWrapper").style.display = "block";

          $("#invoiceTable").empty();

          $("#invoiceTable").append('<tr>\n            <th>No</th>\n            <th>Invoice ID</th>\n            <th>Item Type</th>\n            <th>Date</th>\n          </tr>');

          //  if ($(data).text() !== "") {
          while (i < jData.length) {
            $("#invoiceTable").append('<tbody>\n              <tr onclick="InvoiceDetail(' + jData[i].ID + ')">\n                <td>' + x + '</td>\n                <td>' + jData[i].ID + '</td>\n                <td>' + jData[i].Type + '</td>\n                <td>' + jData[i].date + '</td>\n              </tr>\n            </tbody>');

            x += 1;
            i += 1;
          }
        } else {
          $("#noData").html(`Oops! You currently have no invoice, head over to our automall for great deals.`);
        }

        /*  } else {
            ons.notification.toast({
              message: `No invoice found`,
              timeout: 2500
            });
          }*/
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log('Error: ' + errorThrown);
        console.log('Error: ' + jqxhr.responseText);

        ons.notification.alert({
          title: "Connection issue",
          message: "Failed to load invoice, please retry when you have connection",
          cancelable: false
        })
      },
      timeout: 5000
    });
  } else if (event.target.id === "cart-page") {

    $("#cartWrapper").append('<table>\n        <tr>\n          <th>No.</th>\n          <th>ITEMS</th>\n          <th>QTY</th>\n          <th>MYR</th>\n        </tr>\n      </table>\n      <div style="text-align:right">\n        <p>Total </p>\n        <label>Coupon Code </label>\n        <input type="text" id="coupon">\n      </div>');

    check_helpdesk(gUserId);

    setTimeout(function() {
      LoadCart();
    }, 400);
  } else if (event.target.id === "topUp-page") {

    sessionStorage.setItem('approve', '0');

    $.ajax({
      url: sampleLink2 + "ride/load_customer_credit.php",
      data: { user_id: gUserId },
      method: "POST",
      success: function success(data) {

        console.log(data);

        var jData = JSON.parse(data);

        var i = 0;

        sessionStorage.setItem('ride_credit', jData[i].balance_amt);

        getTopUp();
      }
    });
  } else if (event.target.id === "molpay-page") {

    //  console.log(sessionStorage.getItem(`molpayTotal`));
    //  console.log(sessionStorage.getItem("molpay_counter"));

    paymentDetails = {
      // Mandatory String. A value more than '1.00'
      'mp_amount': sessionStorage.getItem('molpayTotal'),
      //  'mp_amount': '1.01',

      // Mandatory String. Values obtained from MOLPay
      /*'mp_username': 'api_samplelink',
      'mp_password': 'api_SyN3*2803',
      'mp_merchant_ID': 'samplelink_Dev',
      'mp_app_name': 'samplelink',
      'mp_verification_key': '5564e7e8694fd3bb6dd194d831e2debc',*/

      'mp_username': 'api_rideapps',
      'mp_password': 'api_$ama@pps3110',
      'mp_merchant_ID': 'rideapps',
      'mp_app_name': 'rideapps',
      'mp_verification_key': 'da59cfc919622861f6b944e6fc375025',

      // Mandatory String. Payment values
      'mp_order_ID': sessionStorage.getItem("molpay_counter"),
      'mp_currency': 'MYR',
      'mp_country': 'MY',
      //'mp_sandbox_mode': true,

      // Optional String.
      'mp_channel': 'multi', // Use 'multi' for all available channels option. For individual channel seletion, please refer to "Channel Parameter" in "Channel Lists" in the MOLPay API Spec for Merchant pdf. 
      'mp_bill_description': 'E-Voucher purchase',
      'mp_bill_name': localStorage.getItem('loginName'),
      'mp_bill_email': localStorage.getItem('loginEmail'),
      'mp_bill_mobile': localStorage.getItem('loginPhone'),
      /*  'mp_channel_editing': false, // Option to allow channel selection.
        'mp_editing_enabled': false // Option to allow billing information editing.*/
    };

    /*  molpayCallback = function(transactionResult) {
        alert(transactionResult);
      };*/
  } else if (event.target.id === "terms-page") {

    //  var ref = cordova.InAppBrowser.open("http://www.website.com/link/T&C.html", "_blank");

    /*  $("#termsContainer").html(
        `${ref}`
      );*/

    $("#termsContainer").html('<p><strong>USER T&amp;C</strong></p>\n      <p>Important &ndash; please read these terms carefully. By using this Service, you irrevocably agree and deemed that you have read, understood, accepted and agreed with the Terms of Use. If you do not agree to the terms and wish to discontinue using the\n        Service (as defined below), please do not continue using this App.</p>\n      <p>The terms and conditions stated herein (collectively, the "Terms of Use") constitute a legal agreement between you and the "Company". In order to use the Service (each as defined below) you must agree to the Terms of Use\n        that are set out below. By using the mobile application supplied to you by the Company (the "Application"), and downloading, installing or using any associated software supplied by the Company (&ldquo;the Software&rdquo;) which overall purpose is to\n        enable persons seeking service, repair, cost estimate &amp; comparison, breakdown service and road tax /license /insurance renewal reminder service for their vehicles to be matched with third party authorized workshops by car distributors, independent\n        workshops, insurance company authorized workshops, general Insurance companies, all other third party workshops and break down service providers (collectively, the "Service"), you hereby expressly acknowledge and agree to be bound by the Terms of Use,\n        and any future amendments and additions to this Terms of Use as published from time to time at <a href="http://ride_sharing.com">http://ride_sharing.com</a> (Workshop Webpage link) or through the Application.</p>\n      <p>The Company reserves the right to modify, vary and change the Terms of Use or its policies relating to the Service at any time as it deems fit without obtaining your prior consent. Such modifications, variations and or changes to the Terms of Use or its\n        policies relating to the Service shall be effective upon the posting of an updated version at http://ride_sharing.com. You agree that it shall be your responsibility to review the Terms of Use regularly and also the Terms of Use applicable to any country\n        where you use the Service which may differ from the country where you registered for the Application (&ldquo;the Alternate Country&rdquo;) whereupon the continued use of the Service after any such changes, whether or not reviewed by you, shall constitute\n        your consent and acceptance to such changes. You further agree that usage of the Service in the Alternate Country shall be subject to the Terms of Use prevailing for the Alternate Country which can be found at&nbsp;<a href="http://ride_sharing.com">http://ride_sharing.com</a>  </p>\n      <p>THE COMPANY IS AN INFORMATION TECHNOLOGY COMPANY THAT DOES NOT PROVIDE (1) VEHICLE BREAKDOWN SERVICES (2) TOWING SERVICES (3) VEHICLE MAINTENANCE, SERVICE AND REPAIR (4) SALES OF VEHICLE ACCESSORIES (5) VEHICLE TYRE AND RIM SALES, REPLACEMENT AND/OR REPAIR\n        (5) VEHICLE PARTS AND COMPONENT SALES, SERVICE AND/OR REPAIR, AND (6) VEHICLE AIRCOND SERVICE, REPAIR AND/OR REPLACEMENT (7) EXHAUST REPAIR, SERVICE AND REPLACEMENT (8) CAR INTERIOR AND EXTERIOR POLISH, CLEANING, SERVICE, REPAIR, PARTS AND/OR REPLACEMENT,\n        (9) COST ESTIMATES AND COMPARISON, AND (10) DOES NOT PROVIDE ANY VEHICLE WORKSHOP SERVICE OR PARTS &amp; COMPONENT SALES ACTIVITIES (COLLECTIVELY, WORKSHOP SERVICES), AND THE COMPANY IS NOT A VEHICLE WORKSHOP OR SERVICE CENTRE, VEHICLE MANUFACTURER\n        OR DISTRIBUTOR OR DEALER, VEHICLE PARTS OR ACCESSORIES SHOPS OR SALES/STOCKIST CENTRE AND NOT A VEHICLE BREAK DOWN SERVICE PROVIDERS (COLLECTIVELY, CAR WORKSHOPS). IT IS UP TO THE THIRD PARTY WORKSHOP SERVICE PROVIDER TO OFFER WORKSHOP SERVICES, TO\n        YOU AND UP TO YOU TO ACCEPT SUCH SERVICES. THE SERVICE OF THE COMPANY IS TO LINK YOU WITH SUCH PROVIDERS, BUT DOES NOT NOR IS IT INTENDED TO PROVIDE THOSE VEHICLE SERVICE, REPAIR, QUOTATION OR COST ESTIMATES, BREAK DOWN SERVICE AND ROAD TAX/LICENSE/INSURANCE\n        RENEWAL REMINDER SERVICES OR ANY ACT THAT CAN BE CONSTRUED IN ANY WAY AS AN ACT OF A VEHICLE WORKSHOP OR SERVICE CENTRES OR BREAKDOWN SERVICE PROVIDERS OR ROAD TAX RENEWAL SERVICE PROVIDER. THE COMPANY IS NEITHER RESPONSIBLE NOR LIABLE FOR THE ACTS\n        AND/OR OMISSIONS OF OR AN INACCURATE QUOTATION OR ESTIMATE (IN BOTH TIME AND PRICES) OF THOSE SERVICES BY THE PROVIDERS AND/OR ANY SERVICES RELATED TO YOU CAR THAT WAS PROVIDED TO YOU.</p>\n      <p><strong>Representations and Warranties</strong></p>\n      <p>By using the Service, you expressly represent and warrant that you are legally entitled to accept and agree to the Terms of Use and that you are at least 18 years old. Without limiting the generality of the foregoing, the Service is not available to persons\n        under the age of 18 or such persons that are forbidden for any reason whatsoever to enter into a contractual relationship.</p>\n      <p>By using the Service, you further represent and warrant that you have the right, authority and capacity to use the Service and to abide by the Terms of Use. You further confirm that all the information which you provide shall be true and accurate. Your\n        use of the Service is for your sole, personal use. You undertake not to authorize others to use your identity or user status, and you may not assign or otherwise transfer your user account to any other person or entity. When using the Service you agree\n        to comply with all applicable laws whether in your home nation or otherwise in the country, state and city in which you are present while using the Service.</p>\n      <p>You may only access the Service using authorized means. It is your responsibility to check to ensure that you have downloaded the correct Software for your device. The Company is not liable if you do not have a compatible device or if you have downloaded\n        the wrong version of the Software to your device. The Company reserves the right not to permit you to use the Service should you use the Application and/or the Software with an incompatible or unauthorized device or for purposes other than which the\n        Software and/or the Application is intended to be used.</p>\n      <p>By using the Software or the Services, you agree that:</p>\n      <ul>\n        <li>You will only use the Service for lawful purposes;&nbsp;</li>\n        <li>You will not use the Application for sending or storing any unlawful material or for fraudulent purposes;&nbsp;</li>\n        <li>You will not use the Application and/or the Software to cause nuisance, annoyance, inconvenience or make fake bookings and appointment;</li>\n        <li>You will not use the Service, Application and/or Software for purposes other than obtaining the Service;</li>\n        <li>You will not copy, or distribute the Software or other content without written permission from the Company;</li>\n        <li>You will not impair the proper operation of the network;</li>\n        <li>You will not try to harm the Service, Application and/or the Software in any way whatsoever;</li>\n        <li>You will only use the Software and/or the Application for your own use and will not resell it to a third party;</li>\n        <li>You shall not contact the Third Party Workshop, Breakdown service and Road Tax/License/Insurance renewal service Provider for purposes other than the Service;</li>\n        <li>You will keep secure and confidential your account password or any identification the Company provide you which allows access to the Service;</li>\n        <li>You will provide us with whatever proof of identity the Company may reasonably request;</li>\n        <li>You will only use an access point or data account (AP) which you are authorized to use;&nbsp;</li>\n        <li>You are aware that when requesting Workshop, Breakdown service and Road Tax renewal services by SMS or use of the Service, standard telco charges will apply;</li>\n        <li>You agree that the Service is provided on a reasonable effort basis;</li>\n        <li>You agree that your use of the Service will be subject to the Company\'s Privacy Policy as may be amended from time to time; and</li>\n      </ul>\n      <p><strong>Payment</strong></p>\n      <ul>\n        <li>Payment must be made in advance to create an order. You may choose all types of payment methods be it online transfer or credit/debit cards via MOLPay.&nbsp;</li>\n        <li>Once you have completed your payment, the amount will be stored in your ride Credit account. The ride Credit can be used to make purchase on the Services listed within the Application. If you have any complaints in relation to the workshop service provider,\n          you may rate/comment on the services provider or call the Helpdesk to assist with the dispute.</li>\n        <li>No orders or purchases made which has been received and accepted by Service Provider shall be cancelled or varied. In the case where you request for a cancellation, a cancellation charges of RM3.00 will be incurred after proceeding with manual cancellation\n          by calling the Helpdesk number available in the Platform. The remaining funds paid will be refunded as credit to the ride Credit Balance and are available for future purchases on ride.</li>\n        <li>The Company have the right to suspend the processing of any transaction where the Company reasonably believes that the transaction may be fraudulent, illegal or involves any criminal activity or where the Company reasonably believe you to be in breach\n          of the Terms of Use.</li>\n        <li>You agree that you will cooperate in relation to any crime screening that is required and to assist us in complying with any prevailing laws or regulations in place.</li>\n        <li>You shall be responsible to resolve any disputes with your Card Company on your own.</li>\n      </ul>\n      <p><strong>License Grant &amp; Restrictions</strong></p>\n      <p>The Company and its licensors, where applicable, hereby grants you a revocable, non-exclusive, non-transferable, non-assignable, personal, limited license to use the Application and/or the Software, solely for your own personal, non-commercial purposes,\n        subject to the Terms of Use herein. All rights not expressly granted to you are reserved by the Company and its licensors.</p>\n      <p>You shall not (i) license, sublicense, sell, resell, transfer, assign, distribute or otherwise commercially exploit or make available to any third party the Application and/or the Software in any way; (ii) modify or make derivative works based on the\n        Application and/or the Software; (iii) create internet "links" to the Application or "frame" or "mirror" any Software on any other server or wireless or internet-based device; (iv) reverse engineer or access the Software in order to (a) build a competitive\n        product or service, (b) build a product using similar ideas, features, functions or graphics of the Application and/or the Software, or (c) copy any ideas, features, functions or graphics of the Application and/or the Software, (v) launch an automated\n        program or script, including, but not limited to, web spiders, web crawlers, web robots, web ants, web indexers, bots, viruses or worms, or any program which may make multiple server requests per second, or unduly burdens or hinders the operation and/or\n        performance of the Application and/or the Software, (vi) use any robot, spider, site search/retrieval application, or other manual or automatic device or process to retrieve, index, "data mine", or in any way reproduce or circumvent the navigational\n        structure or presentation of the Services or its contents; (vii) post, distribute or reproduce in any way any copyrighted material, trademarks, or other proprietary information without obtaining the prior consent of the owner of such proprietary rights,\n        (viii) remove any copyright, trademark or other proprietary rights notices contained in the Service.</p>\n      <p>You may use the Software and/or the Application only for your personal, noncommercial purposes and shall not use the Software and/or the Application to: (i) send spam or otherwise duplicative or unsolicited messages; (ii) send or store infringing, obscene,\n        threatening, libelous, or otherwise unlawful or tortious material, including material harmful to children or violative of third party privacy rights; (iii) send material containing software viruses, worms, trojan horses or other harmful computer code,\n        files, scripts, agents or programs; (iv) interfere with or disrupt the integrity or performance of the Software and/or the Application or the data contained therein; (v) attempt to&nbsp;gain unauthorized access to the Software and/or the Application\n        or its related systems or networks; or (vi) Impersonate any person or entity.</p>\n      <p><strong>Intellectual Property Ownership</strong></p>\n      <p>The Company and its licensors, where applicable, shall own all right, title and interest, including all related intellectual property rights, in and to the Software and/or the Application and by extension, the Service and any suggestions, ideas, enhancement\n        requests, feedback, recommendations or other information provided by you or any other party relating to the Service.</p>\n      <p>The Terms of Use do not constitute a sale agreement and do not convey to you any rights of ownership in or related to the Service, Software and/or the Application, or any intellectual property rights owned by the Company and/or its licensors. The Company\n        name, the logo, the Service, the Software and/or the Application and the Workshop, Breakdown Service, Road Tax/License/Insurance Renewal Reminder Service Providers&rsquo; logos and the product names associated with the Software and/or the Application\n        are trademarks of the Company or third parties, and no right or license is granted to use them. For the avoidance of doubt, the term Software and Application herein shall include its respective components, processes and design in its entirety.</p>\n      <p><strong>Personal Data Protection Act</strong></p>\n      <p>You agree and consent to the Company using and processing your Personal Data for the Purposes and in the manner as identified hereunder.</p>\n      <p>For the purposes of this Agreement,&nbsp;<strong>&ldquo;Personal Data</strong>&rdquo; means information about you, from which you are identifiable, including but not limited to your name, identification card number, birth certificate number, passport\n        number, nationality, address, telephone number, credit card or debit card details, race, gender, date of birth, email address, any information about you which you have provided to the Company in registration forms, application forms or any other similar\n        forms and/or any information about you that has been or may be collected, stored, used and processed by the Company from time to time and includes sensitive personal data such as data relating to health, religious or other similar beliefs.</p>\n      <p>The provision of your Personal Data is voluntary. However if you do not provide the Company your Personal Data, your request for the Application may be incomplete and the Company will not be able to process your Personal Data for the Purposes outlined\n        below and may cause the Company to be unable to allow you to use the Service.</p>\n      <p>The Company may use and process your Personal Data for business and activities of the Company which shall include, without limitation the following (<strong>"the Purpose</strong>&rdquo;):</p>\n      <ul>\n        <li>To perform the Company&rsquo;s obligations in respect of any contract entered into with you;</li>\n        <li>To provide you with any services pursuant to the Terms of Use herein;</li>\n        <li>To process your participation in any events, promotions, activities, focus groups, research studies, contests, promotions, polls, surveys or any productions and to communicate with you regarding your attendance thereto;</li>\n        <li>Process, manage or verify your application for the Service pursuant to the Terms of Use herein;</li>\n        <li>To validate and/or process payments pursuant to the Terms of Use herein;</li>\n        <li>To develop, enhance and provide what is required pursuant to the Terms of Use herein to meet your needs;</li>\n        <li>To process any refunds, rebates and or charges pursuant to the Terms of Use herein;</li>\n        <li>To facilitate or enable any checks as may be required pursuant to the Terms of Use herein;</li>\n        <li>To respond to questions, comments and feedback from you;</li>\n        <li>To communicate with you for any of the purposes listed herein;&nbsp;</li>\n        <li>For internal administrative purposes, such as auditing, data analysis, database records;&nbsp;</li>\n        <li>For purposes of detection, prevention and prosecution of crime;</li>\n        <li>For the Company to comply with its obligations under law;</li>\n        <li>To send you alerts, newsletters, updates, mailers, promotional materials, special privileges, festive greetings from the Company, its partners, advertisers and or sponsors;</li>\n        <li>To notify and invite you to events or activities organized by the Company, its partners, advertisers, and or sponsors;</li>\n        <li>To share your Personal Data amongst the companies within the company Multimedia Sdn Bhd (or ride) group of companies comprising the subsidiaries, associate companies and or jointly controlled entities of the holding company of the group (&ldquo;the\n          Group&rdquo;) and with the Company&rsquo;s and Group&rsquo;s agents, third party providers, developers, affiliated workshops, advertisers, partners, event companies or sponsors who may communicate with you for any reasons whatsoever. If you do not\n          consent to the Company processing your Personal Data for any of the Purposes, please notify the Company using the support contact details as provided in the Application. If any of the Personal Data that you have provided to us changes, for example,\n          if you change your e-mail address, telephone number, payment details or if you wish to cancel your account, please update your details by sending your request to the support contact details as provided in the Application. The Company will, to the\n          best of our abilities, effect such changes as requested within 14 working days of receipt of such notice of change. By submitting your information you consent to the use of that information as set out in the form of submission and in this Terms of\n          Use.</li>\n      </ul>\n      <p>Anything that you submit to the site and/or provide to us, including but not limited to, questions, reviews, comments, and suggestions (collectively, "Submissions") will become our sole and exclusive property and shall not be returned to you. In addition\n        to the rights applicable to any Submission, when you post comments or reviews to the Site, you also grant us the right to use the name that you submit, in connection with such review, comment, or other content. You shall not use a false e-mail address,\n        pretend to be someone other than yourself or otherwise mislead us or third parties as to the origin of any Submissions. We may, but shall not be obligated to, remove or edit any Submissions.</p>\n      <p><strong>Third Party Interactions</strong></p>\n      <p>During use of the Service, you may enter into correspondence with, purchase goods and/or services from, or participate in promotions of third party providers, advertisers or sponsors showing their goods and/or services through the Service, Software and/or\n        the Application. Any such activity, and any terms, conditions, warranties or representations associated with such activity, is solely between you and the applicable third-party. The Company and its licensors, shall have no liability, obligation or responsibility\n        for any such correspondence, purchase, transaction or promotion between you and any such third- party. The Company does not endorse any applications or sites on the Internet that are linked through the Service, Application and/or the Software, and in\n        no event shall the Company, or its licensors be responsible for any content, products, services or other materials on or available from such sites or third party providers. The Company provides the Service to you pursuant to the Terms of Use. You recognize,\n        however, that certain third party Workshop, Breakdown Service and Road Tax/License/Insurance Renewal reminder service providers provides, goods and/or services may require your agreement to additional or different terms and conditions prior to your\n        use of or access to such goods or services, and the Company is not a party to and disclaims any and all responsibility and/or liability arising from such agreements between you and the third party providers.</p>\n      <p>The Company may rely on third party advertising and marketing supplied through the Service and other mechanisms to subsidize the Service and/or to earn additional revenue. By agreeing to the Terms of Use you agree to receive such advertising and marketing.\n        If you do not want to receive such advertising you should notify us in writing or in accordance with the procedure determined by the Company. The Company reserves the right to charge you a higher fee for or deny you use of the Service should you choose\n        not to receive these advertising services. This higher fee, if applicable, will be posted on the Company\'s website located at http://ride_sharing.com. You agree and allow the Company to compile and release information regarding you and your use of the\n        Service on an anonymous basis as part of a customer profile or similar report or analysis. You agree that it is your responsibility to take all precautions in all actions and interactions with any third party authorized workshops by car distributors,\n        independent workshops, insurance company authorized workshops, general Insurance companies, all other third party workshops and break down service providers, other third party providers, advertisers and/or sponsors you interact with through the Service\n        and/or advertising or marketing material supplied through the Service.</p>\n      <p><strong>Indemnification</strong></p>\n      <p>By agreeing to the Terms of Use upon using the Service, you agree that you shall defend, indemnify and keep the Company, its licensors and each such party\'s parent organizations, subsidiaries, affiliates, officers, directors, members, employees, attorneys\n        and agents harmless from and against any and all claims, costs, damages, losses, liabilities and expenses (including attorneys\' fees and costs) arising out of or in connection with: (a) your use of the Service, Software and/or the Application, your\n        dealing with the third party Workshop, Breakdown service and Road Tax/License/Insurance renewal service Providers, third party providers, partners, advertisers and/or sponsors, or (b) your violation or breach of any of the Terms of Use or any applicable\n        law or regulation, whether or not referenced herein or (c) your violation of any rights of any third party, including third party Workshop, Breakdown service and Road Tax renewal service Providers arranged via the Service, or (d) your use or misuse\n        of the Service, Software and/or the Application.</p>\n      <p><strong>Disclaimer of Warranties</strong></p>\n      <p>THE COMPANY MAKES NO REPRESENTATION, WARRANTY, OR GUARANTEE AS TO THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY, AVAILABILITY, ACCURACY OR COMPLETENESS OF THE SERVICES, APPLICATION AND/OR THE SOFTWARE. THE COMPANY DOES NOT REPRESENT OR WARRANT THAT\n        (A) THE USE OF THE SERVICE, APPLICATION AND/OR THE SOFTWARE WILL BE SECURE, TIMELY, UNINTERRUPTED OR ERROR-FREE OR OPERATE IN COMBINATION WITH ANY OTHER HARDWARE, SOFTWARE, SYSTEM OR DATA, (B) THE SERVICE WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS,\n        (C) ANY STORED DATA WILL BE ACCURATE OR RELIABLE, (D) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIALS PURCHASED OR OBTAINED BY YOU THROUGH THE APPLICATION WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS, (E) ERRORS OR DEFECTS IN THE\n        APPLICATION AND/OR THE SOFTWARE WILL BE CORRECTED, OR (F) THE APPLICATION OR THE SERVER(S) THAT MAKE THE APPLICATION AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR (G) THE APPLICATION AND/OR THE SOFTWARE TRACKS YOU OR THE VEHICLE USED\n        BY THE WORKSHOP, BREAKDOWN SERVICE AND ROAD TAX/LICENSE/INSURANCE RENEWAL SERVICE PROVIDER. THE SERVICE IS PROVIDED TO YOU STRICTLY ON AN "AS IS" BASIS. ALL CONDITIONS, REPRESENTATIONS AND WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE,\n        INCLUDING, WITHOUT LIMITATION, ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF THIRD PARTY RIGHTS, ARE HEREBY EXCLUDED AND DISCLAIMED TO THE MAXIMUM EXTENT. THE COMPANY MAKES NO REPRESENTATION, WARRANTY,\n        OR GUARANTEE AS TO THE RELIABILITY, SAFETY, TIMELINESS, QUALITY, SUITABILITY, ACCURACY OF DESCRIPTION OR AVAILABILITY OF ANY SERVICES AND GOODS ON THE PLATFORM, INCLUDING BUT NOT LIMITED TO THE THIRD PARTY WORKSHOP, BREAKDOWN SERVICES, ROAD TAX/LICENSE/INSURANCE\n        RENEWAL SERVICES OBTAINED BY OR FROM THIRD PARTIES THROUGH THE USE OF THE SERVICE, APPLICATION AND/OR THE SOFTWARE. YOU ACKNOWLEDGE AND AGREE THAT THE ENTIRE RISK ARISING OUT OF YOUR USE OF THE SERVICE, AND ANY THIRD PARTY SERVICES, INCLUDING BUT NOT\n        LIMITED TO THE THIRD PARTY WORKSHOP, BREAKDOWN SERVICES, ROAD TAX/LICENSE/INSURANCE RENEWAL SERVICES REMAINS SOLELY AND ABSOLUTELY WITH YOU AND YOU SHALL HAVE NO RECOURSE WHATSOEVER TO THE COMPANY.</p>\n      <p><strong>Internet Delays</strong></p>\n      <p>THE SERVICE, APPLICATION AND/OR THE SOFTWARE MAY BE SUBJECT TO LIMITATIONS, DELAYS, AND OTHER PROBLEMS INHERENT IN THE USE OF THE INTERNET AND ELECTRONIC COMMUNICATIONS INCLUDING THE DEVICE USED BY YOU OR THE THIRD PARTY WORKSHOP, BREAKDOWN SERVICES,\n        ROAD TAX RENEWAL SERVICES PROVIDER BEING FAULTY, NOT CONNECTED, OUT OF RANGE, SWITCHED OFF OR NOT FUNCTIONING. THE COMPANY IS NOT RESPONSIBLE FOR ANY DELAYS, DELIVERY FAILURES, DAMAGES OR LOSSES RESULTING FROM SUCH PROBLEMS.</p>\n      <p><strong>Limitation of Liability</strong></p>\n      <p>ANY CLAIMS AGAINST THE COMPANY BY YOU SHALL IN ANY EVENT BE LIMITED TO THE AGGREGATE AMOUNT OF ALL AMOUNTS ACTUALLY PAID BY AND/OR DUE FROM YOU IN UTILISING THE SERVICE DURING THE EVENT GIVING RISE TO SUCH CLAIMS. IN NO EVENT SHALL THE COMPANY AND/OR\n        ITS LICENSORS BE LIABLE TO YOU OR ANYONE FOR ANY DIRECT, INDIRECT, PUNITIVE, SPECIAL, EXEMPLARY, INCIDENTAL, CONSEQUENTIAL OR OTHER DAMAGES OF ANY TYPE OR KIND (INCLUDING PERSONAL INJURY, AND LOSS OF DATA, GOODS, REVENUE, PROFITS, USE OR OTHER ECONOMIC\n        ADVANTAGE). THE COMPANY AND/OR ITS LICENSORS SHALL NOT BE LIABLE FOR ANY LOSS, DAMAGE OR INJURY WHICH MAY BE INCURRED BY OR CAUSED TO YOU OR TO ANY PERSON FOR WHOM YOU HAVE BOOKED THE SERVICE FOR, INCLUDING BUT NOT LIMITED TO LOSS, DAMAGE OR INJURY\n        ARISING OUT OF, OR IN ANY WAY CONNECTED WITH THE SERVICE, APPLICATION AND/OR THE SOFTWARE, INCLUDING BUT NOT LIMITED TO THE USE OR INABILITY TO USE THE SERVICE, APPLICATION AND/OR THE SOFTWARE, ANY RELIANCE PLACED BY YOU ON THE COMPLETENESS, ACCURACY\n        OR EXISTENCE OF ANY ADVERTISING, OR AS A RESULT OF ANY RELATIONSHIP OR TRANSACTION BETWEEN YOU AND ANY THIRD PARTY PROVIDER, ADVERTISER OR SPONSOR WHOSE ADVERTISING APPEARS ON THE WEBSITE OR IS REFERRED TO BY THE SERVICE, APPLICATION AND/OR THE SOFTWARE,\n        EVEN IF THE COMPANY AND/OR ITS LICENSORS HAVE BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>\n      <p>THE COMPANY DOES NOT AND WILL NOT ASSESS NOR MONITOR THE SUITABILITY, LEGALITY, ABILITY, MOVEMENT OR LOCATION OF ANY THIRD PARTY PROVIDERS INCLUDING THIRD PARTY WORKSHOP, BREAKDOWN SERVICES, ROAD TAX/LICENSE/INSURANCE RENEWAL SERVICE PROVIDERS, ADVERTISERS\n        AND/OR SPONSORS AND YOU EXPRESSLY WAIVE AND RELEASE THE COMPANY FROM ANY AND ALL LIABILITY, CLAIMS OR DAMAGES ARISING FROM OR IN ANY WAY RELATED TO THE THIRD PARTY PROVIDERS INCLUDING THIRD PARTY WORKSHOP, BREAKDOWN SERVICES, ROAD TAX RENEWAL/LICENSE/INSURANCE\n        SERVICES PROVIDERS, ADVERTISERS AND/OR SPONSORS. THE COMPANY WILL NOT BE A PARTY TO DISPUTES, NEGOTIATIONS OF DISPUTES BETWEEN YOU AND SUCH THIRD PARTY PROVIDERS INCLUDING THIRD PARTY WORKSHOP, BREAKDOWN SERVICES, ROAD TAX RENEWAL SERVICES PROVIDERS,\n        ADVERTISERS AND/OR SPONSORS. THE COMPANY CANNOT AND WILL NOT PLAY ANY ROLE IN MANAGING PAYMENTS BETWEEN YOU AND THE THIRD PARTY PROVIDERS, INCLUDING THIRD PARTY WORKSHOP, BREAKDOWN SERVICES, ROAD TAX RENEWAL SERVICE PROVIDERS, ADVERTISERS AND/OR SPONSORS.\n        RESPONSIBILITY FOR THE DECISIONS YOU MAKE REGARDING SERVICES AND PRODUCTS OFFERED VIA THE SERVICE, SOFTWARE AND/OR THE APPLICATION (WITH ALL ITS IMPLICATIONS) RESTS SOLELY WITH AND ON YOU. YOU EXPRESSLY WAIVE AND RELEASE THE COMPANY FROM ANY AND ALL\n        LIABILITY, CLAIMS, CAUSES OF ACTION, OR DAMAGES ARISING FROM YOUR USE OF THE SERVICE, SOFTWARE AND/OR THE APPLICATION, OR IN ANY WAY RELATED TO THE THIRD PARTIES INCLUDING THIRD PARTY WORKSHOP, BREAKDOWN SERVICES, ROAD TAX/LICENSE/INSURANCE RENEWAL\n        SERVICES PROVIDERS, ADVERTISERS AND/OR SPONSORS INTRODUCED TO YOU BY THE SERVICE, SOFTWARE AND/OR THE APPLICATION. THE QUALITY &amp; PRICING OF THE THIRD PARTY WORKSHOP, BREAKDOWN SERVICES, ROAD TAX/LICENSE/INSURANCE RENEWAL SERVICES SCHEDULED THROUGH\n        THE USE OF THE SERVICE IS ENTIRELY THE RESPONSIBILITY OF THE THIRD PARTY WORKSHOP, BREAKDOWN SERVICES, ROAD TAX/LICENSE/INSURANCE RENEWAL SERVICES PROVIDER WHO ULTIMATELY PROVIDES SUCH WORKSHOP, BREAKDOWN SERVICES, ROAD TAX/LICENSE/INSURANCE RENEWAL\n        SERVICES TO YOU. YOU UNDERSTAND, THEREFORE, THAT BY USING THE SERVICE, YOU MAY BE EXPOSED TO WORKSHOP, BREAKDOWN SERVICES, ROAD TAX/LICENSE/INSURANCE RENEWAL SERVICES THAT IS POTENTIALLY DANGEROUS, OFFENSIVE, HARMFUL TO MINORS, UNSAFE OR OTHERWISE OBJECTIONABLE,\n        AND THAT YOU USE THE SERVICE AT YOUR OWN RISK.</p>\n      <p><strong>Notice</strong></p>\n      <p>The Company may give notice by means of a general notice on the Application, electronic mail to your email address in the records of the Company, or by written communication sent by Registered mail or pre-paid post to your address in the record of the\n        Company. Such notice shall be deemed to have been given upon the expiration of 48 hours after mailing or posting (if sent by Registered mail or pre-paid post) or 1 hour after sending (if sent by email). You may give notice to the Company (such notice\n        shall be deemed given when received by the Company) by letter sent by courier or registered mail to the Company using the contact details as provided in the Application.</p>\n      <p><strong>Assignment</strong></p>\n      <p>The agreement as constituted by the Terms of Use as modified from time to time may not be assigned by you without the prior written approval of the Company but may be assigned without your consent by the Company. Any purported assignment by you in violation\n        of this section shall be void</p>\n      <p><strong>General</strong></p>\n      <p>This Agreement shall be governed by Malaysia law, without regard to the choice or conflicts of law provisions of any jurisdiction, and any disputes, actions, claims or causes of action arising out of or in connection with the Terms of Use or the Service\n        shall be subject to the exclusive jurisdiction of the courts of Malaysia to which you hereby agree to submit to.</p>\n      <p>In the event that the law in an Alternate Country does not allow jurisdiction to be that of the courts of Malaysia or where judgment of a Malaysia court is unenforceable in the Alternate Country, unresolved disputes shall be referred to arbitration in\n        Malaysia at the Malaysia International Arbitration Centre (\'MIAC\'), in accordance with the Rules of the MIAC or failing which, such rules as may be applicable in the Alternate Country and shall be conducted before an arbitrator appointed by the mutual\n        agreement of the Parties, failing such agreement, by the Director of the MIAC acting in accordance with the Rules of the MIAC or such rules as may be applicable in the Alternate Country.</p>\n      <p>No joint venture, partnership, employment, or agency relationship exists between you, the Company or any third party provider as a result of the Terms of Use or use of the Service. If any provision of the Terms of Use is held to be invalid or unenforceable,\n        such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law. This shall, without limitation, also apply to the applicable law and jurisdiction as stipulated above. The failure of the Company to enforce\n        any right or provision in the Terms of Use shall not constitute a waiver of such right or provision unless acknowledged and agreed to by the Company in writing. The Terms of Use comprises the entire agreement between you and the Company and supersedes\n        all prior or contemporaneous negotiations or discussions, whether written or oral, between the parties regarding the subject matter contained herein.</p>');
  } else if (event.target.id === "schedule-page") {
    $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

    modal = document.querySelector('ons-modal');
    modal.show();
  }
  /*else if (event.target.id === "payment-page") {
      $.ajax({
       url: `${sampleLink2}ride/load_customer_credit.php`,
       data: { user_id: gUserId },
       method: "POST",
       success: data => {
         console.log(data);
          let jData = JSON.parse(data);
         let workshopPrice = sessionStorage.getItem(`workshop_price`);
         let cancelCharge = sessionStorage.getItem(`cancel_charge`);
          $("#paymentWrapper").append(
           `<div class="paymentTop">
               <table>
                 <tr>
                   <th>No.</th>
                   <th>Item</th>
                   <th>Price</th>
                 </tr>
                 <tr>
                   <td>1</td>
                   <td>Breakdown Charge</td>
                   <td>RM ${workshopPrice}</td>
                 </tr>
                 <tr>
                   <td>2</td>
                   <td>Cancel Charge</td>
                   <td>RM ${cancelCharge}</td>
                 </tr>
               </table>
             </div>
     
             <div class="paymentMiddle">
               <label>Total: </label>
               <button onclick="FetchCoupon()">Coupon Code</button>
     
               <label>Discount: </label>
             </div>
              <div class="grandTotal">
               <label>GRAND TOTAL</label>
               <label>MYR ${workshopPrice}</label>
             </div>
     
             <div class="paymentBottom">
               <table>
                 <tr>
                   <th>ride Credit</th>
                   <th>REMAINING</th>
                 </tr>
                 <tr>
                   <td>MYR</td>
                   <td>MYR ${sessionStorage.getItem("ride_point")}</td>
                 </tr>
               </table>
             </div>
     
             <div style="text-align:center">
              <button class="button button--material" id="paymentTopUp" onclick="Molpay()" style="display:none">Top Up</button>
              <button class="button button--material" id="payBtn" onclick="UpdateUserPayment()">PAY</button>
             </div>`
         );
        }
     });
   }*/
});

//global variable
var totalTopUp;
var totalBonus;
var molpayTotal;
var totalWBonus;

var getTopUp = function getTopUp() {

  $.ajax({
    url: sampleLink2 + 'ride/get_user_topup_value.php',
    method: "GET",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);

      var i = 0;
      var x = 2;

      var topUpList = "4*";

      if (totalTopUp == null || totalTopUp == undefined) {
        totalTopUp = 0.00;
      }

      if (totalBonus == null || totalBonus == undefined) {
        totalBonus = 0.00;
      }

      sessionStorage.setItem('totalTopUp', totalTopUp);
      sessionStorage.setItem('totalBonus', totalBonus);

      $("#topUpWrapper").empty();

      $("#topUpWrapper").append('<img src="img/Pay_icon.png">\n        \n        <label><span style="color:#ffdd00; font-weight: bold">Your</span> Voucher amount: <span style="color:#ffdd00; font-weight: bold">RM' + sessionStorage.getItem("ride_credit") + '</span></label>\n        \n        <table id="topUpTable">\n          <thead style="background-color:#ffdd00">\n            <tr>\n              <th>E-VOUCHER</th>\n              <th>QTY</th>\n              <th>BONUS (VALUE)</th>\n              <th>TOTAL</th>\n            </tr>\n          </thead>\n        </table>\n        \n        <ons-list>\n          <ons-list-item modifier="longdivider">\n            <div class="left">Pay Amount</div>\n            <div class="right" style="font-weight:bold">RM' + sessionStorage.getItem("totalTopUp") + '</div>\n          </ons-list-item>\n          <ons-list-item>\n            <div class="left">Total Bonus</div>\n            <div class="right" style="font-weight:bold">RM' + sessionStorage.getItem("totalBonus") + '</div>\n          </ons-list-item>\n        </ons-list>\n        \n        <button class="button button--outline" onclick="Molpay(\'TOPUP\')">CONFIRM</button>');

      console.log(jData.length);

      sessionStorage.setItem("topUpValue", jData.length);

      while (i < jData.length) {

        //  let qtyCounter = sessionStorage.getItem(`qtyCounter${i}`);
        console.log(jData[i].percentage);

        x = jData[i].percentage;

        if (sessionStorage.getItem('qtyBonus' + i) == null) {
          sessionStorage.setItem('qtyBonus' + i, x + '%');
        }

        if (sessionStorage.getItem('topUpTotal' + i) == null) {
          sessionStorage.setItem('topUpTotal' + i, ' - ');
        }

        var bonus = sessionStorage.getItem('bonus' + i);
        var qtyBonus = sessionStorage.getItem('qtyBonus' + i);
        var topUpTotal = sessionStorage.getItem('topUpTotal' + i);
        var topUpQty = sessionStorage.getItem('topUpQty' + i);

        var totalRow = parseFloat(jData[i].name.substring(2) * topUpQty) + parseFloat(bonus);

        //  console.log(totalRow);

        if (isNaN(totalRow)) {
          totalRow = 0;
        }

        if (topUpQty == null) {
          topUpQty = "0";
        }

        $("#topUpTable").append('<tbody>\n            <tr>\n              <td>' + jData[i].name + '</td>\n              <td>\n                <select class="select-input" name="qty' + i + '" id="qty' + i + '" onchange="calculateTopUp(' + i + ', ' + x + ')">\n                  <option value="0">0</option>\n                  <option value="1">1</option>\n                  <option value="2">2</option>\n                  <option value="3">3</option>\n                  <option value="4">4</option>\n                  <option value="5">5</option>\n                  <option value="6">6</option>\n                  <option value="7">7</option>\n                  <option value="8">8</option>\n                  <option value="9">9</option>\n                  <option value="10">10</option>\n                </select>\n              </td>\n              <td>' + qtyBonus + '</td>\n              <td>' + topUpTotal + '</td>\n            </tr>\n          </tbody>');

        $('select[name=qty' + i + ']').val('' + topUpQty);
        //  console.log($(`select[name=qty${i}]`).val());

        //  sessionStorage.setItem(`topUpList${i}`, `${topUpQty}*${jData[i].ID}*${jData[i].name.substring(2)}*`);

        sessionStorage.setItem('topUpList' + i, jData[i].ID + '*' + jData[i].name.substring(2) + '*' + topUpQty + '*' + totalRow.toFixed(2) + '*');

        topUpList += sessionStorage.getItem('topUpList' + i);

        //  console.log(topUpList);

        //  console.log(sessionStorage.getItem(`topUpList${i}`));
        //  console.log($(`#qty${qtyCounter} option:selected`).val());

        //  console.log((jData[i].name).substring(2));

        i += 1;
        //  x += 1;
      }

      sessionStorage.setItem('topUpConcatenate', topUpList);

      console.log(sessionStorage.getItem('topUpConcatenate'));

      modal.hide();
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
};

var calculateTopUp = function calculateTopUp(i, x) {
  //  console.log(`calculateTopUp: i is ${i}, x is ${x}`);
  //  console.log(parseFloat($(`#qty${i}`).val()));

  $.ajax({
    url: sampleLink2 + 'ride/get_user_topup_value.php',
    method: "GET",
    success: function success(data) {

      var jData = JSON.parse(data);

      var bonus = parseFloat(jData[i].name.substring(2) * parseFloat(x / 100));

      var qtyBonus = bonus * parseFloat($('#qty' + i).val());
      //  let topUpTotal = parseFloat(jData[i].name.substring(2) * parseFloat($(`#qty${i}`).val()) + qtyBonus);
      var topUpTotal = parseFloat(jData[i].name.substring(2) * parseFloat($('#qty' + i).val()));
      var totalAndBonus = parseFloat(jData[i].name.substring(2) * parseFloat($('#qty' + i).val()) + qtyBonus);

      sessionStorage.setItem('bonus' + i, qtyBonus.toFixed(2));
      sessionStorage.setItem('calcTotal' + i, topUpTotal.toFixed(2));

      sessionStorage.setItem('qtyBonus' + i, x + '% (RM' + qtyBonus.toFixed(2) + ')');
      sessionStorage.setItem('topUpTotal' + i, 'RM' + topUpTotal.toFixed(2));
      sessionStorage.setItem('topUpQty' + i, $('#qty' + i).val());

      sessionStorage.setItem('totalAndBonus' + i, totalAndBonus.toFixed(2));

      //  totalBonus += qtyBonus;
      //  totalTopUp += topUpTotal;

      //  console.log(totalBonus);

      var totalCounter = 0;
      totalTopUp = 0.00;
      totalBonus = 0.00;
      totalWBonus = 0.00;

      while (totalCounter < sessionStorage.getItem("topUpValue")) {

        if (sessionStorage.getItem('bonus' + totalCounter) != null && sessionStorage.getItem('calcTotal' + totalCounter) != " - ") {
          totalBonus += parseFloat(sessionStorage.getItem('bonus' + totalCounter));
          totalTopUp += parseFloat(sessionStorage.getItem('calcTotal' + totalCounter));
          totalWBonus += parseFloat(sessionStorage.getItem('totalAndBonus' + totalCounter));

          //    console.log(sessionStorage.getItem(`bonus${totalCounter}`));
          //    console.log(sessionStorage.getItem(`calcTotal${totalCounter}`));
          //    console.log(sessionStorage.getItem(`totalAndBonus${totalCounter}`));
        }

        totalCounter += 1;
      }

      molpayTotal = totalTopUp;

      //  console.log(molpayTotal);

      //  console.log(molpayTotal.toFixed(2));

      //  console.log(totalWBonus.toFixed(2));

      sessionStorage.setItem('totalWBonus', totalWBonus.toFixed(2));
      sessionStorage.setItem('molpayTotal', molpayTotal.toFixed(2));

      //  sessionStorage.setItem(`molpayTotal`, `1.01`);

      getTopUp();
    }
  });
};

function loadPostcode() {

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal = document.querySelector('ons-modal');
  modal.show();

  console.log($("#stateSelect option:selected").text());
  //Postcode
  $.ajax({
    url: sampleLink2 + "ride_v2/load_postcode.php",
    data: { state: $("#stateSelect option:selected").text() },
    method: "POST",
    success: function success(data) {
      console.log(data);

      modal.hide();

      //  var jData = JSON.parse(data);

      //  var x = 0;

      //  while (x < jData.length) {

      $("#postcodeWrapper").html("<p>Postcode</p>" + data);
      //    x += 1;
      //  }
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, please try again when you have internet connection",
        cancelable: false
      });

      fn.pop();
      modal.hide();
    },
    timeout: 4000
  });
}

function VerifyEmail() {
  var verifyEmail = $("#email").val();

  $.ajax({
    url: sampleLink2 + "ride/search_duplicateEmail.php",
    data: { email: verifyEmail },
    method: "POST",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);

      ons.notification.toast({
        message: jData[0].duplicate_email,
        timeout: 2500
      });
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "ride User",
        message: "Failed to verify email, please ensure you have internet connection",
        cancelable: false
      });
    },
    timeout: 3000
  });
}

function VerifyPlate() {

  var carPlate = $("#regVehPlate").val();
  console.log(carPlate);

  $.ajax({
    url: sampleLink2 + "ride/search_duplicate_carplate.php",
    data: { car_plate: carPlate },
    method: "POST",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);

      sessionStorage.setItem('plateMessage', jData[0].status);

      ons.notification.toast({
        message: jData[0].status,
        timeout: 2500
      });
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);
    }
  });
}

function loadVehBrand() {

  //  console.log($("#regVehType").val());
  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal = document.querySelector('ons-modal');
  modal.show();

  $.ajax({
    url: sampleLink2 + "ride_v2/load_vehicle_brand.php",
    method: "POST",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);

      var i = 0;

      while (i < jData.length) {
        $("#regVehBrand").append('<option value=' + jData[i].ID + '>' + jData[i].name + '</option>');
        i += 1;
      }

      modal.hide();
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "There seems to be a network disruption",
        cancelable: false
      });

      modal.hide();
    },
    timeout: 4000
  });
}

function loadVehModel() {
  //  console.log($("#regVehBrand").val());
  console.log($("#regVehBrand option:selected").text());

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal = document.querySelector('ons-modal');
  modal.show();

  $.ajax({
    url: sampleLink2 + "ride_v2/load_vehicle_model.php",
    data: { brand: $("#regVehBrand option:selected").text() },
    method: "POST",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);

      var i = 0;

      while (i < jData.length) {
        $("#regVehModel").append('<option value=' + jData[i].id + '>' + jData[i].name + '</option>');
        i += 1;
      }

      modal.hide()
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "There seems to be a network disruption",
        cancelable: false
      });

      modal.hide();
    },
    timeout: 4000
  });
}

function GetVehBatt() {

  var battInfo = {
    brand: $("#regVehMaker").val(),
    model: $("#regVehModel").val(),
    year: $("#regVehYear option:selected").text()
  };

  $.ajax({
    url: sampleLink2 + "ride/load_vehicle_batt_info.php",
    data: battInfo,
    method: "POST",
    success: function success(data) {

      console.log($("#regVehMaker").val());
      console.log($("#regVehModel").val());
      console.log($("#regVehYear option:selected").text());
      console.log("GetVehBatt" + data);

      var jData = JSON.parse(data);

      var x = 0;

      $("#regBattModel").empty();

      while (x < jData.length) {

        $("#regBattModel").append('<option value=' + jData[x].batt_code + '>' + jData[x].batt_name + '</option>');
        x += 1;
      }
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);
    }
  });
}

function loadVehVariant() {

  console.log($("#regVehBrand").val() + $("#regVehModel").val());

  var brandModel = $("#regVehBrand").val() + $("#regVehModel").val();

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal = document.querySelector('ons-modal');
  modal.show();

  $.ajax({
    url: sampleLink2 + "ride_v2/load_vehicle_variant.php",
    data: { car_code: brandModel },
    method: "POST",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);

      var i = 0;

      while (i < jData.length) {
        console.log(jData[i].ID);

        $("#regVehVariant").append('<option value=' + jData[i].ID + '>' + jData[i].name + '</option>');
        i += 1;
      }

      modal.hide();
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "There seems to be a network disruption",
        cancelable: false
      });

      modal.hide();
    },
    timeout: 4000
  });
}

function getVehicleColor() {
  //Vehicle Color
  $.ajax({
    url: sampleLink2 + "ride/get_vehicle_Color.php",
    method: "GET",
    success: function success(data) {
      var jData = JSON.parse(data);

      var x = 0;

      while (x < jData.length) {

        $("#regVehColor").append('<option value=' + jData[x].ID + '>' + jData[x].name + '</option>');
        x += 1;
      }
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected, failed to load colors",
        cancelable: false
      });

    }
  });
}

function GetVehRegData() {

  console.log("car plate " + $("#regVehPlate").val().toUpperCase());
  console.log("user_id " + gUserId);
  console.log("carID " + $("#regVehVariant").val());

  var parameters = {
    car_plate: $("#regVehPlate").val().toUpperCase(),
    user_id: gUserId,
    carID: $("#regVehVariant").val(),
    color: $("#regVehColor").val(),
    fuel_type: "",
    car_battery: "",
    tyre_code: ""
  };

  $.ajax({
    url: sampleLink2 + "ride_v2/vehicle_registration.php",
    data: parameters,
    method: "POST",
    success: function success(data) {
      console.log(data);

      ons.notification.toast({
        message: "Registration successful",
        timeout: 1500
      });

      fn.reset("login.html");
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);
    }
  });
}

function EnableLastInput() {
  if ($('#selectVehicle option:selected').val() !== "blank" && $('#selectVehicle option:selected').val() !== "null") {

    document.getElementById("lastMileage").disabled = false;
    document.getElementById("lastDate").disabled = false;
    document.getElementById("nextMileage").disabled = false;
    document.getElementById("nextDate").disabled = false;
  }
}

function AddVehicle() {
  /*  var parameters = {
      id: gUserId,
      car_plate_num: $("#regVehPlate").val().toUpperCase(),
      car_type: $("#regVehType option:selected").text(),
      car_maker: $("#regVehMaker option:selected").text(),
      car_model: $("#regVehModel option:selected").text(),
      color: $("#regVehColor option:selected").text(),
      car_variant: $("#regVehVariant option:selected").text(),
      car_transmission: $("#regVehTransmission option:selected").text(),
      fuel_type: $("#regVehFuel option:selected").text(),
      car_battery: $("#regBattModel option:selected").text(),
      tyre_width: $("#regTyreWidth option:selected").text(),
      tyre_ratio: $("#regTyreRatio option:selected").text(),
      tyre_rim: $("#regTyreRim option:selected").text(),
      year: $("#regVehYear").val(),
      tyre_code: $("#regTyreWidth option:selected").text() + '/' + $("#regTyreRatio option:selected").text() + 'R' + $("#regTyreRim option:selected").text()
    };

    if (sessionStorage.getItem('plateMessage') !== "Car Plate Already Registered" && $("#regVehType option:selected").val() !== "blank" && $("#regVehMaker option:selected").val() !== "blank" && $("#regVehModel option:selected").val() !== "blank" && $("#regVehYear option:selected").val() !== "blank" && $("#regVehVariant option:selected").val() !== "blank" && $("#regVehColor option:selected").val() !== "blank" && $("#regVehTransmission option:selected").val() !== "blank" && $("#regVehFuel option:selected").val() !== "blank" && $("#regBattModel option:selected").val() !== "blank" && $("#regTyreWidth option:selected").val() !== "blank" && $("#regTyreRatio option:selected").val() !== "blank" && $("#regTyreRim option:selected").val() !== "blank") {

      $.ajax({
        url: sampleLink2 + "ride_v2/vehicle_registration.php",
        data: parameters,
        method: "POST",
        success: function success(data) {
          //  console.log(data);

          ons.notification.toast({
            message: 'Car Plate Registered',
            timeout: 2500
          });
        },
        error: function error(jqxhr, status, errorThrown) {
          console.log('Error: ' + errorThrown);
          console.log('Error: ' + jqxhr.responseText);
        }
      });
    } else if (sessionStorage.getItem('plateMessage') == "Car Plate Already Registered") {
      ons.notification.toast({
        message: 'Car Plate Already Registered',
        timeout: 2500
      });
    } else {
      ons.notification.toast({
        message: 'All fields are required',
        timeout: 2500
      });
    }*/

  if ($("#regVehPlate").val() !== "" && $("#regVehBrand option:selected").val() !== "blank" && $("#regVehModel option:selected").val() !== "blank" &&
    $("#regVehVariant option:selected").val() !== "blank" && $("#regVehColor option:selected").val() !== "blank") {

    $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

    modal = document.querySelector('ons-modal');
    modal.show();

    var parameters = {
      car_plate: $("#regVehPlate").val().toUpperCase(),
      user_id: gUserId,
      carID: $("#regVehVariant").val(),
      color: $("#regVehColor").val(),
      fuel_type: "",
      car_battery: "",
      tyre_code: ""
    };

    $.ajax({
      url: sampleLink2 + "ride_v2/vehicle_registration.php",
      data: parameters,
      method: "POST",
      success: function success(data) {
        console.log(data);

        modal.hide();

        ons.notification.toast({
          message: "Vehicle successfully added",
          timeout: 1500
        });

        fn.reset("dashboard.html");
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Error: " + jqxhr.responseText);

        ons.notification.alert({
          title: "Connection issue",
          message: "Network issue detected, please try again when you have connection",
          cancelable: false
        });

        modal.hide();
      },
      timeout: 4000
    });
  } else {
    ons.notification.toast({
      message: 'All fields are required',
      timeout: 2500
    });
  }
}

function EnableProfileEdit() {
  document.getElementById("profileName").disabled = false;
  //  document.getElementById("nric").disabled = false;
  document.getElementById("profileBirthday").disabled = false;
  document.getElementById("profileMobile").disabled = false;
  document.getElementById("profileAddress").disabled = false;
  document.getElementById("profileName").style.opacity = "1.0";
  //  document.getElementById("nric").style.opacity = "1.0";
  document.getElementById("profileBirthday").style.opacity = "1.0";
  document.getElementById("profileMobile").style.opacity = "1.0";
  document.getElementById("profileAddress").style.opacity = "1.0";
  document.getElementById("editProfile-button").style.display = "none";
  document.getElementById("saveProfile-button").style.visibility = "visible";
}

function SaveProfile() {
  //  $("#nric").val()
  var myProfileParameters = {
    user_id: gUserId,
    Update: "update",
    new_name: $("#profileName").val(),
    new_ic: "",
    new_mobile: $("#profileMobile").val(),
    dob: $("#profileBirthday").val(),
    profile_address: $("#profileAddress").val()
  };
  console.log($("#profileAddress").val());

  $.ajax({
    url: sampleLink2 + "ride_v2/get_user_Profile.php",
    data: myProfileParameters,
    method: "POST",
    success: function success(data) {

      ons.notification.toast({
        message: 'Profile saved',
        timeout: 1000
      });

      fn.pop();
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log(errorThrown);
      console.log('' + jqxhr.responseText);
    }

  });
}

function ChangePassword() {
  var parameters = {
    user_id: gUserId,
    old_password: $("#oldPwd").val(),
    new_password: $("#newPwd").val(),
    confirm_new_pass: $("#reNewPwd").val()
  };

  $.ajax({
    url: sampleLink2 + 'ride/update_User_password.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);

      if (jData[0].status == "fail") {
        ons.notification.toast({
          message: 'Incorrect password or missing fields',
          timeout: 3000
        });
      } else {
        ons.notification.toast({
          message: 'Password successfully updated',
          timeout: 3000
        });
      }
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('' + jqxhr.responseText);
    }
  });
}

function GetBreakdownCategory(carPlate) {
  fn.load("breakdownCategory.html");

  // console.log(carPlate);

  sessionStorage.setItem("car_plate", carPlate);

  //var i = breakdownList.substring(13, 14);

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal = document.querySelector('ons-modal');
  modal.show();

  $.ajax({
    //  url: sampleLink2 + "ride/get_user_VehicleInfo.php",
    url: sampleLink2 + 'ride/get_breakdown_Categorylist.php',
    method: "GET",
    success: function success(data) {

      console.log(data);

      var jData = JSON.parse(data);

      //  console.log(`get_breakdown_CategoryList.php: ${data}`);
      //  console.log(i);

      //var breakdownCar = jData[i].Model;

      //  $("#loadBreakdownCategory").append('<ons-list-item tappable modifier="chevron" onclick="TyreBreakdown()">\n          <img src=' + jData[0].image_url + ' width="40" height="40">' + jData[0].name + '\n        </ons-list-item>\n        <ons-list-item tappable modifier="chevron" onclick="BatteryBreakdown()">\n          <img src=' + jData[1].image_url + ' width="40" height="33">' + jData[1].name + '\n        </ons-list-item>');
      $("#loadBreakdownCategory").append("<img src=\"img/tyre_bdown.png\" onclick=\"TyreBreakdown()\">\n        <img src=\"img/batt_bdown.png\" onclick=\"BatteryBreakdown()\">");

      modal.hide();
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
      console.log("Status: " + status);

      ons.notification.alert({
        title: "Connection issue",
        message: "Connection issue detected.",
        cancelable: false
      });
    },
    timeout: 4000
  });
}

//create helpdesk ID
function CreateHelpdesk(type) {
  var parameters = {
    user_id: gUserId,
    partner_id: "",
    latitude: gLat,
    longitude: gLong,
    counter: "1",
    size: "1",
    carplate: sessionStorage.getItem("car_plate"),
    breakdown_type: 'B00000000' + type,
    helpdesk_id: "",
    distance: "0.8"
  };

  localStorage.setItem('breakdown_type', 'B00000000' + type);
  console.log(localStorage.getItem('breakdown_type'));
  console.log(gLat);
  console.log(gLong);

  $.ajax({
    url: sampleLink2 + 'link/breakdown/create_helpdesk.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      var jData = JSON.parse(data);

      console.log(data);

      sessionStorage.setItem('helpdesk_id', jData[0].ID);
      console.log('helpdesk ID: ' + sessionStorage.getItem("helpdesk_id"));
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error' + errorThrown);
      console.log('Error' + jqxhr.responseText);
    }
  });
}

//Global variable for tyre with issue
var tyre1 = "00000";
var tyre2 = "00000";
var tyre3 = "00000";
var tyre4 = "00000";

function GetTyreIssue(id) {
  //  console.log(id);

  //console.log($('input[name="frontLeft"]:checked').serialize());

  if (id == "flTyre") {

    $('input[name="frontLeft"]:checked').each(function() {

      String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
      };

      tyre1 = tyre1.replaceAt(parseInt(this.value), "1");
    });

    $('input[name="frontLeft"]:not(:checked)').each(function() {

      String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
      };

      tyre1 = tyre1.replaceAt(parseInt(this.value), "0");
    });

    if ($('input[name="frontLeft"]').is(':checked')) {
      document.getElementById("frontLeftBtn").style.backgroundColor = "#ffdd00";
      document.getElementById("frontLeftBtn").style.color = "#000";
    } else {
      document.getElementById("frontLeftBtn").style.backgroundColor = "transparent";
      document.getElementById("frontLeftBtn").style.color = "#fff";
    }

    hideDialog(id);
  } else if (id == "frTyre") {
    $('input[name="frontRight"]:checked').each(function() {

      String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
      };

      tyre2 = tyre2.replaceAt(parseInt(this.value), "1");
    });

    $('input[name="frontRight"]:not(:checked)').each(function() {

      String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
      };

      tyre2 = tyre2.replaceAt(parseInt(this.value), "0");
    });

    if ($('input[name="frontRight"]').is(':checked')) {
      document.getElementById("frontRightBtn").style.backgroundColor = "#ffdd00";
      document.getElementById("frontRightBtn").style.color = "#000";
    } else {
      document.getElementById("frontRightBtn").style.backgroundColor = "transparent";
      document.getElementById("frontRightBtn").style.color = "#fff";
    }

    hideDialog(id);
  } else if (id == "rlTyre") {
    $('input[name="rearLeft"]:checked').each(function() {

      String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
      };

      tyre3 = tyre3.replaceAt(parseInt(this.value), "1");
    });

    $('input[name="rearLeft"]:not(:checked)').each(function() {

      String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
      };

      tyre3 = tyre3.replaceAt(parseInt(this.value), "0");
    });

    if ($('input[name="rearLeft"]').is(':checked')) {
      document.getElementById("rearLeftBtn").style.backgroundColor = "#ffdd00";
      document.getElementById("rearLeftBtn").style.color = "#000";
    } else {
      document.getElementById("rearLeftBtn").style.backgroundColor = "transparent";
      document.getElementById("rearLeftBtn").style.color = "#fff";
    }

    hideDialog(id);
  } else if (id == "rrTyre") {
    $('input[name="rearRight"]:checked').each(function() {

      String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
      };

      tyre4 = tyre4.replaceAt(parseInt(this.value), "1");
    });

    $('input[name="rearRight"]:not(:checked)').each(function() {

      String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
      };

      tyre4 = tyre4.replaceAt(parseInt(this.value), "0");
    });

    if ($('input[name="rearRight"]').is(':checked')) {
      document.getElementById("rearRightBtn").style.backgroundColor = "#ffdd00";
      document.getElementById("rearRightBtn").style.color = "#000";
      //  console.log(document.getElementById("rearRightBtn").style.backgroundColor);
    } else {
      document.getElementById("rearRightBtn").style.backgroundColor = "transparent";
      document.getElementById("rearRightBtn").style.color = "#fff";
    }

    hideDialog(id);
  }
}

function SaveTyreIssue() {

  var tyreCodes = tyre1 + '*' + tyre2 + '*' + tyre3 + '*' + tyre4;

  if (tyreCodes == '00000*00000*00000*00000') {
    ons.notification.toast({
      message: 'No tyre issue selected',
      timeout: 2000
    });
  } else {
    var tyreIssueCode = '4*' + tyre1 + '*' + tyre2 + '*' + tyre3 + '*' + tyre4 + '*' + $("#addComments").val();
    sessionStorage.setItem("tyre_issue_code", tyreIssueCode);

    // console.log(sessionStorage.getItem("tyre_issue_code"));

    TbreakdownTeamPage();
    //  fn.load('getBreakdownTeam.html');
  }
}

function TbreakdownTeamPage() {
  fn.replace('getBreakdownTeam.html');

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal = document.querySelector('ons-modal');
  modal.show();

  /*  document.addEventListener("show", () => {
        if (event.target.id === "getBreakdownTeam-page") {*/
  setTimeout(function() {
    BreakdownMap();
    LoadPcrTeam(sessionStorage.getItem("tyre_issue_code"), "98001");
  }, 500);
  /*      }
    });*/
}

/*function UpdateHelpdeskStatus() {
  var parameters = {
    partner_id: "",
    user_id: gUserId,
    status: "10009",
    helpdesk_id: sessionStorage.getItem("helpdesk_id")
  };

  $.ajax({
    url: `${sampleLink2}link/breakdown/update_helpdesk_status.php`,
    data: parameters,
    method: "POST",
    success: data => {
      console.log(data);

      var jData = JSON.parse(data);

      if (jData[0].status == "Success") {

      } else {
        ons.notification.status({
          message: `Failed to update helpdesk ID, please retry`,
          timeout: 4000
        });
      }
    },
    error: (jqxhr, status, errorThrown) => {
      console.log(`Error: ${errorThrown}`);
      console.log(`Error: ${jqxhr.responseText}`);
    }
  });
}*/

function LoadPcrTeam(listData, typeData) {

  /*  ons.setDefaultDeviceBackButtonListener(function() {
      UserCancelledOrder();
      setTimeout(function() { removeHelpdeskStorage(); }, 500);
      alert("SAD");
    });*/

  document.addEventListener("backbutton", breakdownBackButton);

  var parameters = {
    longitude: gLong,
    latitude: gLat,
    list: listData,
    user_id: gUserId,
    helpdesk_id: sessionStorage.getItem("helpdesk_id"),
    type: typeData //98001 Tyre breakdown, 98002 for battery breakdown
  };

  console.log(gLong + ', ' + gLat);
  console.log(sessionStorage.getItem('tyre_issue_code'));
  console.log(gUserId);
  console.log(sessionStorage.getItem("helpdesk_id"));
  console.log(listData);
  console.log(typeData);

  $.ajax({
    url: sampleLink2 + 'ride/get_pcr_BreakdownTeam.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      console.log(data);
      modal = document.querySelector('ons-modal');

      var jData = JSON.parse(data);

      //  console.log(JSON.stringify(jData));

      var i = 0;
      var x;

      setTimeout(function() {
        $("#workshopList").empty();

        if (JSON.stringify(jData) !== "null") {
          while (i < jData.length) {

            x = i + 1;

            sessionStorage.setItem('latitude' + i, jData[i].latitude);
            sessionStorage.setItem('longitude' + i, jData[i].longitude);
            sessionStorage.setItem('workshop_distance' + i, jData[i].distance);
            sessionStorage.setItem('partner_id' + i, jData[i].ID);
            sessionStorage.setItem('item_id' + i, jData[i].item_id);
            localStorage.setItem('workshop_price' + i, jData[i].price);
            localStorage.setItem('cancel_charge' + i, jData[i].cancel_charges);

            var partnerID = sessionStorage.getItem('partner_id' + i);
            // console.log(`Partner ID: ${partnerID}`);

            $("#workshopList").append('<tr onclick="GetConfirmation(' + jData[i].ID + ', ' + jData[i].item_id + ', ' + i + ')">\n                <td>BD team ' + x + '</td>\n                <td>RM' + jData[i].price + '</td>\n                <td>' + jData[i].distance + 'km</td>\n                <td id="ratings' + i + '"></td>\n              </tr>');

            if (jData[i].rating == "0") {
              $('#ratings' + i).append('<img src="img/rating0.png">');
            } else if (jData[i].rating == "1") {
              $('#ratings' + i).append('<img src="img/rating1.png">');
            } else if (jData[i].rating == "2") {
              $('#ratings' + i).append('<img src="img/rating2.png">');
            } else if (jData[i].rating == "3") {
              $('#ratings' + i).append('<img src="img/rating3.png">');
            } else if (jData[i].rating == "4") {
              $('#ratings' + i).append('<img src="img/rating4.png">');
            } else if (jData[i].rating == "5") {
              $('#ratings' + i).append('<img src="img/rating5.png">');
            }

            gMaps.addMarker({
              lat: sessionStorage.getItem('latitude' + i),
              lng: sessionStorage.getItem('longitude' + i)
                //optimized: false
            });

            setTimeout(function() {
              modal.hide();
            }, 1000);

            i += 1;
          }
        } else {
          ons.notification.toast({
            message: 'No nearby workshop found',
            timeout: 1500
          });

          modal.hide();
        }
      }, 1000);
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
}

function GetConfirmation(partnerID, itemID, index) {
  var cancelCharge = localStorage.getItem('cancel_charge' + index);

  ons.notification.confirm({
    message: 'Do you want to proceed with the job? RM' + cancelCharge + ' will be applied for cancellation',
    buttonLabels: ["NO", "YES"],
    callback: function callback(response) {
      switch (response) {
        case 0:
          break;
        case 1:
          ConnectWorkshop(partnerID, itemID, index);
          break;
      }
    }
  });
}

function ConnectWorkshop(partnerID, itemID, index) {

  localStorage.setItem('helpdesk_id', sessionStorage.getItem("helpdesk_id"));
  console.log(localStorage.getItem('helpdesk_id'));

  console.log('Partner ID: ' + partnerID + ', Item ID: ' + itemID + ', ' + sessionStorage.getItem("car_plate") + ', ' + sessionStorage.getItem("helpdesk_id"));

  console.log("Distance: " + sessionStorage.getItem('workshop_distance' + index));

  localStorage.setItem('index', index);

  console.log(localStorage.getItem('index'));

  var parameters = {
    user_id: gUserId,
    partner_id: partnerID,
    latitude: gLat,
    longitude: gLong,
    counter: "1",
    size: "1",
    carplate: sessionStorage.getItem("car_plate"),
    breakdown_type: localStorage.getItem('breakdown_type'), //03/11/2017
    helpdesk_id: sessionStorage.getItem("helpdesk_id"),
    item_id: itemID,
    distance: sessionStorage.getItem('workshop_distance' + index)
  };

  $.ajax({
    url: sampleLink2 + 'link/breakdown/update_helpdesk.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      //  console.log(data);

      GetBreakdownTeamResponse();
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error ' + errorThrown);
      console.log('Error ' + jqxhr.responseText);
    }
  });
}

function UpdateStatusNotAccepted() {

  var parameters = {
    status: "10016",
    helpdesk_id: sessionStorage.getItem('helpdesk_id')
  };

  $.ajax({
    url: sampleLink2 + 'link/breakdown/update_status.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      console.log(data);
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error ' + errorThrown);
      console.log('Error ' + jqxhr.responseText);
    }
  });
}

function UpdateStatusCancelled() {

  var parameters = {
    status: "10009",
    helpdesk_id: sessionStorage.getItem('helpdesk_id')
  };

  $.ajax({
    url: sampleLink2 + 'link/breakdown/update_status.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      console.log(data);

      localStorage.removeItem('helpdesk_id');
      localStorage.removeItem('breakdown_type');

      hideDialog('agreement');

      fn.pop();
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error ' + errorThrown);
      console.log('Error ' + jqxhr.responseText);
    }
  });
}

function UserCancelledOrder() {
  var parameters = {
    status: "10009",
    helpdesk_id: sessionStorage.getItem('helpdesk_id')
  };

  $.ajax({
    url: sampleLink2 + 'link/breakdown/update_status.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      console.log(data);

      localStorage.removeItem('helpdesk_id');
      localStorage.removeItem('breakdown_type');

    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error ' + errorThrown);
      console.log('Error ' + jqxhr.responseText);
    }
  });
}

var attempt = 0;
//interval for workshop to respond
function GetBreakdownTeamResponse() {

  var time = 60;
  console.log(attempt);

  var bDownResponse = setInterval(function() {

    $.ajax({
      url: sampleLink2 + 'ride/get_breakdownteam_Response.php',
      data: { helpdesk_id: sessionStorage.getItem("helpdesk_id") },
      method: "POST",
      success: function success(data) {
        // console.log(data);
        modal = document.querySelector('ons-modal');

        var jData = JSON.parse(data);

        console.log(jData[0].status);

        if (jData[0].status == "10002") {
          clearInterval(bDownResponse);
          modal.hide();

          PaymentAgreement();
        } else if (jData[0].status == "10014") {

          modal.hide();

          ons.notification.toast({
            message: 'Partner has cancelled the order',
            timeout: 3000
          });

          attempt += 1;

          if (attempt === 3) {
            removeHelpdeskStorage();
            CreateHelpdesk(sessionStorage.getItem("bdownType"));
            attempt = 0;
            console.log(attempt);

            ons.notification.alert({
              title: "Failed requests",
              message: "It appears your requests have failed, do you need help? Select contact us to speak to our helpdesk",
              cancelable: false
            });
          }

          clearInterval(bDownResponse);

          //  fn.pop();
        } else if (jData[0].status == "10008") {

          time -= 1;

          $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon> Partner is currently processing your order ' + time);

          if (time == 0) {
            clearInterval(bDownResponse);
            modal.hide();

            UpdateStatusNotAccepted();

            ons.notification.toast({
              message: 'Partner did not accept your request',
              timeout: 3000
            });

            attempt += 1;
            console.log(attempt);

            if (attempt === 3) {
              removeHelpdeskStorage();
              CreateHelpdesk(sessionStorage.getItem("bdownType"));
              attempt = 0;
              console.log(attempt);

              ons.notification.alert({
                title: "Failed requests",
                message: "It appears your requests have failed, do you need help? Select contact us to speak to our helpdesk",
                cancelable: false
              });
            }
            //  fn.pop();
          }
        } else if (jData[0].status == "10003") {
          clearInterval(bDownResponse);
          modal.hide();

          ons.notification.toast({
            message: 'Partner has rejected your order request',
            timeout: 2000
          });

          attempt += 1;

          if (attempt === 3) {
            removeHelpdeskStorage();
            CreateHelpdesk(sessionStorage.getItem("bdownType"));
            attempt = 0;
            console.log(attempt);

            ons.notification.alert({
              title: "Failed requests",
              message: "It appears your requests have failed, do you need help? Select contact us to speak to our helpdesk",
              cancelable: false
            });
          }

          //  fn.pop();
        } else if (jData[0].status == "10012") {
          var _bDownResponse = setInterval(function() {
            if (jData[0].status == "10006") {
              clearInterval(_bDownResponse);
              setTimeout(function() {
                modal.hide();

                document.querySelector('#navigator').pushPage('partnerLocation.html', { data: { title: 'Partner Location' } });
              }, 5000);
            }
          }, 1000);
        } else if (jData[0].status == "10006") {
          clearInterval(bDownResponse);

          document.querySelector('#navigator').pushPage('partnerLocation.html', { data: { title: 'Partner Location' } });
        } else if (jData[0].status == "10007") {
          clearInterval(bDownResponse);

          ons.notification.toast({
            message: 'Partner arrived, initiating QR',
            timeout: 1000
          });

          setTimeout(function() {
            scan();
          }, 1500);
        } else if (jData[0].status == "10021" || jData[0].status == "10020" || jData[0].status == "10022") {
          clearInterval(bDownResponse);
          DiagnosePage();
        } else if (jData[0].status == "10024") {
          console.log("checklist ready");
          //  clearInterval(initiateChecklist);
          clearInterval(bDownResponse);
          setTimeout(function() {
            UserChecklist();
          }, 1000);
        } else {

          console.log(jData[0].status);
          time -= 1;

          $("#modalContainer").empty();
          $("#modalContainer").append('<ons-icon icon="md-spinner" size="28px" spin></ons-icon> Awaiting response from partner ' + time);

          modal.show();

          if (time == 0) {
            clearInterval(bDownResponse);
            modal.hide();

            UpdateStatusNotAccepted();

            ons.notification.toast({
              message: 'Partner did not accept your request',
              timeout: 3000
            });

            attempt += 1;
            console.log(attempt);

            if (attempt === 3) {
              removeHelpdeskStorage();
              CreateHelpdesk(sessionStorage.getItem("bdownType"));
              attempt = 0;
              console.log(attempt);

              ons.notification.alert({
                title: "Failed requests",
                message: "It appears your requests have failed, do you need help? Select contact us to speak to our helpdesk",
                cancelable: false
              });
            }

            //  fn.pop();
          }
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log('Error: ' + errorThrown);
        console.log('Error: ' + jqxhr.responseText);
      }
    });
  }, 1000);
}

function PaymentAgreement() {

  //  console.log(`${localStorage.getItem("workshop_price")}`);
  showDialog('agreement');

  var index = localStorage.getItem('index');

  var workshopPrice = localStorage.getItem('workshop_price' + index);
  var cancelCharge = localStorage.getItem('cancel_charge' + index);

  $("#paymentAgreement").empty();

  $("#paymentAgreement").append('<div style="text-align: center; margin: 3%">\n      <label>Breakdown charge: RM ' + workshopPrice + '</label>\n      <label>Cancel charge: RM ' + cancelCharge + '</label>\n      <button class="button button--material" onclick="DisplayUserPayment()">Agree</button>\n      <button class="button button--material" onclick="UpdateStatusCancelled()">Cancel</button>\n    </div>');
}
//<button class="button button--material">Decline</button>

function DisplayUserPayment() {

  hideDialog('agreement');

  fn.load("payment.html");

  var index = localStorage.getItem('index');

  console.log(index);

  $.ajax({
    url: sampleLink2 + 'ride/load_customer_credit.php',
    data: { user_id: gUserId },
    method: "POST",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);
      var workshopPrice = localStorage.getItem('workshop_price' + index);
      var cancelCharge = localStorage.getItem('cancel_charge' + index);

      /*<tr>
        <td>2</td>
        <td>Cancel Charge</td>
        <td>RM ${cancelCharge}</td>
      </tr>*/

      $("#paymentWrapper").append('<div class="paymentTop">\n            <table>\n              <tr>\n                <th>No.</th>\n                <th>Item</th>\n                <th>Price</th>\n              </tr>\n              <tr>\n                <td>1</td>\n                <td>Breakdown Charge</td>\n                <td>RM ' + workshopPrice + '</td>\n              </tr>\n            </table>\n          </div>\n  \n          <div class="paymentMiddle">\n            <label>Total: ' + workshopPrice + '</label>\n          </div>\n\n          <div class="grandTotal">\n            <label>GRAND TOTAL</label>\n            <label>MYR ' + workshopPrice + '</label>\n          </div>\n  \n          <div class="paymentBottom">\n            <table>\n              <tr>\n                <th>E-VOUCHER</th>\n                <th>REMAINING</th>\n              </tr>\n              <tr>\n                <td>MYR ' + jData[0].balance_amt + '</td>\n                <td>MYR ' + jData[0].ride_point + '</td>\n              </tr>\n            </table>\n          </div>\n  \n          <div style="text-align:center">\n           <button class="button button--material" id="paymentTopUp" onclick="Molpay()" style="display:none">Top Up</button>\n           <button class="button button--material" id="payBtn" onclick="UpdateUserPayment()">PAY</button>\n          </div>');

      /*    
        <button onclick="show_coupon()">Coupon</button>
           <label>Discount: </label> 
      */

      sessionStorage.setItem('ride_point', jData[0].ride_point);
      sessionStorage.setItem('balance_amt', jData[0].balance_amt);
    }
  });
}

function FetchCoupon() {

  $.ajax({
    url: sampleLink2 + 'ride/fetch_coupon.php',
    data: { coupon_id: $("#coupon").val() },
    method: "POST",
    success: function success(data) {
      console.log(data);
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
}

function Molpay(type) {

  $.ajax({
    url: sampleLink2 + "link/molpay_counter.php",
    method: "POST",
    success: function success(data) {
      //  console.log(data);

      sessionStorage.setItem("molpay_counter", data);

      fn.load("molpay.html");

      setTimeout(function() {
        window.molpay.startMolpay(paymentDetails, molpayCallback);
        //  console.log(JSON.stringify(paymentDetails));
      }, 500);

      molpayCallback = function molpayCallback(transactionResult) {
        //  alert(transactionResult);
        //  $("#molpayWrapper").remove();

        sessionStorage.setItem('transactionResult', transactionResult);
        var jData = JSON.parse(transactionResult);

        //  alert($(jData).text());
        //  alert(jData.status_code);

        switch (type) {
          case "TOPUP":
            if (jData.status_code == "00") {
              document.getElementById("molpayWrapper").style.display = "none";

              $("#callback").html('<div style="background-color: #72529b; text-align: right; margin-top: 0%; width: 100%; height: 44px; z-index: 10">\n            <button style="border: 0px; color: #FFFFFF; background-color: transparent; margin: 15px" onclick="fn.pop()">Close</button>\n          </div>\n          <div style="text-align:center">\n            <p>Txn ID: ' + jData.txn_ID + '</p>\n            <p>Order ID: ' + jData.order_id + '</p>\n            <p>Status: Success</p>\n            \n            <button class="button button--material" style="background-color:#72529b" onclick="fn.pop()">Done</button>\n          </div>');

              if (sessionStorage.getItem('approve') == "0") {
                updateUserWallet();
                sessionStorage.setItem('approve', "1");
              } else {
                alert('Already top up 00');
              }
            } else if (jData.status_code == "11") {
              document.getElementById("molpayWrapper").style.display = "none";

              $("#callback").html('<div style="background-color: #72529b; text-align: right; margin-top: 0%; width: 100%; height: 44px; z-index: 10">\n            <button style="border: 0px; color: #FFFFFF; background-color: transparent; margin: 15px" onclick="fn.pop()">Close</button>\n          </div>\n          <div style="text-align:center">\n            <p>Txn ID: ' + jData.txn_ID + '</p>\n            <p>Order ID: ' + jData.order_id + '</p>\n            <p>Status: Failed</p>\n            \n            <button class="button button--material" style="background-color:#72529b" onclick="fn.pop()">Done</button>\n          </div>');
            } else if (jData.status_code == "22") {
              document.getElementById("molpayWrapper").style.display = "none";

              $("#callback").html('<div style="background-color: #72529b; text-align: right; margin-top: 0%; width: 100%; height: 44px; z-index: 10">\n            <button style="border: 0px; color: #FFFFFF; background-color: transparent; margin: 15px" onclick="fn.pop()">Close</button>\n          </div>\n          <div style="text-align:center">\n            <p>Txn ID: ' + jData.txn_ID + '</p>\n            <p>Order ID: ' + jData.order_id + '</p>\n            <p>Status: Pending</p>\n            \n            <button class="button button--material" style="background-color:#72529b" onclick="fn.pop()">Done</button>\n          </div>');
            } else {
              fn.pop();
            }
            break;

            /*      case "BREAKDOWN":
                    if (jData.status_code == "00") {
                      document.getElementById("molpayWrapper").style.display = "none";
                       $("#callback").html(
                        `<div style="background-color: #72529b; text-align: right; margin-top: 0%; width: 100%; height: 44px; z-index: 10">
                        <button style="border: 0px; color: #FFFFFF; background-color: transparent; margin: 15px" onclick="window.molpay.closeMolpay(); fn.pop()">Close</button>
                      </div>
                      <div style="text-align:center">
                        <p>Txn ID: ${jData.txn_ID}</p>
                        <p>Order ID: ${jData.order_id}</p>
                        <p>Status: Success</p>
                        
                        <button class="button button--material" style="background-color:#72529b" onclick="window.molpay.closeMolpay(); fn.pop()">Done</button>
                      </div>`
                      );
                    } else if (jData.status_code == "11") {
                      document.getElementById("molpayWrapper").style.display = "none";
                       $("#callback").html(
                        `<div style="background-color: #72529b; text-align: right; margin-top: 0%; width: 100%; height: 44px; z-index: 10">
                        <button style="border: 0px; color: #FFFFFF; background-color: transparent; margin: 15px" onclick="window.molpay.closeMolpay(); fn.pop()">Close</button>
                      </div>
                      <div style="text-align:center">
                        <p>Txn ID: ${jData.txn_ID}</p>
                        <p>Order ID: ${jData.order_id}</p>
                        <p>Status: Failed</p>
                        
                        <button class="button button--material" style="background-color:#72529b" onclick="window.molpay.closeMolpay(); fn.pop()">Done</button>
                      </div>`
                      );
                    } else if (jData.status_code == "22") {
                      document.getElementById("molpayWrapper").style.display = "none";
                       $("#callback").html(
                        `<div style="background-color: #72529b; text-align: right; margin-top: 0%; width: 100%; height: 44px; z-index: 10">
                        <button style="border: 0px; color: #FFFFFF; background-color: transparent; margin: 15px" onclick="window.molpay.closeMolpay(); fn.pop()">Close</button>
                      </div>
                      <div style="text-align:center">
                        <p>Txn ID: ${jData.txn_ID}</p>
                        <p>Order ID: ${jData.order_id}</p>
                        <p>Status: Pending</p>
                        
                        <button class="button button--material" style="background-color:#72529b" onclick="window.molpay.closeMolpay(); fn.pop()">Done</button>
                      </div>`
                      );
                    }
                    break;
                   case "PURCHASE":
                    if (jData.status_code == "00") {
                      document.getElementById("molpayWrapper").style.display = "none";
                       $("#callback").html(
                        `<div style="background-color: #72529b; text-align: right; margin-top: 0%; width: 100%; height: 44px; z-index: 10">
                        <button style="border: 0px; color: #FFFFFF; background-color: transparent; margin: 15px" onclick="window.molpay.closeMolpay(); fn.pop()">Close</button>
                      </div>
                      <div style="text-align:center">
                        <p>Txn ID: ${jData.txn_ID}</p>
                        <p>Order ID: ${jData.order_id}</p>
                        <p>Status: Success</p>
                        
                        <button class="button button--material" style="background-color:#72529b" onclick="window.molpay.closeMolpay(); fn.pop()">Done</button>
                      </div>`
                      );
                    } else if (jData.status_code == "11") {
                      document.getElementById("molpayWrapper").style.display = "none";
                       $("#callback").html(
                        `<div style="background-color: #72529b; text-align: right; margin-top: 0%; width: 100%; height: 44px; z-index: 10">
                        <button style="border: 0px; color: #FFFFFF; background-color: transparent; margin: 15px" onclick="window.molpay.closeMolpay(); fn.pop()">Close</button>
                      </div>
                      <div style="text-align:center">
                        <p>Txn ID: ${jData.txn_ID}</p>
                        <p>Order ID: ${jData.order_id}</p>
                        <p>Status: Failed</p>
                        
                        <button class="button button--material" style="background-color:#72529b" onclick="window.molpay.closeMolpay(); fn.pop()">Done</button>
                      </div>`
                      );
                    } else if (jData.status_code == "22") {
                      document.getElementById("molpayWrapper").style.display = "none";
                       $("#callback").html(
                        `<div style="background-color: #72529b; text-align: right; margin-top: 0%; width: 100%; height: 44px; z-index: 10">
                        <button style="border: 0px; color: #FFFFFF; background-color: transparent; margin: 15px" onclick="window.molpay.closeMolpay(); fn.pop()">Close</button>
                      </div>
                      <div style="text-align:center">
                        <p>Txn ID: ${jData.txn_ID}</p>
                        <p>Order ID: ${jData.order_id}</p>
                        <p>Status: Pending</p>
                        
                        <button class="button button--material" style="background-color:#72529b" onclick="window.molpay.closeMolpay(); fn.pop()">Done</button>
                      </div>`
                      );
                    }
                    break;*/
        }
      };
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
}

function UpdateUserPayment() {

  document.getElementById("payBtn").disabled = true;

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal.show();

  var index = localStorage.getItem('index');

  console.log(localStorage.getItem('workshop_price' + index));

  console.log(Math.round(localStorage.getItem('workshop_price' + index)));

  if (parseFloat(sessionStorage.getItem('balance_amt')) > localStorage.getItem('workshop_price' + index)) {

    var parameters = {
      partner_id: sessionStorage.getItem('partner_id' + index),
      user_id: gUserId,
      helpdesk_id: sessionStorage.getItem('helpdesk_id'),
      item_id: sessionStorage.getItem('item_id' + index),
      payment: localStorage.getItem('workshop_price' + index),
      coupon_id: "",
      deduct_percent: "",
      deduct_cash: "",
      deduct_amount: "",
      balance: sessionStorage.getItem('balance_amt'),
      points: Math.round(localStorage.getItem('workshop_price' + index))
    };

    $.ajax({
      url: sampleLink2 + 'ride/update_user_payment.php',
      data: parameters,
      method: "POST",
      success: function success(data) {
        // console.log(data);

        //  fn.load("partnerLocation.html");

        $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon> Mechanic is currently departing...');

        document.getElementById("payBtn").disabled = false;

        DepartStatus();
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log('Error: ' + errorThrown);
        console.log('Error: ' + jqxhr.responseText);
      }
    });
  } else {
    ons.notification.alert({
      title: "Not enough voucher amount",
      message: "You do not have enough voucher amount, please proceed to buy voucher",
      cancelable: false
    });

    fn.load("topUp.html");
  }
}

function DepartStatus() {
  var bDownResponse = setInterval(function() {

    $.ajax({
      url: sampleLink2 + 'ride/get_breakdownteam_Response.php',
      data: { helpdesk_id: sessionStorage.getItem("helpdesk_id") },
      method: "POST",
      success: function success(data) {
        var jData = JSON.parse(data);

        console.log(jData[0].status);

        if (jData[0].status == "10006") {
          clearInterval(bDownResponse);
          setTimeout(function() {
            modal.hide();

            document.querySelector('#navigator').pushPage('partnerLocation.html', { data: { title: 'Partner Location' } });
          }, 7000);
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log('Error: ' + errorThrown);
        console.log('Error: ' + jqxhr.responseText);
      }
    });
  }, 1000);
}

//Pass QR data to this php
function HelpdeskPartnerDetails() {
  var parameters = {
    partner_helpdesk_id: sessionStorage.getItem('helpdesk_id'),
    user_helpdesk_id: sessionStorage.getItem('helpdesk_id')
  };

  $.ajax({
    url: sampleLink2 + 'ride/helpdesk_partner_details.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      console.log(data);
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
}

/* const PartnerVehicleLocation = () => {

  fn.load("partnerLocation.html");

  $.ajax({
    url: `${sampleLink2}ride/get_partnervehicle_location.php`,
    data: { partner_id: sessionStorage.getItem(`partner_id`) },
    method: "POST",
    success: data => {
      let jData = JSON.parse(data);

      const getPartnerLoc = setInterval(() => {
        //  sessionStorage.setItem(`partnerLat`, jData[0].latitude);
        //  sessionStorage.setItem(`partnerLong`, jData[0].longitude);

        gMaps.removeMarkers();

        gMaps.addMarker({
          lat: jData[0].latitude,
          lng: jData[0].longitude,
          icon: 'img/blue-marker.png',
          optimized: false
        });
      }, 2000);

      $("#partnerLocWrapper").append(
        `<button class="button button--material" onclick="clearInterval(getPartnerLoc); scan()">Confirm Partner Arrival</button>`
      );
    },
    error: (jqxhr, status, errorThrown) => {
      console.log(`Error: ${errorThrown}`);
      console.log(`Error: ${jqxhr.responseText}`);
    }
  });
}*/

function scan() {

  cordova.plugins.barcodeScanner.scan(function(result) {
    /*  document.querySelector('#navigator').pushPage("qrResult.html", { data: { title: 'Checklist' } });
       $("#qrResultWrapper").append(
        `Data: ${result.text}
        <p>Please hold while your car is being diagnosed</p>
        <p>Select complete when everything is nice and ready</p>
        
        <button class="button button--material" onclick="UserChecklist()">Complete</button>`
      );
       alert("We got a barcode\n" +
        "Result: " + result.text + "\n" +
        "Format: " + result.format + "\n" +
        "Cancelled: " + result.cancelled);*/

    showDialog('qrReturn');

    $("#qrData").empty();

    $("#qrData").append('<p>Is this your workshop partner?</p>\n          <p>Partner ID: ' + result.text + '</p>\n          \n          <button class="button button--material" style="background-color:#ffdd00; color: #000" onclick="hideDialog(\'qrReturn\')">No</button>\n          <button class="button button--material" style="background-color:#ffdd00; color: #000" onclick="DiagnosePage()">Confirm</button>');
  }, function(error) {
    alert("Scanning failed: " + error);
  }, {
    preferFrontCamera: false, // iOS and Android
    showFlipCameraButton: false, // iOS and Android
    showTorchButton: false, // iOS and Android
    torchOn: false, // Android, launch with the torch switched on (if available)
    saveHistory: true, // Android, save scan history (default false)
    prompt: "Place a barcode inside the scan area", // Android
    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
    orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
    disableAnimations: true, // iOS
    disableSuccessBeep: false // iOS and Android
  });
}

function DiagnosePage() {
  hideDialog('qrReturn');

  document.querySelector('#navigator').pushPage("qrResult.html", { data: { title: 'Checklist' } });

  setTimeout(function() {
    /*    $("#qrResultWrapper").append(
          `<div style="text-align:center">
            <p>Please wait while your car is being diagnosed</p>
            <p>Select complete when everything is nice and ready</p>
            
            <button class="button button--material" style="background-color:#ffdd00; color:#000" onclick="UserChecklist()">Complete</button>
          </div>`*/
    $("#qrResultWrapper").append('<div style="text-align:center; color: #fff; font-size: 18px">\n          <p>Please wait while your car is being diagnosed.</p>\n          <p><ons-progress-circular indeterminate></ons-progress-circular></p>\n        </div>');
  }, 500);

  var initiateChecklist = setInterval(function() {
    $.ajax({
      url: sampleLink2 + 'ride/get_breakdownteam_Response.php',
      data: { helpdesk_id: sessionStorage.getItem("helpdesk_id") },
      method: "POST",
      success: function success(data) {

        var jData = JSON.parse(data);

        console.log('Status:' + jData[0].status);
        console.log(localStorage.getItem('breakdown_type'));

        if (jData[0].status == "10024") {
          console.log("checklist ready");
          clearInterval(initiateChecklist);
          setTimeout(function() {
            if (localStorage.getItem('breakdown_type') !== "B000000002") {
              UserChecklist();
            } else {
              ons.notification.toast({
                message: 'Job completed, proceed to ratings page',
                timeout: 2000
              });
              RatingPage();
            }
          }, 2000);
        }
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log('Error: ' + errorThrown);
        console.log('Error: ' + jqxhr.responseText);
      }
    });
  }, 4000);
}

/* const GetHelpdeskType = () => {

  let parameters = {
    helpdesk_id: sessionStorage.getItem(`helpdesk_id`),
    item_code: sessionStorage.getItem(`item_code`)
  };

  $.ajax({
    url: `${sampleLink2}ride/helpdesk/get_helpdesk_type.php`,
    data: parameters,
    method: "POST",
    success: data => {
      UserChecklist();
    },
    error: (jqxhr, status, errorThrown) => {
      console.log(`Error: ${errorThrown}`);
      console.log(`Error: ${jqxhr.responseText}`);
    }

  });
} */

var UserChecklist = function UserChecklist() {

  console.log(sessionStorage.getItem('helpdesk_id'));

  fn.load("checklist.html");

  $.ajax({
    url: sampleLink2 + 'link/breakdown/load_user_checklist.php',
    data: { helpdesk_id: sessionStorage.getItem('helpdesk_id') },
    method: "POST",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);

      var i = 0;

      $("#checklistWrapper").empty();

      $("#checklistTop").append('<p>Please confirm the issues rectified are as follows:</p>');

      if (data !== "null") {
        while (i < jData.length) {
          //  console.log(jData[i].name);
          //  $("#checklistWrapper").append('<p>' + jData[i].name + '\n                <span style="margin-left: 20%">RM' + jData[i].price + '</span>\n                <span style="margin-left: 20%">' + jData[i].checked + '</span>\n              </p>'
          /*`<tr>
              <td>${jData[i].price}</td>
              <td>${jData[i].checked}</td>
            </tr>`*/

          /*  $("#checklistWrapper").append(
              `<tr>
                  <td>${jData[i].name}</td>
                  <td>RM${jData[i].price}</td>
                  <td>${jData[i].checked}</td>
                </tr>`
            );*/

          $("#checklistWrapper").append("<tr>\n                  <td>" + jData[i].name + "</td>\n                  <td>RM" + jData[i].price + "</td>\n                  <td>" + jData[i].checked + "</td>\n                </tr>");

          i += 1;
        }

        $("#checklistButtons").append('<div style="text-align:center; margin-top: 5%; margin-bottom: 5%">\n            <button class="button button--material" style="background-color:#ffdd00; border-radius: 20px; color: #000" onclick="RatingPage()">Complete Job</button>\n          </div>');
      } else {
        $("#checklistTop").append('<p style="text-align:center">Your car appears to be fine</p>\n          <div style="text-align:center">\n            <button class="button button--material" style="background-color:#ffdd00; border-radius: 20px; color: #000" onclick="RatingPage()">Complete Job</button>\n          </div>');
      }

      /*  let i = 0;
         $("#checklistWrapper").append(
          `<p>Please confirm issues that are rectified</p>
          <p>Name: ${jData[i].name}</p>
          <p>Price: ${jData[i].price}</p>
          <p>Total Charges: ${jData[i].total_charges}</p>
          <p>Partner Charges: ${jData[i].partner_charges}</p>
          <p>Total Refund: ${jData[i].total_refund}</p>
          
          <button class="button button--material" onclick="RatingPage()">Complete Job</button>`
        );*/

      console.log($("#checklistWrapper").html());
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
};

var RatingPage = function RatingPage() {
  fn.load('rating.html');

  localStorage.removeItem('breakdown_type');

  setTimeout(function() {
    $("#ratingWrapper").append('<p>Please rate the workshop</p>\n  \n      <div class="stars">\n        <input class="star star-5" id="star-5" type="radio" name="star" value="5"/>\n        <label class="star star-5" for="star-5"></label>\n        <input class="star star-4" id="star-4" type="radio" name="star" value="4"/>\n        <label class="star star-4" for="star-4"></label>\n        <input class="star star-3" id="star-3" type="radio" name="star" value="3"/>\n        <label class="star star-3" for="star-3"></label>\n        <input class="star star-2" id="star-2" type="radio" name="star" value="2"/>\n        <label class="star star-2" for="star-2"></label>\n        <input class="star star-1" id="star-1" type="radio" name="star" value="1"/>\n        <label class="star star-1" for="star-1"></label>\n      </div>\n      \n      <div>\n        <label>Save As Favorite</label>\n        <input class="heart" id="heart" type="checkbox">\n        <label class="heart" for="heart"></label>\n      </div>\n  \n      <textarea id="comment" class="textarea" rows="3"></textarea>\n  \n      <button class="button button--material" style="background-color:#ffdd00; border-radius: 20px; min-width: 40%; max-width: 60%; color:#000" onclick="SavePartnerRating()">Finish</button>');
  }, 500);
};

var SaveUserFavoriteWorkshop = function SaveUserFavoriteWorkshop() {

  $.ajax({
    url: sampleLink2 + 'ride/save_user_favorite_workshop.php',
    data: { user_id: gUserId, partner_id: sessionStorage.getItem('partner_id'), type: '1' },
    method: "POST",
    success: function success(data) {
      console.log(data);
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
};

var SavePartnerRating = function SavePartnerRating() {

  console.log($("#star-5").val());

  if ($('input[id="star-1"]').is(':checked')) {
    sessionStorage.setItem('starRating', $("#star-1").val());
  } else if ($('input[id="star-2"]').is(':checked')) {
    sessionStorage.setItem('starRating', $("#star-2").val());
  } else if ($('input[id="star-3"]').is(':checked')) {
    sessionStorage.setItem('starRating', $("#star-3").val());
  } else if ($('input[id="star-4"]').is(':checked')) {
    sessionStorage.setItem('starRating', $("#star-4").val());
  } else if ($('input[id="star-5"]').is(':checked')) {
    sessionStorage.setItem('starRating', $("#star-5").val());
  }

  console.log(sessionStorage.getItem('starRating'));
  console.log($("#comment").val());

  var parameters = {
    partner_id: sessionStorage.getItem('partner_id'),
    comments: $("#comment").val(),
    rating: sessionStorage.getItem('starRating'),
    helpdesk_id: sessionStorage.getItem('helpdesk_id'),
    item_id: sessionStorage.getItem('item_id')
  };

  $.ajax({
    url: sampleLink2 + 'ride/rating_Partner/save_partner_rating.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      console.log(data);

      if ($('input[id="heart"]').is(':checked')) {
        SaveUserFavoriteWorkshop();
      }

      fn.reset("dashboard.html");
      //document.querySelector('#navigator').resetToPage('dashboard.html', { data: { title: 'Dashboard' } });
      //  fn.load("dashboard.html");
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
};

var UpdatePartnerJobStatus = function UpdatePartnerJobStatus() {

  var parameters = {
    ID: "",
    status: "",
    helpdesk_id: sessionStorage.getItem('helpdesk_id'),
    item_id: sessionStorage.getItem('item_id')
  };

  $.ajax({
    url: sampleLink2 + 'ride/update_partnerjob_status.php',
    data: parameters,
    method: "POST",
    success: function success(data) {},
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
};

function SelectFavShop() {
  document.getElementById("itemList").style.display = "none";

  showDialog('favShopDialog');
}

function DisplayItemList() {
  document.getElementById("itemList").style.display = "inline-block";
}

//ons-dialog for select favorite workshop
/*var showDialog = function(id) {
  document
    .getElementById(id)
    .show();
};*/

/*var hideDialog = function(id) {
  document
    .getElementById(id)
    .hide();
};*/
//end ons-dialog


function TyreBreakdown() {
  fn.load("tyreBreakdown.html");

  sessionStorage.setItem("bdownType", "1");
  CreateHelpdesk("1");
}

function BatteryBreakdown() {
  CreateHelpdesk("2");

  sessionStorage.setItem("bdownType", "2");
  fn.load("getBreakdownTeam.html");

  $("#modalContainer").empty();
  $("#modalContainer").append('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal = document.querySelector('ons-modal');
  modal.show();

  /*  document.addEventListener("show", () => {
      if (event.target.id === "getBreakdownTeam-page") {*/
  setTimeout(function() {
    BreakdownMap();
    LoadPcrTeam("battery", "98002");
  }, 500);
  /*    }
    })*/
}

function RedeemGift() {
  document.getElementById("giftPage").style.display = "inline-block";
  document.getElementById("servicePage").style.display = "none";
}

function RedeemService() {
  document.getElementById("giftPage").style.display = "none";
  document.getElementById("servicePage").style.display = "inline-block";
}

function InvoiceDetail(invoice_id) {

  fn.load("invoiceDetail.html");

  $.ajax({
    url: sampleLink2 + 'ride/user_invoice.php',
    data: { invoice_id: invoice_id },
    method: "POST",
    success: function success(data) {
      console.log(data);

      var jData = JSON.parse(data);

      //  var points = (parseFloat(jData[0].item_amt) - parseFloat(jData[0].deduct_amt)) / 10;

      //  console.log(points);

      //      $("#invoiceDetails").append('<label style="text-decoration:underline; font-weight: bold; font-size: 14px">Invoice ID: ' + invoice_id + '</label>\n        \n        <div id="invTopWrapper">\n          <table id="invDetail">\n            <tr>\n              <th>Qty</th>\n              <th>Description</th>\n              <th>Original Price</th>\n              <th>Discount</th>\n              <th>Actual Price</th>\n            </tr>\n            <tr>\n              <td></td>\n              <td>' + jData[0].name + '</td>\n              <td>RM ' + jData[0].item_amt + '</td>\n              <td>' + jData[0].deduct_amt + '</td>\n              <td>RM ' + jData[0].actual_amt + '</td>\n            </tr>\n          </table>\n        </div>\n\n        <table id="invPayment">\n          <tr>\n            <td>Coupon</td>\n            <td class="tdRight">' + jData[0].item_amt + '</td>\n          </tr>\n          <tr>\n            <td>Refund</td>\n            <td class="tdRight">RM 0</td>\n          </tr>\n          <tr>\n            <td>Item Price</td>\n            <td class="tdRight">RM ' + jData[0].actual_amt + '</td>\n          </tr>\n          <tr>\n            <td>Total Discount</td>\n            <td class="tdRight">' + jData[0].deduct_amt + '</td>\n          </tr>\n          <tr>\n            <td>Payment Price</td>\n            <td class="tdRight">RM ' + jData[0].total + '</td>\n          </tr>\n          <tr>\n            <td>Balance Voucher</td>\n            <td class="tdRight">RM ' + jData[0].ride_credit + '</td>\n          </tr>\n          <tr>\n            <td>ride Point earned</td>\n            <td class="tdRight">' + Math.round(points) + '</td>\n          </tr>\n        </table>\n\n        <div style="text-align:center">\n          <buton class="button button--material" id="checklistBtn">Checklist</buton>\n        </div>\n        ');

      var i = 0;
      var name;
      var item_amt;
      var deduct_amt;
      var actual_amt;
      var qty;
      //  var total_amt = 0.00;
      //  var total_deduct = 0.00;
      //  var total_discounted = 0.00;
      var total_amt;
      var balance_credit = jData[i].ride_credit;
      var points_earned;

      $("#invoiceDetails").append(`
        <label style="text-decoration:underline; font-weight: bold; font-size: 14px">Invoice ID: ${invoice_id}</label>
      `);

      while (i < jData.length) {
        name = jData[i].name;
        item_amt = jData[i].item_amt;
        deduct_amt = jData[i].deduct_amt;
        actual_amt = jData[i].actual_amt;
        total_amt = jData[i].total;
        points_earned = jData[i].ride_point;
        qty = jData[i].qty;

        $("#invTopWrapper #invDetail").append(`
          <tr>
            <td>${qty}</td>
            <td>${name}</td>
            <td>RM ${item_amt}</td>
          </tr>
        `);

        //  total_amt += parseFloat(item_amt);
        //  total_deduct += parseFloat(deduct_amt);

        i += 1;
      }

      /*  console.log(`Total amount: ${total_amt}`);
        console.log(`Total deduct: ${total_deduct}`);

        total_discounted = total_amt - total_deduct;*/

      $("#invPayment").append(`
        <tr>
          <td>Item Price</td>
          <td class="tdRight">RM ${actual_amt}</td>
        </tr>
        <tr>
          <td>Total Discount</td>
          <td class="tdRight">${deduct_amt}</td>
        </tr>
        <tr>
          <td>Payment Price</td>
          <td class="tdRight">RM ${total_amt}</td>
        </tr>
        <tr>
          <td>Balance Voucher</td>
          <td class="tdRight">RM ${balance_credit}</td>
        </tr>
        <tr>
          <td>ride Point earned</td>
          <td class="tdRight">${points_earned}</td>
        </tr>
      `);
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
}

//Google Maps Code
var gMaps;
var gLat;
var gLong;

function RequestLocation() {

  console.log("Request Location");

  cordova.plugins.locationAccuracy.canRequest(function(canRequest) {
    if (canRequest) {

      cordova.plugins.locationAccuracy.request(function(success) {

        //  alert("Successfully requested accuracy: " + success.message);
        console.log("Successfully requested accuracy: " + success.message);
      }, function(error) {

        //  alert("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
        console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);

        if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {

          if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {

            cordova.plugins.diagnostic.switchToLocationSettings();
          }
        }
      }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    }
  });
}

function FavWorkshopMap() {

  gMaps = new GMaps({
    div: '#map',
    lat: 4.210484,
    lng: 101.975766,
    mapTypeId: 'roadmap',
    disableDefaultUI: true
  });

  GeolocateMark();
}

function GeolocateMark() {

  console.log('GeolocateMark');

  GMaps.geolocate({
    success: function success(position) {
      gMaps.setCenter(position.coords.latitude, position.coords.longitude);
      gMaps.setZoom(12);

      gLat = position.coords.latitude;
      gLong = position.coords.longitude;

      MarkMe();
      //  console.log("geolocate");
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
}

var LocateFav = function LocateFav(wLat, wLng) {

  console.log('wLat ' + wLat + ', wLng ' + wLng);

  GMaps.geolocate({
    success: function success(position) {
      gMaps.setCenter(position.coords.latitude, position.coords.longitude);
      gMaps.setZoom(16);

      wLat = position.coords.latitude;
      wLng = position.coords.longitude;

      MarkFav(wLat, wLng);
    },
    error: function error(_error2) {
      ons.notification.toast({
        message: _error2.message,
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
};

function MarkMe() {
  //    console.log( "MarkMe" );

  gMaps.removeMarkers();

  gMaps.addMarker({
    lat: gLat,
    lng: gLong
      //  optimized: false
  });
}

var MarkFav = function MarkFav(wLat, wLng) {

  gMaps.removeMarkers();

  gMaps.addMarker({
    lat: wLat,
    lng: wLng
      //  optimized: false
  });
};

//BreakdownMap
function BreakdownMap() {

  gMaps = new GMaps({
    div: '#map',
    lat: 4.210484,
    lng: 101.975766,
    mapTypeId: 'roadmap',
    disableDefaultUI: true
  });

  GMaps.geolocate({
    success: function success(position) {
      gMaps.setCenter(position.coords.latitude, position.coords.longitude);
      gMaps.setZoom(12);

      gMaps.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        icon: 'img/blue-marker.png',
        optimized: false
      });
    },
    error: function error(_error3) {
      ons.notification.toast({
        message: "Geolocation failed: " + _error3.message,
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
}

function Geolocate() {

  console.log('Geolocate');

  GMaps.geolocate({
    success: function success(position) {

      gLat = position.coords.latitude;
      gLong = position.coords.longitude;

      console.log('Latitude: ' + gLat + ', Longitude ' + gLong);
    },
    error: function error(_error4) {
      ons.notification.toast({
        message: "Geolocation failed: " + _error4.message,
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
}

//Initiate partner location interval
var initiatePartnerLoc = void 0;

//partner location interval
//let getPartnerLoc;

function PartnerMap() {

  var index = localStorage.getItem('index');

  //console.log(sessionStorage.getItem(`partner_id${index}`));

  gMaps = new GMaps({
    div: '#partnerMap',
    lat: 4.210484,
    lng: 101.975766,
    mapTypeId: 'roadmap',
    disableDefaultUI: true
  });

  initiatePartnerLoc = setInterval(function() {
    $.ajax({
      url: sampleLink2 + 'link/breakdown/get_partnervehicle_location.php',
      data: { helpdesk_id: sessionStorage.getItem('helpdesk_id') },
      method: "POST",
      success: function success(data) {

        var jData = JSON.parse(data);

        //  initiatePartnerLoc = setInterval(() => {

        console.log(data);

        GMaps.geolocate({
          success: function success() {
            gMaps.setCenter(jData[0].latitude, jData[0].longitude);
            gMaps.setZoom(16);

            //  console.log(sessionStorage.getItem(`helpdesk_id`));
          },
          error: function error(_error5) {
            ons.notification.toast({
              message: "Geolocation failed: " + _error5.message,
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

        //initiatePartnerLoc = setInterval(() => {

        gMaps.removeMarkers();

        gMaps.addMarker({
          lat: jData[0].latitude,
          lng: jData[0].longitude,
          icon: 'img/blue-marker.png',
          optimized: false
        });

        console.log("partnermap");

        $.ajax({
          url: sampleLink2 + 'ride/get_breakdownteam_Response.php',
          data: { helpdesk_id: sessionStorage.getItem("helpdesk_id") },
          method: "POST",
          success: function success(data) {

            var jData = JSON.parse(data);

            console.log("Status: " + jData[0].status);

            if (jData[0].status == "10007") {
              clearInterval(initiatePartnerLoc);
              ons.notification.toast({
                message: 'Partner arrived, initiating QR',
                timeout: 1000
              });

              setTimeout(function() {
                scan();
              }, 1500);
            }
          },
          error: function error(jqxhr, status, errorThrown) {
            console.log('Error: ' + errorThrown);
            console.log('Error: ' + jqxhr.responseText);
          }
        });
        //  }

        //  }, 2000);

        /*    $("#partnerLocWrapper").append(
              `<button class="button button--material" onclick="clearInterval(initiatePartnerLoc); scan()">Confirm Partner Arrival</button>`
            );*/
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log('Error: ' + errorThrown);
        console.log('Error: ' + jqxhr.responseText);
      }
    });
  }, 7000);
  /*
    $("#partnerLocWrapper").append(
      `<div style="text-align:center">
        <button class="button button--material" onclick="clearInterval(initiatePartnerLoc); scan()">Confirm Partner Arrival</button>
      </div>`
    );*/
}

//test QR
/*function scan() {
  cordova.plugins.barcodeScanner.scan(
    function(result) {
      if (!result.cancelled) {
        if (result.format == "QR_CODE") {
          navigator.notification.prompt("Please enter name of data", function(input) {
            var name = input.input1;
            var value = result.text;

            var data = localStorage.getItem("LocalData");
            console.log(data);
            data = JSON.parse(data);
            data[data.length] = [name, value];

            localStorage.setItem("LocalData", JSON.stringify(data));

            alert("Done");
            console.log(localStorage.getItem("LocalData"));
          });
        }
      }
    },
    function(error) {
      alert("Scanning failed: " + error);
    }
  );
}*/

/*Cart*/

function LoadCart() {
  //  alert("helpdesk : " + user_id);
  //  $("#span_ids").text(" Loading....Please Wait...");

  //  console.log(localStorage.getItem(`cartHelpdesk`));

  modal = document.querySelector('ons-modal');

  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon>');

  modal.show();
  $.ajax({
    url: "http://www.website.com/link/purchase/load_page_7.php",
    method: "POST",
    data: {
      helpdesk: sessionStorage.getItem('cartHelpdesk'),
      option: '1',
      user: gUserId
    },
    success: function success(data) {
      //   alert(data);
      //  console.log(data);
      document.getElementById("purchase_page_7_1").innerHTML = data;
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);

      ons.notification.alert({
        title: "Connection issue",
        message: "There seems to be a network disruption, please try again",
        cancelable: false
      });

      modal.hide();
      fn.pop();
    },
    timeout: 4000
  });

  $.ajax({
    url: "http://www.website.com/link/purchase/load_page_7.php",
    method: "POST",
    data: {
      helpdesk: sessionStorage.getItem('cartHelpdesk'),
      option: '2',
      user: gUserId
    },
    success: function success(data) {
      document.getElementById("purchase_page_7_2").innerHTML = data;
      modal.hide();
    },
    error: function(jqxhr, status, errorThrown) {
      console.log("Error: " + errorThrown);
      console.log("Error: " + jqxhr.responseText);
    },
    timeout: 4000
  });
}

/*function save_cart() {
  $.ajax({
    url: "http://www.website.com/link/purchase/add_to_cart.php",
    method: "POST",
    data: {
      helpdesk_id: sessionStorage.getItem(`helpdesk_id`),
      item_code: sessionStorage.getItem(`breakdown_type`),
      user_id: gUserId,
      car_id: sessionStorage.getItem(`carplate`),
      qty: "1"

    },
    success: function(data) {
      // document.getElementById("dialog-1").show();
      //   showDialog("dialog-1");

      load_page7();
    }
  });
  //  fromTemplate();
  showModal('2');
  //  carousel.prev();
}*/

var verifyTerms = function verifyTerms() {
  if ($('input[name="agree"]').is(':checked')) {
    fn.replace('register.html');
  } else {
    ons.notification.toast({
      message: 'You have to agree to the terms and conditions',
      timeout: 1000
    });
  }
};

var updateUserWallet = function updateUserWallet() {

  var transactionResult = JSON.parse(sessionStorage.getItem('transactionResult'));
  console.log(transactionResult.channel);
  //  alert(transactionResult.channel);
  //  alert(transactionResult.amount);

  var parameters = {
    user_id: gUserId,
    helpdesk_id: "HD1234",
    topup_list: sessionStorage.getItem('topUpConcatenate'),
    credit_card_num: '',
    bank: transactionResult.channel,
    payment: transactionResult.amount,
    bank_trans_id: '',
    bank_approval_code: '',
    payment_status: transactionResult.status_code
  };

  $.ajax({
    url: sampleLink2 + 'ride/update_user_topup_payment.php',
    data: parameters,
    method: "POST",
    success: function success(data) {
      console.log(data);
      getTopUp();
    },
    error: function error(jqxhr, status, errorThrown) {
      console.log('Error: ' + errorThrown);
      console.log('Error: ' + jqxhr.responseText);
    }
  });
};

var loadCustomerCredit = function loadCustomerCredit(helpdesk, price) {
  $.ajax({
    url: sampleLink2 + "ride/load_customer_credit.php",
    data: { user_id: gUserId },
    method: "POST",
    success: function success(data) {

      console.log(data);

      var jData = JSON.parse(data);

      var i = 0;

      sessionStorage.setItem('balance_amt', jData[i].balance_amt);
      sessionStorage.setItem('ride_point', jData[0].ride_point);

      purchase_order(helpdesk, price);
    }
  });
};

function purchase_order(helpdesk, price) {

  console.log(helpdesk);
  console.log(price);
  console.log(sessionStorage.getItem('balance_amt'));
  console.log(sessionStorage.getItem('ride_point'));

  console.log(Math.round(price));

  if (parseFloat(sessionStorage.getItem('balance_amt')) > price) {

    var parameters = {
      user_id: gUserId,
      helpdesk_id: helpdesk,
      partner_id: "",
      item_id: "",
      payment: price,
      coupon_id: "",
      deduct_amount: "",
      deduct_percent: "",
      deduct_cash: "",
      balance: sessionStorage.getItem('balance_amt'),
      points: Math.round(price)
    };

    $.ajax({
      url: sampleLink2 + 'ride/purchase/purchase_payment.php',
      data: parameters,
      method: "POST",
      success: function success(data) {
        console.log(data);

        $.post(sampleLink2 + 'link/purchase/place_order.php', {
          helpdesk: helpdesk_id
        }, function(data) {
          console.log("Helpdesk ID Place Order: " + helpdesk_id);

          $.ajax({
            url: sampleLink2 + "ride/load_customer_credit.php",
            data: { user_id: gUserId },
            method: "POST",
            success: function success(data) {
              var jData = JSON.parse(data);

              var i = 0;

              ons.notification.alert({
                title: "Transaction Complete",
                message: "Purchase successful. Your balance is RM" + jData[i].balance_amt + ". Please proceed to set your schedule",
                cancelable: false
              });

              //  load_page7();
              fn.reset("dashboard.html");
              //  fn.reset("schedule.html");
              modal.hide();
            }
          });
        });
      },
      error: function error(jqxhr, status, errorThrown) {
        console.log('Error: ' + errorThrown);
        console.log('Error: ' + jqxhr.responseText);
      }
    });
  } else {
    ons.notification.alert({
      title: "Not enough voucher amount",
      message: "You do not have enough voucher amount, please proceed to buy voucher",
      cancelable: false
    });

    fn.load("topUp.html");
  }
}

function removeHelpdeskStorage() {
  //  console.log("removeHelpdeskStorage");
  sessionStorage.removeItem('helpdesk_id');
  localStorage.removeItem('helpdesk_id');
}

function breakdownBackButton() {
  UserCancelledOrder();
  setTimeout(function() { removeHelpdeskStorage(); }, 500);
  removeListener();
}

function removeListener() {
  document.removeEventListener("backbutton", breakdownBackButton);
}

function test() {
  alert("CLOSE");
}