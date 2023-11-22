import { Mark, markPasteRule } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

interface LinkOptions {
  openOnClick: boolean;
  target: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    link: {
      /**
       * Set a link mark
       */
      setLink: (attributes: {
        href: string;
        target?: string | null;
        rel?: string | null;
        class?: string | null;
      }) => ReturnType;
      /**
       * Unset a link mark
       */
      unsetLink: () => ReturnType;
    };
  }
}

const Link = Mark.create<LinkOptions>({
  name: 'link',
  inclusive: false,

  addOptions() {
    return {
      openOnClick: true,
      target: '_blank',
    };
  },

  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[href]',
        getAttrs: (dom) => ({
          href: (dom as HTMLElement).getAttribute('href'),
          target: (dom as HTMLElement).getAttribute('target'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      {
        href: HTMLAttributes.href,
        rel: 'noopener noreferrer nofollow',
        target: this.options.target,
      },
      0,
    ];
  },

  addCommands() {
    return {
      setLink:
        (attributes) =>
        ({ chain, state }) => {
          const { selection } = state;
          const c = chain().setMark(this.name, attributes).setMeta('preventAutolink', true);
          if (selection.ranges[0].$from.pos === selection.ranges[0].$to.pos) {
            c.insertContent(attributes.href);
          }
          return c.run();
        },
      unsetLink:
        () =>
        ({ chain, state }) => {
          const { $from, $to } = state.selection;
          let hasLink = false;

          function isLink(str: string) {
            // Regular expression to match URLs
            const urlPattern = /^(https?|ftp|http):\/\/[^\s/$.?#].[^\s]*$/i;
            return urlPattern.test(str);
          }
          // Check if there's only one link in the selected content
          state.doc.nodesBetween($from.pos, $to.pos, (node) => {
            if (isLink(node.text as string)) {
              hasLink = true;
            }
          });

          // If there's only one link, remove it
          if (hasLink) {
            chain().extendMarkRange('link').deleteSelection().run();
          } else {
            chain()
              .unsetMark(this.name, { extendEmptyMarkRange: true })
              .setMeta('preventAutolink', true)
              .run();
          }
          return true;
        },
    };
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
        type: this.type,
        getAttributes: (match) => ({
          href: `${match}`,
        }),
      }),
    ];
  },

  addProseMirrorPlugins() {
    if (!this.options.openOnClick) {
      return [];
    }

    return [
      new Plugin({
        key: new PluginKey('link'),
        props: {
          handleClick: (view, pos, event) => {
            // const { schema } = view.state;
            const attrs = this.editor.getAttributes('href');
            const parent = (event.target as HTMLElement)!.closest('a');
            if (
              (attrs.href && event.target instanceof HTMLAnchorElement) ||
              (parent &&
                parent.attributes.getNamedItem('href') &&
                parent.attributes.getNamedItem('target'))
            ) {
              const hrefAttr = parent!.attributes.getNamedItem('href');
              document.dispatchEvent(
                new CustomEvent('openlinkedit', {
                  detail: attrs.href ? attrs.href : hrefAttr!.value,
                }),
              );
              event.stopPropagation();
            }
          },
        },
      }),
    ];
  },
});

export default Link;
