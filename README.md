# Facebook feed
## Setting thing up
1. Copy .env.example to .env and fill inn `TOKEN` with a Facebook page access token (https://medium.com/@blienart/get-a-permanent-facebook-page-access-token-a96470dc03ca).
2. Deploy by running `gcloud app deploy`
3. Update URL for CORS in server.js.
4. Deploy again
5. Embed https://*domain-here*/widget in an iframe on your page.

## The backend
A node express server which fetches all posts from a page caches them, and exposes them through an endpoint at `/`

Cache is renewed once every hour.

## The widget
`/widget` returns a HTML, JS and CSS file which can be loaded in an iframe to display the posts:

If you need to make changes to HTML, JS or CSS, edit the file `widget.html`.


