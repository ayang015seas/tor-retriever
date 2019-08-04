// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// 'use strict';

var test = false;

function send() {
    fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({status: "Passive", url: "ECHO"})
      }).then(res => chrome.extension.getBackgroundPage().console.log(res));
}
   
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});


chrome.alarms.onAlarm.addListener(function () {
  chrome.extension.getBackgroundPage().console.log("Alarm Received");
  // send();
})



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   // alert(changeInfo.url);
    if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined) {
      fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({status: "Passive", url: "ALPHA"})
      }).then(res => chrome.extension.getBackgroundPage().console.log(res));// alert(res.body));
      test = !test;
      // alert(Date.now());
    }

}); 



chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
  var x = Math.random();
  var data;
  if (x < 0.5) {
    var data = "This is a post request";
   // alert(changeInfo.url);
  }
  else {
    var data = "This is a get request";
  }
  console.log("Initiating Request");
  fetch('http://localhost:8080/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({status: "Passive", url: data})
  }).then(res => console.log(res));// alert(res.body));
  
}); 


async function request() {
  fetch('http://localhost:8080/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({status: "Passive", url: "test.com"})
  });
}

/*
chrome.tabs.onActivated.addListener(function(activeInfo) {
   console.log('success2');
  chrome.tabs.get(activeInfo.tabId, function(tab){
     console.log(tab.url);
  });
}); 

*/


