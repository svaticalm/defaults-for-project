# Styles
Основные стили для проекта лежат в папке ```/sass```, переносим её в assets

# Svg-sprite
Спрайт убирает цвет иконок, каждую иконку ставит в тэг symbol, даёт id в соответствии с названием файла иконки.

Создаёт файл ```icons.js``` в папке ```/assets```, который нужен для вывода всех иконок в документации. 

## Установка
```svgo.config.js``` в корневую папку,

```Components/SvgIcon.vue``` в компоненты,

```Docs.vue``` в Views, это страница с набором иконок.


## Пакеты, которые нужно установить
```
npm install svgo svg-spreact-cli
```

## Скрипт для package.json
```/for-sprite``` - для иконок будушего спрайта. Готовый спрайт выгружается в папку ```/img/sprite.svg```

```jsx
"sprite": "svgo -f ./src/assets/img/for-sprite -o ./src/assets/img/for-sprite && svg-spreact ./src/assets/img/for-sprite --optimize false --tidy true > ./src/assets/img/sprite.svg"
```

## Запуск скрипта
```
npm run sprite
```

## Пример использования
В параметр ```:name``` передаём название иконки.
Параметры ```:width``` и ```:height``` отвечают за ширину и высоту.
```vue
<svg-icon :name="'marker'"
  :width="16"
  :height="16" 
  class="svg-icon"></svg-icon>
```
