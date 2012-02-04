window.addEventListener "load", (->
  unless screen.width is 320 and screen.height is 480
    iphone = document.getElementById("iphone")
    iphone_frame = document.createElement("div")
    iphone_frame.id = "iphone_frame"
    parentObj = iphone.parentNode
    parentObj.insertBefore iphone_frame, iphone
    iphone_frame.appendChild iphone

  links = document.getElementsByTagName("a")
  filename = ""
  if navigator.language is "ja-jp"
    filename = "ja.html"
  else
    filename = "en.html"

  for link in links
		  link.href += filename

  setTimeout scrollTo, 0, 0, 1
), false
