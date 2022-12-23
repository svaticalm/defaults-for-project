# Svg-sprite
Спрайт убирает цвет иконок, каждую иконку ставит в тэг symbol, даёт id в соответствии с названием файла иконки.

Создаёт файл ```icons.js``` в папке ```/assets```, который нужен для вывода всех иконок в документации. 

## Установка
```svgo.config.js```, ```SvgIcon.vue``` и ```Docs.vue``` закинуть в папку проекта

## Пакеты, которые нужно установить
```
npm install svgo svg-spreact-cli
```

## Скрипт для package.json
```/for-sprite``` - для иконок будушего спрайта. Готовый спрайт выгружается в папку ```/img/sprite.svg```

```
"sprite": "svgo -f ./src/assets/img/for-sprite -o ./src/assets/img/for-sprite && svg-spreact ./src/assets/img/for-sprite --optimize false --tidy true > ./src/assets/img/sprite.svg"
```

## Запуск скрипта
``` 
npm run sprite
```

## Пример использования
В параметр ```:name``` передаём название иконки.
Параметры ```:width``` и ```:height``` отвечают за ширину и высоту.
```
<svg-icon :name="'marker'"
  :width="16"
  :height="16" 
  class="svg-icon"></svg-icon>
```
