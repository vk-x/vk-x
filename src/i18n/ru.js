const messages = {
  'settings.common': 'Общее',
  'settings.common.awayPhp': 'Открывать внешние ссылки напрямую, без перенаправления',
  'settings.common.awayPhp.tooltip': 'Отключить перенаправление через <strong>away.php</strong>',
  'settings.common.previewMediaLinks': 'Предпросмотр .webm, .mp4 и других ссылок',

  'settings.messages': 'Сообщения и записи',
  'settings.messages.darkerUnread': 'Более тёмный фон у непрочитанных и выбранных сообщений',
  'settings.messages.collapseList': 'Свернуть список диалогов, чтобы увеличить область переписки',
  'settings.messages.noPagePreviews': 'Не прикреплять превью для ссылок на веб-страницы',
  'settings.messages.showTimestamps': 'Показывать время отправки каждого сообщения',

  'settings.sideMenu': 'Боковое меню',
  'settings.sideMenu.fixPosition': 'Закрепить положение меню, не прокручивать из вида',

  'settings.friends': 'Друзья',
  'settings.friends.noPeopleYouMightKnow': 'Скрывать блок "Возможные друзья"',
  'settings.friends.onlineByDefault': 'Открывать "Друзья онлайн" по умолчанию',

  'settings.videos': 'Видеозаписи',
  'settings.videos.myVideosByDefault': 'Открывать "Мои Видеозаписи" по умолчанию',

  'settings.help': 'Помощь',
  'settings.help.community': 'Сообщество vk-x',
  'settings.help.reportBug': 'Сообщить о проблеме',
  'settings.help.resetSettings': 'Сбросить настройки',

  'settings.showMore': 'Ещё',
  'settings.showLess': 'Свернуть'
}

export default {
  languageId: 0,
  locale: 'ru',
  messages,
  // See src/i18n.js and https://github.com/vk-x/vk-x/wiki/Language-IDs
  aliases: [
    2,
    8,
    50,
    51,
    52,
    56,
    57,
    58,
    65,
    66,
    70,
    80,
    87,
    91,
    97,
    100,
    105,
    106,
    107,
    111,
    114,
    118,
    298
  ]
}
