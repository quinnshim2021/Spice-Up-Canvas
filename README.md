![SUC preview alt text](https://github.com/quinnshim2021/Spice-Up-Canvas/blob/background/images/preview.gif)
# Spice Up Canvas
The header images on Canvas's Dashboard are usually boring. With this Chrome Extension, you can easily change them to be personalized to whatever image/gif you want!

## Uploading to Chrome
- Download this repository as a zip file or via cloning.
- Go to `chrome://extensions` in Chrome.
- Click `Load unpacked` and select this folder.
- Chrome may ask you to enter 'Developer Mode'. Select 'Yes'. This allows unpublished extension may be run.
- Proceed to steps below.

## Personalizing this Extension
- The only hands on step you'll need to do is to follow the link below to get a <b>free</b> Giphy API Key. Once you have it, add a file to the Popup folder titled `env.js`. The only line you need to write is `const msg = { 'API_KEY': "your_api_key_here"}`. Once you have that file, you're good to go!
  - <a href='https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key'>Request a Giphy API Key</a>
- Once you have your API key and have the extension loaded in Chrome, go to Canvas and open the Spice pop-up. There, you will find a search bar and a trending page for Giphy gifs. Feel free to explore trending or simply search for your favorite topic. Once you select a gif, select 'Upload' to see it on your Canvas page! 
  - To delete gifs, go to 'Saved', select the gifs you'd like to remove, and select 'Delete.'
- You can have as many or few images as you'd like. 
  - NOTE: If you have less images than cards, images will be repeated. For this reason, I like to have 2-5 gifs saved at a time.
- If you like the minimalist look of the preview above, I left the code doing that commented out in `content.js`.

## Notes
- Using env.js file to hold api key. Will need to create your own file containing your key as I have mine covered by my .gitignore.
- The preview gif is a big file so it's a bit laggy. The result in real time looks much better.

## Notes/To-Do for Future
- UI looks like shit
- Add background image + minimalist features
- Work on loading times + caching
