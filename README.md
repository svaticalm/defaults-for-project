# Svg-sprite
```svgo.config.js``` закинуть в папку проекта

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
