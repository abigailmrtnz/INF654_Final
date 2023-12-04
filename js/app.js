//does the browser support service workers?

if ("serviceWorker" in navigator) {
  //defer service worker installation until page completes loading
  window.addEventListener("load", () => {
    //register service worker
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        //display success message
        console.log(`Service Worker Registration (Scope: ${reg.scope})`);
      })
      .catch((error) => {
        //display error message
        console.log(`Service Worker Error (${error})`);
      });
  });
} else {
/*   happens when the app isn't served over a TLS connection (HTTPS)
  or if the browser doesn't support the service worker */
  console.log("Service Worker not available");
}