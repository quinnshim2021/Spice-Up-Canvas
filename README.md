# Spice Up Canvas
The header images on Canvas's Dashboard are usually boring. With this Chrome Extension, you can easily change them to be personalized to whatever image/gif you want!

## Uploading to Chrome
- Download this repository as a zip file or via cloning.
- Go to `chrome://extensions` in Chrome.
- Click `Load unpacked` and select this folder.
- Chrome may ask you to enter 'Developer Mode'. Select 'Yes'. This allows unpublished extension may be run.
- Proceed to steps below.

## Personalizing this Extension
- Open `manifest.json`, on line 8 change string to the url of your Canvas' url. Save the file.
  - Ex: `"https://canvas.yale.edu/"`
- Find your images. Images can be any file type. NOTE: Images should be landscape.
- Save images to images folder. Feel free to delete dummy images I have saved there already.
- Open `content.js`. Starting on line 7, edit path to your images.
  - If you saved images to Images folder, just replace name/extension.
- You can have as many or few images as you'd like. I have 9 just to show variety but feel free to have as little as 1.
  - NOTE: If you have less images than cards, images will be repeated.
- Finally, save `content.js` and go back to `chrome://extensions`. Click refresh button on Spice-Up-Canvas card. 
- You're good to go! I like to show all classes so that I can have more images :)

## To-Do
- Fix UI for popup
- Allow selecting for popup
- Store links between sessions
- Allow searching
- Make match pattern for canvas
- Cache giphy calls

## Notes for Future
- Need to create upload/delete system within extension.
- Add some more creative updates to Canvas.
- Allow going to more pages in Popup