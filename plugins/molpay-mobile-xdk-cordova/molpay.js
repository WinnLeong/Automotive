var _0x2b7e=['module_id','closeMolpay','closemolpay','testMerchantCredentials','body','testMerchantChannels','open','InAppBrowser','prototype','remove','parentElement','removeChild','length','molpay-mobile-xdk-www/index.html','mptransactionresults://','mpcloseallwindows://','mppinstructioncapture://','MOLPay/result.php','MOLPay/nbepay.php','\x22msgType\x22:\x22B4\x22','visibility','hidden','style','position','absolute','width','0px','height','visible','100%','<iframe','exec','index','match','substring','test','parse','transactionRequestWithTransactionId','data:text/html;base64,','_blank','location=no,hardwareback=no,disallowoverscroll=yes,toolbarposition=top,transitionstyle=crossdissolve','transactionRequest','removeEventListener','exit','addEventListener','url','executeScript','window.close\x20=\x20function\x20()\x20{\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20window.location.assign(window.location);\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20};','contentWindow','nativeWebRequestUrlUpdates','document.body.innerHTML','loadstart','close','plugins','showWithOptions','bottom','toast','permissions','requestPermission','WRITE_EXTERNAL_STORAGE','hasPermission','indexOf','replace','atob','stringify','base64ImageUrlData','filename','imageSaver','saveBase64Image','innerHTML','startMolpay','wrapper_version','getElementById','molpay','padding','border','createElement','iframe','updateSdkData','load','mainUiFrame','allowScriptAccess','always','setAttribute','src','appendChild'];(function(_0x2aecb2,_0x343312){var _0x3ebb80=function(_0x19fab3){while(--_0x19fab3){_0x2aecb2['push'](_0x2aecb2['shift']());}};_0x3ebb80(++_0x343312);}(_0x2b7e,0x1b4));var _0xe2b7=function(_0x9a9cf1,_0x3d93c8){_0x9a9cf1=_0x9a9cf1-0x0;var _0x240815=_0x2b7e[_0x9a9cf1];return _0x240815;};function MOLPay(){window[_0xe2b7('0x0')]=cordova[_0xe2b7('0x1')][_0xe2b7('0x0')];}Element[_0xe2b7('0x2')][_0xe2b7('0x3')]=function(){this[_0xe2b7('0x4')][_0xe2b7('0x5')](this);},NodeList[_0xe2b7('0x2')][_0xe2b7('0x3')]=HTMLCollection['prototype'][_0xe2b7('0x3')]=function(){for(var _0x1a12ec=this[_0xe2b7('0x6')]-0x1;_0x1a12ec>=0x0;_0x1a12ec--)this[_0x1a12ec]&&this[_0x1a12ec]['parentElement']&&this[_0x1a12ec][_0xe2b7('0x4')]['removeChild'](this[_0x1a12ec]);};var isInternalDebugging=!0x1,moduleId='molpay-mobile-xdk-cordova',wrapperVersion='0',molpaySdkUrl=_0xe2b7('0x7'),mpopenmolpaywindow='mpopenmolpaywindow://',mptransactionresults=_0xe2b7('0x8'),mprunscriptonpopup='mprunscriptonpopup://',mpcloseallwindows=_0xe2b7('0x9'),mppinstructioncapture=_0xe2b7('0xa'),molpayresulturl=_0xe2b7('0xb'),molpaynbepayurl=_0xe2b7('0xc'),b4results=_0xe2b7('0xd'),c6results='\x22msgType\x22:\x22C6\x22',molpayPaymentDetails,transactionResultCallback,molpayDiv,mainUiFrame,bankUiWindow,molpayTransactionRequestFrame,isClosingMolpay=!0x1,hideFrame=function(_0x170d5c){_0x170d5c['style'][_0xe2b7('0xe')]=_0xe2b7('0xf'),_0x170d5c[_0xe2b7('0x10')][_0xe2b7('0x11')]=_0xe2b7('0x12'),_0x170d5c[_0xe2b7('0x10')][_0xe2b7('0x13')]=_0xe2b7('0x14'),_0x170d5c[_0xe2b7('0x10')][_0xe2b7('0x15')]=_0xe2b7('0x14');},showFrame=function(_0x12c6d8){_0x12c6d8['style'][_0xe2b7('0xe')]=_0xe2b7('0x16'),_0x12c6d8[_0xe2b7('0x10')][_0xe2b7('0x11')]='absolute',_0x12c6d8[_0xe2b7('0x10')][_0xe2b7('0x13')]=_0xe2b7('0x17'),_0x12c6d8[_0xe2b7('0x10')][_0xe2b7('0x15')]=_0xe2b7('0x17');},postMolpayResultHandler=function(_0x384553){var _0x3638d5=_0x384553;if(_0x3638d5){var _0x546ad0=new RegExp(_0xe2b7('0x18')),_0x3ffd5c=_0x546ad0[_0xe2b7('0x19')](_0x3638d5);_0x3ffd5c&&(_0x3638d5=_0x3638d5['slice'](0x0,_0x3ffd5c[_0xe2b7('0x1a')]));var _0x251706=function(_0x156480){var _0x4834c7,_0xbca3f9,_0x296a0f=_0x156480,_0x480dc4=new RegExp('<','g'),_0x47791a=new RegExp('<'),_0x37c5b0=new RegExp('>'),_0x4af1af=_0x296a0f[_0xe2b7('0x1b')](_0x480dc4);if(_0x296a0f&&_0x4af1af&&_0x47791a[_0xe2b7('0x19')](_0x296a0f)&&_0x37c5b0[_0xe2b7('0x19')](_0x296a0f))for(var _0x3b01d8=_0x4af1af[_0xe2b7('0x6')]-0x1;_0x3b01d8>=0x0;_0x3b01d8--)_0x4834c7=_0x47791a[_0xe2b7('0x19')](_0x296a0f)[_0xe2b7('0x1a')],_0xbca3f9=_0x37c5b0[_0xe2b7('0x19')](_0x296a0f)[_0xe2b7('0x1a')],_0x296a0f=_0x296a0f[_0xe2b7('0x1c')](0x0,_0x4834c7)+''+_0x296a0f[_0xe2b7('0x1c')](_0xbca3f9+0x1);return _0x296a0f;};_0x3638d5=_0x251706(_0x3638d5);var _0x95e65c,_0x421eca;if(_0x95e65c=new RegExp(b4results),_0x95e65c[_0xe2b7('0x1d')](_0x3638d5)&&(_0x421eca=JSON[_0xe2b7('0x1e')](_0x3638d5))){var _0x44c6b9=_0x421eca['tranID'];_0x44c6b9&&mainUiFrame['contentWindow'][_0xe2b7('0x1f')](_0x44c6b9);}}},isBankUiWindowClosedByCloseWindowEvent=!0x1,createBankUiWindow=function(_0x4e3f7b){var _0x34ed7a=_0xe2b7('0x20')+_0x4e3f7b;bankUiWindow=window[_0xe2b7('0x0')](_0x34ed7a,_0xe2b7('0x21'),_0xe2b7('0x22'));var _0xadebfc=function(_0x4d5923){isBankUiWindowClosedByCloseWindowEvent||mainUiFrame['contentWindow'][_0xe2b7('0x23')](),bankUiWindow[_0xe2b7('0x24')](_0xe2b7('0x25'),_0xadebfc);};bankUiWindow[_0xe2b7('0x26')]('exit',_0xadebfc);var _0x14cf03=function(_0x2280ab){var _0x48721d;_0x48721d=new RegExp(molpaynbepayurl),_0x2280ab&&_0x48721d['test'](_0x2280ab[_0xe2b7('0x27')])&&(bankUiWindow[_0xe2b7('0x28')]({'code':'window.open\x20=\x20function\x20(open)\x20{\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20function\x20(url,\x20name,\x20features)\x20{\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20window.location\x20=\x20url\x20;\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20window;\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20};\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20(window.open);'},function(_0x43842e){}),bankUiWindow[_0xe2b7('0x28')]({'code':_0xe2b7('0x29')},function(_0x4f1c06){}));};bankUiWindow[_0xe2b7('0x26')]('loadstop',_0x14cf03);var _0x52c33e=function(_0x3419ba){var _0x5ac62f;if(mainUiFrame[_0xe2b7('0x2a')][_0xe2b7('0x2b')]({'requestPath':_0x3419ba[_0xe2b7('0x27')]}),_0x5ac62f=new RegExp(molpaynbepayurl),_0x3419ba&&_0x5ac62f[_0xe2b7('0x1d')](_0x3419ba['url']))var _0x192a6e=0xa,_0x4fe1b6=0x0,_0x446423=setInterval(function(){_0x1d75ae();},0x3e8),_0x1d75ae=function(){_0x4fe1b6++,_0x4fe1b6>_0x192a6e?clearInterval(_0x446423):bankUiWindow[_0xe2b7('0x28')]({'code':_0xe2b7('0x2c')},function(_0x14ca0e){var _0x945ff5=_0x14ca0e[0x0],_0x291ef5=new RegExp(b4results);_0x291ef5[_0xe2b7('0x1d')](_0x945ff5)&&(postMolpayResultHandler(_0x945ff5),bankUiWindow['removeEventListener'](_0xe2b7('0x2d'),_0x52c33e),bankUiWindow[_0xe2b7('0x2e')](),clearInterval(_0x446423));});};};bankUiWindow[_0xe2b7('0x26')](_0xe2b7('0x2d'),_0x52c33e);},inAppCallback=function(_0x56fa12){function _0x8861bf(){window[_0xe2b7('0x2f')]['toast'][_0xe2b7('0x30')]({'message':'Image\x20saved\x20success!','duration':0x3e8,'position':_0xe2b7('0x31')});}function _0x5be330(){window['plugins'][_0xe2b7('0x32')]['showWithOptions']({'message':'Image\x20saved\x20fail!','duration':0x3e8,'position':_0xe2b7('0x31')});}function _0x3a3b70(){var _0x56fa12=cordova[_0xe2b7('0x2f')][_0xe2b7('0x33')];_0x5be330();var _0x1d8d36=function(){_0x5be330();};_0x56fa12[_0xe2b7('0x34')](_0x56fa12[_0xe2b7('0x35')],function(_0x15d884){_0x15d884[_0xe2b7('0x36')]?_0x3efedb():_0x1d8d36();},_0x1d8d36);}var _0x4fae5e,_0x2b0bd0;if(_0x56fa12&&_0x56fa12[_0xe2b7('0x37')](mpopenmolpaywindow)>-0x1)_0x2b0bd0=new RegExp(mpopenmolpaywindow,'g'),_0x4fae5e=_0x56fa12['replace'](_0x2b0bd0,''),_0x4fae5e&&_0x4fae5e['length']>0x0&&createBankUiWindow(_0x4fae5e);else if(_0x56fa12&&_0x56fa12['indexOf'](mpcloseallwindows)>-0x1)isBankUiWindowClosedByCloseWindowEvent=!0x0,bankUiWindow[_0xe2b7('0x2e')]();else if(_0x56fa12&&_0x56fa12[_0xe2b7('0x37')](mptransactionresults)>-0x1){if(_0x2b0bd0=new RegExp(mptransactionresults,'g'),_0x4fae5e=_0x56fa12[_0xe2b7('0x38')](_0x2b0bd0,''),_0x4fae5e&&_0x4fae5e['length']>0x0){var _0xd684aa=window[_0xe2b7('0x39')](_0x4fae5e),_0xa40fc6=JSON[_0xe2b7('0x3a')](JSON[_0xe2b7('0x1e')](_0xd684aa));transactionResultCallback(_0xa40fc6),isClosingMolpay&&(molpayDiv['innerHTML']='',isClosingMolpay=!0x1),molpayTransactionRequestFrame&&molpayTransactionRequestFrame[_0xe2b7('0x3')]();}}else if(_0x56fa12&&_0x56fa12['indexOf'](mppinstructioncapture)>-0x1){_0x2b0bd0=new RegExp(mppinstructioncapture,'g'),_0x4fae5e=_0x56fa12[_0xe2b7('0x38')](_0x2b0bd0,'');var _0x22fe4c=JSON[_0xe2b7('0x1e')](atob(_0x4fae5e)),_0x3b9827={'data':_0x22fe4c[_0xe2b7('0x3b')],'prefix':_0x22fe4c[_0xe2b7('0x3c')],'format':'PNG','quality':0x64,'mediaScanner':!0x0};window[_0xe2b7('0x3d')]['saveBase64Image'](_0x3b9827,function(_0x19ae9f){_0x8861bf();},_0x3a3b70);var _0x3efedb=function(){window[_0xe2b7('0x3d')][_0xe2b7('0x3e')](_0x3b9827,function(_0x117497){_0x8861bf();},function(_0x57afe3){_0x5be330();});};}if(_0x56fa12&&_0x56fa12['indexOf'](mprunscriptonpopup)>-0x1&&(_0x2b0bd0=new RegExp(mprunscriptonpopup,'g'),_0x4fae5e=_0x56fa12['replace'](_0x2b0bd0,''),_0x4fae5e&&_0x4fae5e[_0xe2b7('0x6')]>0x0)){var _0x6462c2=window[_0xe2b7('0x39')](_0x4fae5e);bankUiWindow[_0xe2b7('0x28')]({'code':_0x6462c2},function(_0x55833d){});}},molpayCredentialsRequestFrame,testMerchantCredentialsCallback,onTestMerchantCredentialsDone=function(_0x2772a7,_0x5bb60a){testMerchantCredentialsCallback(_0x2772a7,_0x5bb60a),isClosingMolpay&&(molpayDiv[_0xe2b7('0x3f')]='',isClosingMolpay=!0x1),molpayCredentialsRequestFrame&&molpayCredentialsRequestFrame[_0xe2b7('0x3')]();},molpayChannelsRequestFrame,testMerchantChannelsCallback,onTestMerchantChannelsDone=function(_0x9297f4,_0xba0b76){testMerchantChannelsCallback&&testMerchantChannelsCallback(_0x9297f4,_0xba0b76),isClosingMolpay&&(molpayDiv[_0xe2b7('0x3f')]='',isClosingMolpay=!0x1),molpayChannelsRequestFrame&&molpayChannelsRequestFrame['remove']();},exec=require('cordova/exec');MOLPay[_0xe2b7('0x2')][_0xe2b7('0x40')]=function(_0x4d38d4,_0x4d4dab){isClosingMolpay=!0x1;try{molpayPaymentDetails=JSON[_0xe2b7('0x1e')](_0x4d38d4);}catch(_0x50a5bd){molpayPaymentDetails=_0x4d38d4;}molpayPaymentDetails['module_id']=moduleId,molpayPaymentDetails[_0xe2b7('0x41')]=wrapperVersion,transactionResultCallback=_0x4d4dab,molpayDiv=document[_0xe2b7('0x42')](_0xe2b7('0x43')),molpayDiv[_0xe2b7('0x10')][_0xe2b7('0x13')]=_0xe2b7('0x17'),molpayDiv[_0xe2b7('0x10')][_0xe2b7('0x44')]=_0xe2b7('0x14'),molpayDiv['style'][_0xe2b7('0x45')]=_0xe2b7('0x14'),mainUiFrame=document[_0xe2b7('0x46')](_0xe2b7('0x47'));var _0x1e1921=function(_0x4ae895){mainUiFrame['contentWindow'][_0xe2b7('0x48')](JSON[_0xe2b7('0x3a')](molpayPaymentDetails),inAppCallback),mainUiFrame['removeEventListener'](_0xe2b7('0x49'),_0x1e1921);};mainUiFrame[_0xe2b7('0x10')][_0xe2b7('0x45')]='0px',mainUiFrame[_0xe2b7('0x10')]['padding']='0px',mainUiFrame[_0xe2b7('0x10')][_0xe2b7('0x13')]='100%',mainUiFrame['style'][_0xe2b7('0x15')]='100%',mainUiFrame['id']=_0xe2b7('0x4a'),mainUiFrame[_0xe2b7('0x4b')]=_0xe2b7('0x4c'),mainUiFrame[_0xe2b7('0x4d')](_0xe2b7('0x4e'),molpaySdkUrl),molpayDiv[_0xe2b7('0x4f')](mainUiFrame),mainUiFrame[_0xe2b7('0x26')](_0xe2b7('0x49'),_0x1e1921);},MOLPay[_0xe2b7('0x2')][_0xe2b7('0x23')]=function(_0x23c37e,_0x21225e){try{molpayPaymentDetails=JSON[_0xe2b7('0x1e')](_0x23c37e);}catch(_0x1b8c2a){molpayPaymentDetails=_0x23c37e;}molpayPaymentDetails[_0xe2b7('0x50')]=moduleId,molpayPaymentDetails[_0xe2b7('0x41')]=wrapperVersion,transactionResultCallback=_0x21225e,molpayTransactionRequestFrame=document[_0xe2b7('0x46')](_0xe2b7('0x47'));var _0x495ef4=function(_0x425deb){molpayTransactionRequestFrame[_0xe2b7('0x2a')][_0xe2b7('0x48')](molpayPaymentDetails,inAppCallback),molpayTransactionRequestFrame[_0xe2b7('0x24')](_0xe2b7('0x49'),_0x495ef4);};molpayTransactionRequestFrame['id']='molpayTransactionRequestFrame',molpayTransactionRequestFrame[_0xe2b7('0x4b')]=_0xe2b7('0x4c'),molpayTransactionRequestFrame['setAttribute'](_0xe2b7('0x4e'),molpaySdkUrl),hideFrame(molpayTransactionRequestFrame),document['body']['appendChild'](molpayTransactionRequestFrame),molpayTransactionRequestFrame['addEventListener'](_0xe2b7('0x49'),_0x495ef4);},MOLPay[_0xe2b7('0x2')][_0xe2b7('0x51')]=function(){mainUiFrame[_0xe2b7('0x2a')][_0xe2b7('0x52')]();},MOLPay[_0xe2b7('0x2')][_0xe2b7('0x53')]=function(_0x28c32f,_0x3235f4){_0x3235f4&&(testMerchantCredentialsCallback=_0x3235f4),molpayCredentialsRequestFrame=document[_0xe2b7('0x46')](_0xe2b7('0x47'));var _0x5369e6=function(_0x55f610){molpayCredentialsRequestFrame[_0xe2b7('0x2a')][_0xe2b7('0x53')](_0x28c32f,onTestMerchantCredentialsDone),molpayCredentialsRequestFrame['removeEventListener']('load',_0x5369e6);};molpayCredentialsRequestFrame[_0xe2b7('0x4b')]=_0xe2b7('0x4c'),molpayCredentialsRequestFrame[_0xe2b7('0x4d')]('src',molpaySdkUrl),hideFrame(molpayCredentialsRequestFrame),document[_0xe2b7('0x54')]['appendChild'](molpayCredentialsRequestFrame),molpayCredentialsRequestFrame['addEventListener']('load',_0x5369e6);},MOLPay[_0xe2b7('0x2')][_0xe2b7('0x55')]=function(_0x4ba274,_0x803ae1){_0x803ae1&&(testMerchantChannelsCallback=_0x803ae1),molpayChannelsRequestFrame=document[_0xe2b7('0x46')](_0xe2b7('0x47'));var _0x576df4=function(_0x47f6e3){molpayChannelsRequestFrame[_0xe2b7('0x2a')][_0xe2b7('0x55')](_0x4ba274,onTestMerchantChannelsDone),molpayChannelsRequestFrame[_0xe2b7('0x24')](_0xe2b7('0x49'),_0x576df4);};molpayChannelsRequestFrame['allowScriptAccess']=_0xe2b7('0x4c'),molpayChannelsRequestFrame[_0xe2b7('0x4d')](_0xe2b7('0x4e'),molpaySdkUrl),hideFrame(molpayChannelsRequestFrame),document[_0xe2b7('0x54')][_0xe2b7('0x4f')](molpayChannelsRequestFrame),molpayChannelsRequestFrame[_0xe2b7('0x26')](_0xe2b7('0x49'),_0x576df4);};var molpay=new MOLPay();module['exports']=molpay;