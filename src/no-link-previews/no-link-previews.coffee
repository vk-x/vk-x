# Don't add previews for links when sending, see #5.

inject = require "@vk-x/inject"

patch = require "./patch-media-selector"

inject "(" + patch.toString() + ")()", true
