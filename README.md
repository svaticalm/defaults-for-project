# Быстрый доступ
+ [Основные компонеты](https://github.com/svaticalm/defaults-for-vue#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B)
+ [SvgSprite](https://github.com/svaticalm/defaults-for-vue#svg-sprite)
+ [Inputmask](https://github.com/svaticalm/defaults-for-vue#inputmask)

# Основные компоненты
Основные компоненты лежат в папке ```/components```
Для создания объекта любого инпута (textarea, checkbox и т.д.), вспользуйтесь функцией createInputField из ```/utils/index.ts``

+ [Инпут](https://github.com/svaticalm/defaults-for-vue/blob/main/README.md#%D0%B8%D0%BD%D0%BF%D1%83%D1%82)
+ [Текстареа](https://github.com/svaticalm/defaults-for-vue#%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0%D1%80%D0%B5%D0%B0)
+ [Кнопка](https://github.com/svaticalm/defaults-for-vue#button)
+ [Radio/Checkbox](https://github.com/svaticalm/defaults-for-vue#radio-checkbox)
+ [Тултип](https://github.com/svaticalm/defaults-for-vue#%D1%82%D1%83%D0%BB%D1%82%D0%B8%D0%BF)
+ [Popup](https://github.com/svaticalm/defaults-for-vue#popup)

## Инпут
Настройка инпута
props ```isMulti: true``` для поля ФИО. 
```javascript
 const someInput = reactive(
    createInputField({
      name: undefined,
      type: 'text', // input type
      isDisabled: false, // настройка дизейбла
      placeholder: '', // плейсхолдер инпута
      label: '', // лейбл инпута
      isError: false, // ошибка валидации
      errorText: '', // текст ошибки
      mask: undefined, // конфиг inputmask
      maxLength: undefined, // максимальное кол-во символов
      autoFocus: false, // автофокус при mounted
      modelValue: '',
      inputmode: undefined, 
      require: undefined, // валидировать ли поле
      inputId: undefined, // id инпута
      isMulti: false, // для мульти поля ФИО
    }),
  );
```
```vue
<input-field
  v-bind="someInput"
  v-model="someInput.modelValue"
  :location="someInput"
>
</input-field>
```
## Текстареа
```vue
<textarea-field
  v-bind="someInput"
  v-model="someInput.modelValue"
  :location="someInput"
  :add-style="{minHeight: 100 + 'px'}">
</textarea-field>
```
## Button
```vue
<btn-comp :mini="true" :green="true" :is-load="false">
  <svg-icon :name="'check'" :width="16" :height="16" class="mr4"></svg-icon>
  ОПУБЛИКОВАТЬ
</btn-comp>
```
## Radio - Checkbox
```vue
<check-item v-bind="agreeCheck" v-model="agreeCheck.modelValue" :location="agreeCheck">
Я понимаю, что статья будет доступна всем посетителям сайта
</check-item>
```
## Тултип
Слот TooltipBtn - кнопка вызова тултипа
Слот TooltipContent - контент тултипа
```vue
<tooltip-comp :direction="'left'" :width="160" :is-btn-close="false">
  <template v-slot:tooltipBtn>
    <svg-icon :name="'dots'" :width="24" :height="24"></svg-icon>
  </template>
  <template v-slot:tooltipContent>
    <a>Вернуть на модерацию</a>
  </template>
</tooltip-comp>
```
## Popup
Объекты модалок хранятся в ```stores/popups.ts```
```vue
 <popup-window
    :name="popups.items.fileError.name"
    :show="popups.items.fileError.show"
    :is-btn-close="false"
  >
    <file-error></file-error>
  </popup-window>
```

# Svg-sprite
+ [Пакет calm-svg-sprite](https://www.npmjs.com/package/calm-svg-sprite)

## Пример использования
В параметр ```:name``` передаём название иконки.
Параметры ```:width``` и ```:height``` отвечают за ширину и высоту.
```vue
<svg-icon :name="'marker'"
  :width="16"
  :height="16"></svg-icon>
```
# Inputmask
В проектах используем преимущественно плагин [inputmask](https://github.com/RobinHerbots/Inputmask) для инпутов, чтобы навешивать маски для телефонов, дат и т.д.
Готовая директива ```/directives/mask.ts```
