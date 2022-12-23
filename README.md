# Быстрый доступ
+ [Стили](https://github.com/svaticalm/defaults-for-vue#styles)
+ [Основные компонеты](https://github.com/svaticalm/defaults-for-vue#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B)
+ [SvgSprite](https://github.com/svaticalm/defaults-for-vue#svg-sprite)
+ [Inputmask](https://github.com/svaticalm/defaults-for-vue#inputmask)

# Styles
Основные стили для проекта лежат в папке ```/sass```, переносим её в assets

# Основные компоненты
Основные компоненты лежат в папке ```/Components```

+ [Инпут](https://github.com/svaticalm/defaults-for-vue/blob/main/README.md#%D0%B8%D0%BD%D0%BF%D1%83%D1%82)
+ [Инпут ФИО](https://github.com/svaticalm/defaults-for-vue#%D0%B8%D0%BD%D0%BF%D1%83%D1%82-%D1%84%D0%B8%D0%BE)
+ [Текстареа](https://github.com/svaticalm/defaults-for-vue#%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0%D1%80%D0%B5%D0%B0)
+ [Кнопка Сабмит](https://github.com/svaticalm/defaults-for-vue#%D0%BA%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0-%D1%81%D0%B0%D0%B1%D0%BC%D0%B8%D1%82)
+ [Radio](https://github.com/svaticalm/defaults-for-vue#radio)
+ [Checkbox](https://github.com/svaticalm/defaults-for-vue#checkbox)
+ [Селект](https://github.com/svaticalm/defaults-for-vue#%D1%81%D0%B5%D0%BB%D0%B5%D0%BA%D1%82)
+ [Тултип](https://github.com/svaticalm/defaults-for-vue#%D1%82%D1%83%D0%BB%D1%82%D0%B8%D0%BF)
+ [Хинт](https://github.com/svaticalm/defaults-for-vue#%D1%85%D0%B8%D0%BD%D1%82)
+ [Popup](https://github.com/svaticalm/defaults-for-vue#popup)

## Инпут
```vue
<input-styled
  name=""
  :class="''"
  :placeholderInput="'Плейсхолдер'"
  @blur="блюр"
  v-model="form.keyword.value"
  @focus="фокус"
  :is-error="передаём ошибку"
  :errorText="текст ошибки">
</input-styled>
```
## Инпут ФИО
Используется объект fields
```javascript
fields: {
  lastName: {
      name: 'lastName',
      value: '',
      delimiter: ' ',
      placeholder: 'Фамилия',
  },
  firstName: {
      name: 'firstName',
      value: '',
      delimiter: ' ',
      placeholder: 'Имя',
  },
  secondName: {
      name: 'secondName',
      value: '',
      delimiter: '',
      placeholder: 'Отчество',
  },
},
```
Функция setPersonInput
```javascript
setPersonInput(field) {
  if (field.value !== undefined && field.name !== undefined) {
      this.form.fio.fields[field.name].value = field.value;
  }
},
```
```vue
<input-multi
  @chunk="setPersonInput"
  name="fio"
  :disabled="false"
  :auto-focus="true"
  :is-error="form.fio.error"
  :error-text="form.fio.errorText"
  v-model="form.fio.value"
  :fields="form.fio.fields"
  @focus="form.fio.error = false"
  :placeholderInput="'Фамилия Имя Отчество'"
  :placeholder="'Фамилия Имя Отчество'">
</input-multi>
```
## Текстареа
```vue
<textarea-field :class="''"
  v-model="модел"
  :is-error="ошибка"
  :error-text="'текст ошибки'"
  :auto-focus="true or false"
  placeholder="Плейсхолдер"
  :add-style="{minHeight: 100 + 'px'}">
</textarea-field>
```
## Кнопка сабмит
btnType имеет три значения
+ 'normal'
+ 'load'
+ 'ok'
```vue
<submit-btn @click="sendForm" class="btn mr24" :type="btnType">
  <svg-icon :name="'check'" :width="16" :height="16" class="mr4"></svg-icon>
  Подтвердить
</submit-btn>
```
## Radio
```vue
<check-item v-model="valueModel"
  @update:modelValue="updateValue(values[1])"
  :inputId="`${inputId}1`"
  :value="valueModel === values[1]"
  :type="'radio'"
  :disabled="isDisabled"
  :name="name"
  :class="{'mt12': $slots.labelFirst}">
  <slot name="labelSecond">Лейбл</slot>
</check-item>
```
## Checkbox
```vue
<check-item v-model="модел" 
  :is-error="ошибка"
  @update:modelValue="функция обновления значения"
  :inputId="'isHideBankingDetails'" 
  :name="'isHideBankingDetails'">
</check-item>
```
## Селект
```vue
<input-select
  @open="эммет открытия"
  :disabled="false"
  @change="эммет изменения"
  :isError="ошибка"
  v-model="модел"
  :options="опции"
  :classInput="''"
  :placeholder="'Плейсхолдер'"
  :list-style="{'max-height': 'none'}">
</input-select>
```
## Тултип
:direction имеет несколько значений
+ 'bottom-center-direction'
+ 'bottom-left-direction'
+ 'bottom-right-direction'
+ 'top-right-direction'
+ 'top-left-direction'
+ 'top-center-direction'

Слот TooltipBtn - кнопка вызова тултипа

Слот TooltipContent - контент тултипа
```vue
<tooltip
    :direction="'bottom-center-direction'"
    :add-style="{width: '264px'}"
    :add-class="'text-tooltip'"
    :is-btn-close="false">
    <template v-slot:tooltipBtn>
        <svg-icon :name="'info2'" :width="16" :height="16" class="text-color-link"></svg-icon>
    </template>
    <template v-slot:tooltipContent>
        <div v-html="item.info"></div>
    </template>
</tooltip>
```
## Хинт
В классе указывается :direction как у тултипов
```vue
<div class="has-hint">
    Тело
    <div class="hint" :class="direction">
        {{ hint }}
    </div>
</div>
```
## Popup
Объекты модалок хранятся в ```store/popups.js```
```vue
teamCategoryModal: {
  name: 'teamCategoryModal',
  show: false,
}
```
```vue
<popup :show="popups.teamCategoryModal.show" :name="popups.teamCategoryModal.name" :width="640" >
    Наполнение
</popup>
```

# Svg-sprite
Скрипт убирает цвет иконок, каждую иконку ставит в тэг symbol, даёт id в соответствии с названием файла иконки.

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
# Inputmask
В проектах используем преимущественно плагин [inputmask](https://github.com/RobinHerbots/Inputmask) для инпутов, чтобы навешивать маски для телефонов, дат и т.д.
## Установка
Ставим пакет
```
npm install inputmask
```
Переносим файл в helpers
```/helpers/vue-inputmask.js```

в ```main.js``` подключаем маски глобально
```javascript
import VueInputMask from './helpers/vue-inputmask';
window.app = createApp(App)
    .use(store)
    .use(router)
    .use(VueInputMask) 
    .mount('#app');
 ```
## Пример использования
```vue
<input-styled
    :mask="{mask:'+7(999)999-99-99',showMaskOnHover: false}">
</input-styled>
```
