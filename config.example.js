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

  // Приложение в магазинах (заполни при релизе)
  app: {
    ios:     '',   // 'https://apps.apple.com/...'
    android: '',   // 'https://play.google.com/store/...'
    rustore: ''    // 'https://apps.rustore.ru/...'
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
