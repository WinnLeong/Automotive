'use strict';

document.addEventListener('show', function(event) {

  if (event.target.id === "ride_reward") {

    //  var modal = document.querySelector('ons-modal');
    var i = 3;

    //  $("#modalContainer").html('<ons-icon icon="md-spinner" size="28px" spin></ons-icon> Page is under construction');
    //  modal.show();

    /*  var rewardConstruction = setInterval(function() {
        i -= 1;

        //  $("#modalContainer").html(`<ons-icon icon="md-spinner" size="28px" spin></ons-icon> Page is under construction ${i}`);

        if (i === 0) {
          clearInterval(rewardConstruction);
          modal.hide();
          fn.pop();
        }
      }, 1000);*/
    //  callingphp("44002", "1");
  }
});

var visibleGift = function visibleGift() {
  document.getElementById('div_gift').style.display = 'block'; // Hide
  document.getElementById('div_voucher').style.display = 'none';
  callingphp("44002", "1");
};

var visibleVoucher = function visibleVoucher() {
  document.getElementById('div_gift').style.display = 'none'; // Hide
  document.getElementById('div_voucher').style.display = 'block';
  callingphp("47100", "2");
};

var dialog = function dialog(target, price) {
  if (confirm("Are you sure u wan to select this : " + target + "?") == true) {
    txt = "You pressed OK!";
    alert("deduct : " + price);
  } else {
    txt = "You pressed Cancel!";
  }

  console.log(txt);
};

var deductReward = function deductReward(page, row) {
  if (page == '1') {
    var name = sessionStorage.getItem("name" + row);
    var price = sessionStorage.getItem("price" + row);
    console.log(name + " : " + price);
    dialog(name, price);
  } else if (page == '2') {
    var name = sessionStorage.getItem("name" + row);
    var price = sessionStorage.getItem("price" + row);
    console.log(name + " : " + price);
    dialog(name, price);
    //document.getElementById("DeductButton_gift").disabled = true;
  }
};

var callingphp = function callingphp(type, page) {
  var point = document.getElementById('tx_ridepoint');
  var text = point.innerText || point.textContent;

  //console.log(text);

  var modal = document.querySelector('ons-modal');
  modal.show();

  var obj;
  var pages = page;

  if (page == '1') {
    $("#table_gift").empty();
    pages = "#table_gift";
  } else if (page == '2') {
    $("#table_voucher").empty();
    pages = "#table_voucher";
  }

  $.ajax({
    url: "http://www.samplelink.com/ride/testing.php",
    data: { type: type },
    method: "POST",
    success: function success(msg) {
      //alert( "Data Saved: " + msg );

      obj = JSON.parse(msg);
      var i = 0;

      if (obj != null && obj.length > 0) {
        while (i < obj.length) {
          if (page == '1') {
            // $("#no_item").hide();
            if (parseFloat(obj[i].display_sales_price) > parseFloat(text)) {
              $(pages).append('<tr>\n                                 <td class="title_name" style=" width:48%; color:#000 ; text-align:left">' + obj[i].name + '</td>\n                                    // eval(\'tx_title\' + i);\n                                         <td style=" width:20%; text-align:right">\n                                             <div class="title_price" >' + obj[i].display_sales_price + ' PT</div>\n                                           \n                                         </td>\n                                         <td style="color:#000 ; text-align:right">        \n                                            \n                                             <button class="redeem_disable" style="width:100px; text-align:center; font-size:15px" onclick="deductReward(' + page + ',' + i + ')" disabled>REDEEM</button>\n                                         </td>\n                                         </tr>');
              //console.log("TextBox_gift"+i);
              // <input type="Button" class="redeem_disable" style="width:100px; text-align:center; font-size:15px" value="REDEEM" disabled/>
            } else {
              $(pages).append('<tr>\n                                 <td class="title_name" style=" width:48%; color:#000 ; text-align:left">' + obj[i].name + '</td>\n                                    // eval(\'tx_title\' + i);\n                                         <td style=" width:20%; text-align:right">\n                                             <div class="title_price" >' + obj[i].display_sales_price + ' PT</div>\n                                           \n                                         </td>\n                                         <td style="color:#000 ; text-align:right">        \n                                           \n                                             <button class="redeem" style="width:100px; text-align:center; font-size:15px" onclick="deductReward(' + page + ',' + i + ')">REDEEM</button>\n                                         </td>\n                                         </tr>');
              //console.log("TextBox_gift"+i);
            }
            //<input type="Button" class="redeem" style="width:100px; text-align:center; font-size:15px" onclick="deductReward(${page},${i})" value="REDEEM"/>
          } else if (page == '2') {
            // $("#no_item").hide();
            if (parseFloat(obj[i].display_sales_price) > parseFloat(text)) {
              $(pages).append('<tr>\n                                     <td class="title_name" style=" width:48%; color:#000 ; text-align:left">' + obj[i].name + '</td>\n                                         <td style=" width:20%; text-align:right">\n                                             <div class="title_price" >' + obj[i].display_sales_price + ' PT</div>\n                                        \n                                         </td>\n                                         <td style="color:#000 ; text-align:right">        \n                                             <button class="redeem_disable" style="width:100px; text-align:center; font-size:15px" onclick="deductReward(' + page + ',' + i + ')" disabled>REDEEM</button>  \n                                         </td>\n                                         </tr>');
            } else {
              $(pages).append('<tr>\n                                     <td class="title_name" style=" width:48%; color:#000 ; text-align:left">' + obj[i].name + '</td>\n                                         <td style=" width:20%; text-align:right">\n                                             <div class="title_price" >' + obj[i].display_sales_price + ' PT</div>\n                                        \n                                         </td>\n                                         <td style="color:#000 ; text-align:right">        \n                                             <button class="redeem" style="width:100px; text-align:center; font-size:15px" onclick="deductReward(' + page + ',' + i + ')">REDEEM</button>   \n                                         </td>\n                                         </tr>');
            }
          }

          sessionStorage.setItem('name' + i, obj[i].name);
          sessionStorage.setItem('price' + i, obj[i].display_sales_price);

          i += 1;
        }
      }
    }
  });
  modal.hide();
};

ons.ready(function() {
  /*  var pullHook = document.getElementById('pull-hook');
     pullHook.addEventListener('changestate', function(event) {
      var message = '';
       switch (event.state) {
        case 'initial':
          message = 'Pull to refresh';
          break;
        case 'preaction':
          message = 'Release';
          break;
        case 'action':
          message = 'Loading...';
          break;
      }
       pullHook.innerHTML = message;
    });
     pullHook.onAction = function(done) {
      setTimeout(done, 1000);
    };*/

});