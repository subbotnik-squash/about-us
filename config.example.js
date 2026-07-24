/**
 * СКВОШ СУББОТНИК — шаблон конфигурации
 * ──────────────────────────────────────
 * Этот файл можно коммитить в git — реальных ссылок нет.
 *
 * Как использовать:
 *   cp config.example.js config.js
 *   — и заполни нужные поля
 *
 * config.js добавлен в .gitignore и не попадает в репозиторий.
 */

var LINKS = {

  // Основной Telegram-канал
  telegram: '',

  // Приложение в магазинах (пустая строка = «Скоро» в модалке)
  app: {
    ios:     '',   // 'https://apps.apple.com/ru/app/id<AppleID>'
    android: '',   // 'https://play.google.com/store/apps/details?id=com.subbotnik.app'
    rustore: ''    // 'https://www.rustore.ru/catalog/app/com.subbotnik.app'
  },

  // Telegram-группы клубов
  clubs: {
    moskva:  '',
    belka:   '',
    drive:   '',
    pearl:   '',
    twelve:  '',
    arten:   ''
  }

};
