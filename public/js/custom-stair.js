class StaircaseDrawer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
       render();
    }

    static get observedAttributes() {
        return ['steps', 'step-width', 'step-height'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const steps = parseInt(this.getAttribute('steps')) || 5;
        const stepWidth = parseInt(this.getAttribute('step-width')) || 50;
        const stepHeight = parseInt(this.getAttribute('step-height')) || 30;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = steps * stepWidth;
        canvas.height = steps * stepHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < steps; i++) {
            context.fillRect(i * stepWidth, i * stepHeight, stepWidth, stepHeight);
        }

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(canvas);
    }
}

customElements.define('staircase-drawer', StaircaseDrawer);
