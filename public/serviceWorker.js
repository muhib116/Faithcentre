const cacheName = 'v1';

// call install event
self.addEventListener('install', (e) => {
	console.log("Service worker: installed")
});


// call activate event
self.addEventListener('activate', (e) => {
	// remove unwanted caches
	e.waitUntil(
		caches.keys()
		.then((cacheNames) => 
		{
			return Promise.all(
				cacheNames.map((cache) =>
				{
					if(cache !== cacheName)
					{
						// console.log('Service worker: Clearing Old Cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});


// call fetch event
/* self.addEventListener('fetch', e => 
{
	e.respondWith(
		caches.match(e.request).then((r) => {
			return r || fetch(e.request).then((response) => {
				return caches.open(cacheName).then((cache) => {
					// console.log('[Service Worker] Caching new resource: '+e.request.url);
					let requested_url = response.url,
						status        = (requested_url.indexOf('.webp')>0) || (requested_url.indexOf('.jpg')>0) || (requested_url.indexOf('.png')>0) || (requested_url.indexOf('.jpeg')>0) || (requested_url.indexOf('.svg')>0) || (requested_url.indexOf('.js')>0) || (requested_url.indexOf('.css')>0) || (requested_url.indexOf('.json')>0) || (requested_url.indexOf('.woff2')>0);


  					if((e.request.url.indexOf('http') === 0) && e.request.method === 'GET')
  					{
						cache.put(e.request, response.clone());
					}
					return response;
				});
			});
		})
	);
});
 */



















// const cacheName = 'v1';

// // call install event
// self.addEventListener('install', (e) => 
// {
// 	// console.log('Service worker: installed');

// 	e.waitUntil(
// 		caches.open(cacheName)
// 		.then(cache => cache.addAll([
// 			/*catch offline page for first time when install app start*/
// 			'/offline.html',
// 			'/offline.webp',
// 			/*catch offline page for first time when install app end*/
// 		]))
// 	);
// });
