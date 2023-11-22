import { Node } from '@tiptap/vue-3';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';

interface ImagePreloaderOptions {
  'data-id': string | null;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image_preloader: {
      image_preloader: (attributes: {
        'data-id': string;
      }) => ReturnType;
    };
  }
}

const ImagePreloader = Node.create<ImagePreloaderOptions>({
  name: 'image_preloader',
  inline: true,
  group: 'inline',
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      'data-id': {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span.file-preloader',
        getAttrs: (node: string | HTMLElement) => {
          if (typeof node === 'string') {
            return {};
          }
          return {
            'data-id': node.getAttribute('data-id'),
          };
        },
      },
    ];
  },

  renderHTML({ node }: { node: ProseMirrorNode }) {
    return [
      'span',
      {
        class: 'file-preloader',
        'data-id': node.attrs['data-id'],
      },
    ];
  },
  addCommands() {
    return {
      image_preloader:
        (attributes) =>
        ({ state, dispatch }) => {
          const { selection } = state;
          const position = selection.$to.pos;
          const node = this.type.create(attributes);
          const transaction = state.tr.insert(position, node);
          if (dispatch) {
            dispatch(transaction);
          }
          return true;
        },
    };
  },
  addNodeView() {
    return ({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) => {
      const container = document.createElement('span');
      container.className = 'file-preloader';
      container.dataset.id = HTMLAttributes['data-id'];
      container.innerHTML = '     ';
      return {
        dom: container,
      };
    };
  },
});

export default ImagePreloader;
