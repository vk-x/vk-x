settings = require "./settings"

module.exports =

  runConditional: ( settingKey, functions ) ->
    functions[ settings.get settingKey ]?()

    settings.on "set.#{settingKey}", ({ value }) ->
      functions[ value ]?()


  wrapStyle: ( style ) ->
    style.isUsed = no

    style.use = ->
      if not style.isUsed
        style.ref()
        style.isUsed = yes

    style.unuse = ->
      if style.isUsed
        style.unref()
        style.isUsed = no

    style


  styleConditional: ( settingKey, style ) ->
    wrapped = @wrapStyle style

    @runConditional settingKey,
      true: -> wrapped.use settingKey
      false: -> wrapped.unuse settingKey


  setConditional: ( settingKey, obj, key, values ) ->
    initialValue = obj[ key ]

    obj[ key ] = values[ settings.get settingKey ] ? initialValue

    settings.on "set.#{settingKey}", ({ value }) ->
      obj[ key ] = values[ value ] ? initialValue
