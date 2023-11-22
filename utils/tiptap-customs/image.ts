import { Node } from '@tiptap/vue-3';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      setImage: (attributes: {
        'data-id': string;
        'data-href': string;
        'data-small': string;
        preload: string;
      }) => ReturnType;
    };
  }
}

const Image = Node.create({
  name: 'image',
  group: 'block',
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      'data-id': {
        default: null,
      },
      'data-href': {
        default: null,
      },
      'data-small': {
        default: null,
      },
      preload: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.image-wrapper',
        getAttrs: (node: string | HTMLElement) => {
          if (typeof node === 'string') {
            return {};
          }
          return {
            'data-small': node.getAttribute('data-small'),
            'data-href': node.getAttribute('data-href'),
            'data-id': node.getAttribute('data-id'),
            preload: ''
          };
        },
      },
    ];
  },

  renderHTML({ node }: { node: ProseMirrorNode }) {
    return [
      'div',
      {
        class: 'image-wrapper',
        'data-small': node.attrs['data-small'],
        'data-href': node.attrs['data-href'],
        'data-id': node.attrs['data-id'],
      },
      [
        'img',
        {
          class: 'image viewer-elem',
          'data-small': node.attrs['data-small'],
          'data-href': node.attrs['data-href'],
          'data-id': node.attrs['data-id'],
          src: node.attrs['data-href'],
          clickprevent: `emit(show,'${node.attrs['data-id']}')`,
        },
      ],
    ];
  },

  addCommands() {
    return {
      setImage:
        (attributes) =>
        ({ state, dispatch }) => {
          const preloadId = attributes.preload;
          let preloadPos = 0;
          state.tr.doc.descendants((node, pos) => {
            if (node.type.name === 'image_preloader') {
              if (preloadId === node.attrs['data-id']) {
                preloadPos = pos;
              }
            }
          });
          const { selection } = state;
          const position = selection.head;
          const node = this.type.create(attributes);
          let transaction;
          if (preloadPos) {
            transaction = state.tr.replaceWith(preloadPos - 1, preloadPos + 1, node);
          } else {
            transaction = state.tr.insert(position - 1, node);
          }
          if (dispatch) {
            dispatch(transaction);
          }
          return true;
        },
    };
  },

  addNodeView() {
    return ({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'image-wrapper';
      const container = document.createElement('img');
      container.className = 'image viewer-elem';
      container.src = HTMLAttributes['data-href'];
      container.alt = `image-${HTMLAttributes['data-id']}`;
      container.dataset.small = HTMLAttributes['data-small'];
      container.dataset.href = HTMLAttributes['data-href'];
      container.dataset.id = HTMLAttributes['data-id'];
      container.innerHTML = '     ';
      container.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('showimage', { detail: HTMLAttributes['data-id'] }));
      });
      wrapper.append(container);
      return {
        dom: wrapper,
      };
    };
  },
});

export default Image;
