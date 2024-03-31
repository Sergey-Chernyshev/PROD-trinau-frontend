navigator.serviceWorker.register("sw.js");

export function showNotification() {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      console.log("first")
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Vibration Sample", {
          body: "Buzz! Buzz!"
        });
      });
    }
  })
  .catch( (error) => {
    console.log(error)
  })
}


