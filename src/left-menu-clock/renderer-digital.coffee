module.exports =
  init: (settings) ->
    #== read settings ==
    @_showTime = settings.showTime
    @_showDate = settings.showDate
    #== elements ==
    menuDiv = document.getElementById('side_bar_inner')
    anchor = document.getElementById('left_blocks')
    @_rootTag = window.document.createElement('div')
    @_timeDiv = window.document.createElement('div')
    @_dateDiv = window.document.createElement('div')
    @_splitter = window.document.createElement('div')
    #== styles ==
    @_rootTag.classList.add 'vkx-clock-digital-root'
    @_timeDiv.classList.add 'vkx-clock-digital-time'
    @_dateDiv.classList.add 'vkx-clock-digital-date'
    @_splitter.classList.add 'more_div'
    @_splitter.style.marginLeft = '6px !important'
    @_timeDiv.style.display = if @_showTime then 'block' else 'none'
    @_dateDiv.style.display = if @_showDate then 'block' else 'none'

    @_rootTag.appendChild @_splitter.cloneNode()
    @_rootTag.appendChild @_timeDiv
    @_rootTag.appendChild @_dateDiv
    @_rootTag.appendChild @_splitter.cloneNode()

   # menuDiv.insertBefore @_splitter.cloneNode(), anchor.nextSibling
    menuDiv.insertBefore @_rootTag, anchor.nextSibling
   # menuDiv.insertBefore @_splitter.cloneNode(), anchor.nextSibling
    return
  update: (strings) ->
    if @_showTime
      @_timeDiv.innerHTML = strings.time
    if @_showDate
      @_dateDiv.innerHTML = strings.date
    return