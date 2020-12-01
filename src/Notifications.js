import React, {useEffect, useState} from 'react';
import './App.css';

function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

function registerServiceWorker() {
  return navigator.serviceWorker.register("/sw.js");
}

async function askUserPermission() {
  return await Notification.requestPermission();
}

async function createNotificationSubscription() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey
  });
}

async function postSubscription(subscription) {
  const response = await fetch(`https://push-notification-demo-server.herokuapp.com/subscription`, {
    credentials: "omit",
    headers: { "content-type": "application/json;charset=UTF-8", "sec-fetch-mode": "cors" },
    body: JSON.stringify(subscription),
    method: "POST",
    mode: "cors"
  });
  return await response.json();
}

function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");
  const { image, tag, url, title, text } = event.data.json();
  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: image,
    badge: "/favicon.ico",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
  event.waitUntil(self.registration.showNotification(title, options));
}
self.addEventListener("push", receivePushNotification);

function openPushNotification(event) {
  console.log("Notification click Received.",    event.notification.data);
   event.notification.close();
  //do something
}
self.addEventListener("notificationclick", openPushNotification);


const Notifications = ()=> {

  return (
    <div>
      <p>Push notification are {!pushNotificationSupported && "NOT"} supported by your device.</p>
      <p>
        User consent to recevie push notificaitons is <strong>{userConsent}</strong>.
      </p>
      <button onClick={onClickAskUserPermission}>Ask user permission</button>
      <button onClick={onClickSusbribeToPushNotification}>Create Notification subscription</button>
      <button onClick={onClickSendSubscriptionToPushServer}>Send subscription to push server</button>
      <button onClick={onClickSendNotification}>Send a notification</button>
    </div>
  );
  
}

export default Notifications;