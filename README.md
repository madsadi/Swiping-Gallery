# What is this?

a responsive gallery that its images can be swiped left and right.

#Installation

`npm i swipinggallery --save`

Then...
...
import {SwipingGallery} from 'swipinggallery'

      <SwipingGallery images={images}/>

...

## Options

swipinggallery supports multiple options which can be modified to fit your own taste and style:
 
* (the thumbnail section has a shadow at the end-left and end-right to indicate more to images are to come, you can specify background of this shadow by this option ,and it accepts string) shadowBg={}

* (there are buttons you can change photos. you can change the icon by this two options)leftArrow={}
  rightArrow={}
  
* (fullscreen icon) fullScreenIcon={}
  
* (exitfullscreen icon) exitFullScreen={}
  
* (whether you want to show the thumbnail section below your gallery can be specified through this boolean option, and it's true by default) thumbnailDisplay={true}
  
* (to style the border of indexed and active image in thumbnail, and it accepts string as example) activeBorder={'3px solid #db143d'}
  
* (this option can specify height of cover image, and it accepts string) coverHeight={'327px'},
  
* (background of where it says which image's index is out of total images) indexIndicator={'rgba(255,255,255,35%)'}

