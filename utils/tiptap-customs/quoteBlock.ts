import { Node, wrappingInputRule } from '@tiptap/core';

interface QuoteBlockquoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    quoteBlock: {
      /**
       * Set a blockquote node
       */
      setQuoteBlock: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleQuoteBlock: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetQuoteBlock: () => ReturnType;
    };
  }
}

const inputRegex = /^\s*>\s$/;

const QuoteBlock = Node.create<QuoteBlockquoteOptions>({
  name: 'quoteBlock',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: 'block+',

  group: 'block',

  defining: true,

  parseHTML() {
    return [{ tag: 'div.quote-block' }];
  },

  renderHTML() {
    return ['div', { class: 'quote-block' }, 0];
  },

  addCommands() {
    return {
      setQuoteBlock:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleQuoteBlock:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetQuoteBlock:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-b': () => this.editor.commands.toggleQuoteBlock(),
    };
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
});

export default QuoteBlock;
