// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

document.addEventListener('deviceready', function() {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  //  window.plugins.OneSignal.setLogLevel(OneSignal.LOG_LEVEL.DEBUG, OneSignal.LOG_LEVEL.DEBUG);

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    //  localStorage.setItem(`oneSignal`, JSON.stringify(jsonData));

  };

  var getUserId = function(userId) {
    console.log(JSON.stringify(userId));
    localStorage.setItem("playerId", userId);
  };

  window.plugins.OneSignal
    .startInit("e2b54a1a-3ce2-4d2d-a73f-4e8322c050c2")
    .handleNotificationOpened(notificationOpenedCallback)
    .getIds(getUserId);
  //  .endInit();

  window.plugins.OneSignal
    .endInit();

  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);