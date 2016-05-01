# Don't add previews for links when sending, see #5.

module.exports =

  defineSettings: ->
    "messages.noPagePreviews":
      defaultValue: on
      onChange: ->


  run: ->
    # When a URL is detected in new message text, it's sent to the server
    # to check the type of media - photo, video, page, etc.
    # This is done via an iframe that calls `onUploadDone` on it's parent window.
    # When no media is found accessible by the parsed URL, `onUploadFail` is
    # called instead.
    # Those two global functions are set each time such check is performed.
    # The code that sets them or performs the check isn't global and therefore
    # can't be modified.
    # The easiest way to tap into this process seems to be to use `defineProperty`
    # for `onUploadDone` and call `onUploadFail` when a page is detected
    # by the server.
    # For all other types of media original `onUploadDone` is called.

    ATTACHMENT_TYPE_PAGE = "share"

    done = null

    Object.defineProperty window, "onUploadDone",
      enumerable: yes
      configurable: yes

      get: ->
        done

      set: ( newDone ) ->

        done = ( data ) ->
          if data[ 0 ] is ATTACHMENT_TYPE_PAGE
            window.onUploadFail "Unknown error"
          else
            newDone.apply window, [].slice.call arguments

        return
